import { useEffect, useState, useRef } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import {
  jobInsertData,
  jobSingleData,
} from "../../../../features/jobs/actionCreator";
import dynamic from "next/dynamic";
import PostJobSteps from "../../../../components/dashboard-pages/employers-dashboard/post-jobs/components/PostJobSteps";
import LoginPopup from "../../../../components/common/form/login/LoginPopup";
import MobileMenu from "../../../../components/header/MobileMenu";
import DashboardEmployerSidebar from "../../../../components/header/DashboardEmployerSidebar";
import BreadCrumb from "../../../../components/dashboard-pages/BreadCrumb";
import MenuToggler from "../../../../components/dashboard-pages/MenuToggler";
import CopyrightFooter from "../../../../components/dashboard-pages/CopyrightFooter";
import Layout from "../../../../components/Layout";
import { useRouter } from "next/router";
import { employerEditJob } from "../../../../features/employer/actionCreator";
import { useFirebase } from "react-redux-firebase";
import { v4 as uuidv4 } from "uuid";
import Select from 'react-select'
import jobSkills from "../../../../public/jobSkill"
const TextEditor = dynamic(
  () => import("../../../../components/dashboard-pages/employers-dashboard/post-jobs/components/TextEditor"),
  { ssr: false }
);

const EditJob = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const textEditorRef = useRef();

  const initialFormData = {
    deadlineDate: "",
    jobCategories: "",
    jobDescription: "",
    jobTitle: "",
    jobType: "",
    jobDetails: "",
    salary: "",
    gender: "",
    qualification: "",
    jobSkills: []
  };

  const [skill, setSkill] = useState([{ skillList: "" }]);
  const [keylist, setKeylist] = useState([{ keyList: "" }]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [uploadedImages, setUploadedImages] = useState(new Set());
  const [isFormDirty, setIsFormDirty] = useState(false);

  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });

  const loading = useSelector((state) => {
    return state.employerSingle.jobLoading;
  });

  const jobData = useSelector((state) => {
    return state.jobSingle.data;
  });

  // Create a unique session key for tracking uploaded images
  const SESSION_KEY = useRef(`edit_job_images_${userUid || 'anonymous'}_${id}_${Date.now()}`);
  const TEMP_IMAGES_KEY = SESSION_KEY.current;

  console.log(jobData);

  const jobTypes = [
    { id: 1, name: "Full-Time" },
    { id: 2, name: "Part-Time" },
    { id: 3, name: "Contract/Freelance" },
    { id: 4, name: "Temporary" },
    { id: 5, name: "Internship" },
    { id: 6, name: "Remote/Telecommute" },
  ];

  const jobCategories = [
    { id: 1, name: "Board of Management (Private)" },
    { id: 2, name: "Legal" },
    { id: 3, name: "Consultants" },
    { id: 4, name: "Doctor" },
    { id: 5, name: "IT" },
    { id: 6, name: "Project Construction and Engineering" },
    { id: 7, name: "Human Resources" },
    { id: 8, name: "Finance and Accounting" },
    { id: 9, name: "Procurement" },
    { id: 10, name: "Administrative" },
    { id: 11, name: "Sales and Marketing" },
    { id: 12, name: "Maintenance" },
    { id: 13, name: "Security" },
    { id: 14, name: "Cleaner" },
    { id: 15, name: "Cook" },
    { id: 16, name: "Internships" },
  ];

  // Image upload functionality
  const uploadImageToFirebase = async (file) => {
    try {
      const storageRef = firebase.storage().ref();
      const imageName = `${uuidv4()}-${file.name}`;
      const imageRef = storageRef.child(`job-images/${userUid}/${imageName}`);
      const snapshot = await imageRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();

      // Track uploaded image in state
      setUploadedImages(prev => new Set([...prev, downloadURL]));

      // Store in sessionStorage for cleanup tracking only
      const tempImages = JSON.parse(sessionStorage.getItem(TEMP_IMAGES_KEY) || '[]');
      if (!tempImages.includes(downloadURL)) {
        tempImages.push(downloadURL);
        sessionStorage.setItem(TEMP_IMAGES_KEY, JSON.stringify(tempImages));
      }

      // Mark form as dirty since content was uploaded
      setIsFormDirty(true);

      console.log("Image uploaded successfully:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("Error", "Failed to upload image", "error");
      return null;
    }
  };

  const handleImageUpload = async (file) => {
    const imageUrl = await uploadImageToFirebase(file);
    return imageUrl;
  };

  const getStoragePathFromUrl = (url) => {
    try {
      const match = url.match(/\/o\/(.+?)\?/);
      if (match) {
        return decodeURIComponent(match[1]);
      }
      return null;
    } catch (error) {
      console.error('Error extracting storage path:', error);
      return null;
    }
  };

  const deleteImageFromFirebase = async (imageUrl, isExplicitDelete = false) => {
    try {
      const storagePath = getStoragePathFromUrl(imageUrl);
      if (!storagePath) {
        console.warn('Could not extract storage path from URL:', imageUrl);
        return;
      }

      const imageRef = firebase.storage().ref(storagePath);
      await imageRef.delete();

      // Remove from tracking
      setUploadedImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(imageUrl);
        return newSet;
      });

      // Remove from sessionStorage
      const tempImages = JSON.parse(sessionStorage.getItem(TEMP_IMAGES_KEY) || '[]');
      const updatedImages = tempImages.filter(img => img !== imageUrl);
      sessionStorage.setItem(TEMP_IMAGES_KEY, JSON.stringify(updatedImages));

      console.log(`Image deleted ${isExplicitDelete ? 'by user' : 'during cleanup'}:`, imageUrl);
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        console.warn('Image not found in storage (may have been already deleted):', imageUrl);
        // Still remove from tracking even if not found in storage
        setUploadedImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(imageUrl);
          return newSet;
        });
      } else {
        console.error('Error deleting image from Firebase:', error);
      }
    }
  };

  const handleSkillChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skill];
    list[index][name] = value;
    setSkill(list);
  };

  const handleSkillRemove = (index) => {
    console.log("Removing skill at index:", index);
    const updatedSkill = skill.filter((_, i) => i !== index);
    console.log("Updated skill array:", updatedSkill);
    setSkill(updatedSkill);
  };

  const handleSkillAdd = () => {
    setSkill([...skill, { skillList: "" }]);
  };

  const handleKeyChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...keylist];
    list[index][name] = value;
    setKeylist(list);
  };

  const handleKeyRemove = (index) => {
    const list = [...keylist];
    list.splice(index, 1);
    setKeylist(list);
  };

  const handleKeyAdd = () => {
    setKeylist([...keylist, { keyList: "" }]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleJobSkillsChange = (selectedOptions) => {
    // Extract only the values from selected options
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];

    setFormData(prev => ({
      ...prev,
      jobSkills: selectedOptions
    }));

    // Clear error when user selects skills
    if (selectedOptions.length > 0 && errors.jobSkills) {
      setErrors(prev => ({
        ...prev,
        jobSkills: null
      }));
    }

  };
  const handleEditorChange = (field, content) => {
    setFormData((prevFormData) => ({ ...prevFormData, [field]: content }));
  };

  const handleResetJobDetails = async () => {
    const result = await Swal.fire({
      title: 'Reset Job Description?',
      text: 'This will clear the job description content. Images will be preserved unless you clear the entire form.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reset it!'
    });

    if (result.isConfirmed) {
      if (textEditorRef.current && textEditorRef.current.clearEditor) {
        await textEditorRef.current.clearEditor();
      }

      setFormData(prev => ({ ...prev, jobDescription: '' }));

      if (errors.jobDescription) {
        setErrors(prev => ({ ...prev, jobDescription: undefined }));
      }
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.jobTitle) {
      errors.jobTitle = "Job Title is required!";
    }
    if (!values.jobType) {
      errors.jobType = "Please Select Job Type";
    }
    if (!values.salary) {
      errors.salary = "Please Select Salary";
    }
    if (!values.jobCategories) {
      errors.jobCategories = "Please Select job categories";
    }
    if (values.jobSkills.length < 1) {
      errors.jobSkills = "Please Select Job Skill";
    }
    if (!values.deadlineDate) {
      errors.deadlineDate = "Deadline date is required";
    }
    if (!values.gender) {
      errors.gender = "Select gender";
    }
    if (!values.qualification) {
      errors.qualification = "Select qualification";
    }
    // if (!values.skill || values.skill[0]?.skillList.trim() === "") {
    //   errors.skill = "Please enter at least one skill";
    // }
    // if (!values.keylist || values.keylist[0]?.keyList.trim() === "") {
    //   errors.keylist = "Please enter at least one key responsibilities";
    // }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (validate({ ...formData, skill, keylist })) {
      const data = { ...formData, skill, keylist };
      dispatch(employerEditJob(userUid, id, data)).then(() => {
        // Clear temp images tracking on successful update
        sessionStorage.removeItem(TEMP_IMAGES_KEY);
        setUploadedImages(new Set());
        setIsFormDirty(false);

        Swal.fire({
          title: "Success",
          text: "Your Job has been updated",
          icon: "success",
          confirmButtonText: "Accept",
          timer: 3000,
          timerProgressBar: true,
        });
      });
    }
  };

  // Check for dirty form state
  useEffect(() => {
    const hasFormData = Object.values(formData).some(value => value && value !== "");
    const hasSkillData = skill.some(s => s.skillList && s.skillList.trim() !== "");
    const hasKeyData = keylist.some(k => k.keyList && k.keyList.trim() !== "");
    setIsFormDirty(hasFormData || hasSkillData || hasKeyData || uploadedImages.size > 0);
  }, [formData, skill, keylist, uploadedImages]);

  // Setup cleanup for abandoned forms
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty && uploadedImages.size > 0) {
        // Mark for cleanup on page unload
        sessionStorage.setItem(`cleanup_needed_${Date.now()}`, JSON.stringify([...uploadedImages]));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormDirty, uploadedImages]);

  useEffect(() => {
    dispatch(jobSingleData(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (jobData) {
      setFormData({
        deadlineDate: jobData.deadlineDate || "",
        jobCategories: jobData.jobCategories || "",
        // jobDescription: jobData.jobDescription || "",
        jobDetails: jobData.jobDetails || "",
        jobSkills: jobData.jobSkills || [],
        jobTitle: jobData.jobTitle || "",
        jobType: jobData.jobType || "",
        salary: jobData.salary || "",
        gender: jobData.gender || "",
        qualification: jobData.qualification || "",
      });
      setKeylist(jobData.keylist || [{ keyList: "" }]);
      setSkill(jobData.skill || [{ skillList: "" }]);
    }
  }, [jobData]);

  const borderStyle = "1px solid red";

  return (
    <Layout authPage={true}>
      <div className="page-wrapper dashboard">
        <span className="header-span"></span>

        <LoginPopup />
        <MobileMenu />
        <DashboardEmployerSidebar />

        <section className="user-dashboard">
          <div className="dashboard-outer">
            <BreadCrumb title="Edit Job" />
            <MenuToggler />

            <div className="row">
              <div className="col-lg-12">
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Edit Job</h4>
                    </div>

                    <div className="widget-content">
                      <form className="default-form" onSubmit={handleEdit}>
                        <div className="row">
                          {/* Job Title */}
                          <div className="form-group col-lg-12 col-md-12">
                            <label>Job Title</label>
                            <input
                              type="text"
                              name="jobTitle"
                              placeholder="Title"
                              value={formData.jobTitle}
                              onChange={handleInputChange}
                              style={{
                                border: `${errors?.jobTitle ? borderStyle : ""
                                  }`,
                              }}
                            />
                            {errors?.jobTitle && (
                              <p className="err-message">{errors?.jobTitle}</p>
                            )}
                          </div>

                          {/* Job Description with TextEditor */}


                          {/* Job Type */}
                          <div className="form-group col-lg-6 col-md-12">
                            <label>Job Type</label>
                            <select
                              className="chosen-single form-select"
                              name="jobType"
                              onChange={handleInputChange}
                              value={formData.jobType}
                              style={{
                                border: `${errors?.jobType ? borderStyle : ""}`,
                              }}
                            >
                              <option value="">Select</option>
                              {jobTypes.map((i, index) => (
                                <option key={i.id} value={i.name}>{i.name}</option>
                              ))}
                            </select>
                            {errors?.jobType && (
                              <p className="err-message">{errors?.jobType}</p>
                            )}
                          </div>

                          {/* Gender */}
                          <div className="form-group col-lg-6 col-md-12">
                            <label>Gender</label>
                            <select
                              className="chosen-single form-select"
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                              style={{
                                border: `${errors?.gender ? borderStyle : ""}`,
                              }}
                            >
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="others">Others</option>
                            </select>
                            {errors?.gender && (
                              <p className="err-message">{errors?.gender}</p>
                            )}
                          </div>

                          {/* Qualification */}
                          <div className="form-group col-lg-6 col-md-12">
                            <label>Qualification</label>
                            <select
                              className="chosen-single form-select"
                              name="qualification"
                              value={formData.qualification}
                              onChange={handleInputChange}
                              style={{
                                border: `${errors?.qualification ? borderStyle : ""
                                  }`,
                              }}
                            >
                              <option value="">Select</option>
                              <option value="Certificate">Certificate</option>
                              <option value="Not specific">Not specific</option>
                              <option value="Associate Degree">Associate Degree</option>
                              <option value="Bachelor Degree">Bachelor Degree</option>
                              <option value="Master's Degree">Master's Degree</option>
                              <option value="Doctorate Degree">Doctorate Degree</option>
                            </select>
                            {errors?.qualification && (
                              <p className="err-message">
                                {errors?.qualification}
                              </p>
                            )}
                          </div>

                          {/* Offered Salary */}
                          <div className="form-group col-lg-6 col-md-12">
                            <label>Offered Salary</label>
                            <select
                              className="chosen-single form-select"
                              name="salary"
                              value={formData.salary}
                              onChange={handleInputChange}
                              style={{
                                border: `${errors?.salary ? borderStyle : ""}`,
                              }}
                            >
                              <option value="">Select</option>
                              <option>$1500</option>
                              <option>$2000</option>
                              <option>$2500</option>
                              <option>$3500</option>
                              <option>$4500</option>
                              <option>$5000</option>
                            </select>
                            {errors?.salary && (
                              <p className="err-message">{errors?.salary}</p>
                            )}
                          </div>

                          {/* Job Categories */}
                          <div className="form-group col-lg-6 col-md-12">
                            <label>Job Categories</label>
                            <select
                              className="chosen-single form-select"
                              name="jobCategories"
                              value={formData.jobCategories}
                              onChange={handleInputChange}
                              style={{
                                border: `${errors?.jobCategories ? borderStyle : ""
                                  }`,
                              }}
                            >
                              <option value="">Select option</option>
                              {jobCategories.map((i, index) => (
                                <option key={i.id} value={i.name}>{i.name}</option>
                              ))}
                            </select>
                            {errors?.jobCategories && (
                              <p className="err-message">
                                {errors?.jobCategories}
                              </p>
                            )}
                          </div>
                          <div className="form-group col-lg-6 col-md-12">
                            <label>Job Skills</label>
                            <Select
                              // defaultValue={[jobSkills[1]]}
                              isMulti
                              value={formData.jobSkills}
                              name="jobSkills"
                              options={jobSkills}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={handleJobSkillsChange}
                            />
                            {errors?.jobSkills && (
                              <p className="err-message">{errors?.jobSkills}</p>
                            )}
                          </div>
                          {/* Application Deadline Date */}
                          <div className="form-group col-lg-6 col-md-12">
                            <label>Application Deadline Date</label>
                            <input
                              type="date"
                              name="deadlineDate"
                              onChange={handleInputChange}
                              value={
                                formData.deadlineDate
                                  ? new Date(
                                    formData.deadlineDate.seconds * 1000
                                  )
                                    .toISOString()
                                    .split("T")[0]
                                  : ""
                              }
                              style={{
                                border: "none",
                                backgroundColor: "#f0f5f7",
                              }}
                              disabled
                            />
                          </div>
                          <div className="form-group col-lg-12 col-md-12">
                            <label style={{ display: "flex", alignItems: 'center' }}>Job Details (Description, Key Responsibilities & Required Skills)
                              <div style={{ float: 'right', marginLeft: "10px" }}>
                                <button
                                  type="button"
                                  onClick={handleResetJobDetails}
                                  style={{
                                    background: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    marginRight: '5px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Reset Job Details
                                </button>
                              </div>
                            </label>
                            <div style={{ border: `${errors?.jobDescription ? borderStyle : ""}` }}>
                              <TextEditor
                                ref={textEditorRef}
                                value={formData.jobDetails}
                                onChange={(content) => handleEditorChange('jobDetails', content)}
                                onImageUpload={handleImageUpload}
                                deleteImageFromFirebase={(url) => deleteImageFromFirebase(url, true)}
                                placeholder="Write your complete job description here including job details, requirements, and other relevant information. Click the image button in the toolbar to add images."
                                height="400px"
                                maxImageSize={5 * 1024 * 1024}
                                allowedImageTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                                error={errors?.jobDescription}
                              />
                            </div>
                            {/* {errors?.jobDescription && (
                              <p className="err-message">
                                {errors?.jobDescription}
                              </p>
                            )} */}
                          </div>
                          {/* Key Responsibilities */}
                          <div className="form-group col-lg-12 col-md-12">
                            <label>Key Responsibilities</label>
                            {keylist.map((singleKey, index) => (
                              <div className="add-key" key={index}>
                                <div className="add-key_btn">
                                  <input
                                    type="text"
                                    name="keyList"
                                    placeholder="Key Responsibilities"
                                    value={singleKey.keyList}
                                    onChange={(e) => handleKeyChange(e, index)}
                                    style={{
                                      border: `${errors?.keylist ? borderStyle : ""
                                        }`,
                                    }}
                                  />
                                  {errors?.keylist && (
                                    <p className="err-message">
                                      {errors?.keylist}
                                    </p>
                                  )}
                                  {keylist.length - 1 === index && (
                                    <button
                                      onClick={handleKeyAdd}
                                      type="button"
                                    >
                                      Add a Key
                                    </button>
                                  )}
                                </div>
                                <div className="remove-key_btn">
                                  {keylist.length !== 1 && (
                                    <button
                                      onClick={() => handleKeyRemove(index)}
                                      type="button"
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Skill & Experience */}
                          <div className="form-group col-lg-12 col-md-12">
                            <label>Skill & Experience</label>
                            {skill.map((singleKey, index) => (
                              <div className="add-key" key={index}>
                                <div className="add-key_btn">
                                  <input
                                    type="text"
                                    name="skillList"
                                    placeholder="Skills / Qualifications"
                                    value={singleKey.skillList}
                                    onChange={(e) =>
                                      handleSkillChange(e, index)
                                    }
                                    style={{
                                      border: `${errors?.skill ? borderStyle : ""
                                        }`,
                                    }}
                                  />
                                  {errors?.skill && (
                                    <p className="err-message">
                                      {errors?.skill}
                                    </p>
                                  )}
                                  {skill.length - 1 === index && (
                                    <button
                                      onClick={handleSkillAdd}
                                      type="button"
                                    >
                                      Add a skills
                                    </button>
                                  )}
                                </div>
                                <div className="remove-key_btn">
                                  {skill.length !== 1 && (
                                    <button
                                      onClick={() => handleSkillRemove(index)}
                                      type="button"
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Submit Button */}
                          <div className="form-group col-lg-12 col-md-12 text-right">
                            <button
                              className="theme-btn btn-style-one d-flex justify-content-center align-items-center"
                              disabled={loading}
                            >
                              {!loading ? (
                                <span>Update</span>
                              ) : (
                                <ReactLoading
                                  type="bars"
                                  color="#fff"
                                  height={30}
                                  width={30}
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CopyrightFooter />
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(EditJob), {
  ssr: false,
});
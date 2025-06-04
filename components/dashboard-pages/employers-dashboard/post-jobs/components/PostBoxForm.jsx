import { useEffect, useRef, useState } from "react";
import Map from "../../../Map";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../../../Loading/Loading";
import {
  jobInsertData,
  resetInsertStatus,
} from "../../../../../features/jobs/actionCreator";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import { useFirebase } from "react-redux-firebase";
import Select from "react-select";
import jobSkills from "../../../../../public/jobSkill";

const TextEditor = dynamic(
  () => import("./TextEditor"),
  { ssr: false }
);

const PostBoxForm = ({ pkgData }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const textEditorRef = useRef();
  const { durationDays, quotaId } = pkgData;

  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });

  const loading = useSelector((state) => {
    return state.jobs.loading;
  });

  const insertStatus = useSelector((state) => {
    return state.jobs.insertStatus;
  });

  // Create a unique session key that persists during the form session
  const SESSION_KEY = useRef(`temp_job_images_${userUid || 'anonymous'}_${Date.now()}`);
  const TEMP_IMAGES_KEY = SESSION_KEY.current;

  const specialisms = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Managemnet", label: "Managemnet" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];

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

  const initialFormData = {
    deadlineDate: "",
    jobCategories: "",
    jobDetails: "",
    jobTitle: "",
    jobType: "",
    jobSkills: [],
    salary: "",
    gender: "",
    qualification: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [uploadedImages, setUploadedImages] = useState(new Set());
  const [isFormDirty, setIsFormDirty] = useState(false); // Track if form has unsaved changes
  const [skill, setSkill] = useState([{ skillList: "" }]);
  const [keylist, setKeylist] = useState([{ keyList: "" }]);
  const handleSkillChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skill];
    list[index][name] = value;
    setSkill(list);
  };

  const handleSkillRemove = (index) => {
    // Filter out the skill at the specified index
    const updatedSkill = skill.filter((_, i) => i !== index);

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

  // Enhanced image upload with better tracking
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

  // Enhanced delete function that only deletes when explicitly called
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

  // Cleanup function that only runs when form is abandoned
  const cleanupAbandonedImages = async () => {
    try {
      const tempImages = JSON.parse(sessionStorage.getItem(TEMP_IMAGES_KEY) || '[]');

      if (tempImages.length > 0) {

        // Delete images from Firebase Storage
        const deletePromises = tempImages.map(async (imageUrl) => {
          await deleteImageFromFirebase(imageUrl, false);
        });

        await Promise.all(deletePromises);

        // Clear from sessionStorage
        sessionStorage.removeItem(TEMP_IMAGES_KEY);
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  };

  // Check for dirty form state
  useEffect(() => {
    const hasFormData = Object.values(formData).some(value => value && value !== "");
    setIsFormDirty(hasFormData || uploadedImages.size > 0);
  }, [formData, uploadedImages]);

  // Setup cleanup only for abandoned forms
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Only show warning and cleanup if form has unsaved changes
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';

        // Mark for cleanup on page unload
        if (uploadedImages.size > 0) {
          sessionStorage.setItem(`cleanup_needed_${Date.now()}`, JSON.stringify([...uploadedImages]));
        }

        return event.returnValue;
      }
    };

    // Check for any pending cleanup from previous sessions on mount
    const checkPendingCleanup = async () => {
      const keys = Object.keys(sessionStorage);
      const cleanupKeys = keys.filter(key =>
        key.startsWith('cleanup_needed_') ||
        (key.startsWith('temp_job_images_') && key !== TEMP_IMAGES_KEY)
      );

      for (const key of cleanupKeys) {
        try {
          const images = JSON.parse(sessionStorage.getItem(key) || '[]');
          if (images.length > 0) {
            const deletePromises = images.map(async (imageUrl) => {
              await deleteImageFromFirebase(imageUrl, false);
            });
            await Promise.all(deletePromises);
          }
          sessionStorage.removeItem(key);
        } catch (error) {
          console.error('Error cleaning up previous session images:', error);
          sessionStorage.removeItem(key);
        }
      }
    };

    // Run cleanup check on component mount
    checkPendingCleanup();

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormDirty, uploadedImages, TEMP_IMAGES_KEY]);

  // Handle successful form submission
  useEffect(() => {
    if (insertStatus) {
      // Form was successfully submitted - don't clean up images, they're now part of the job
      sessionStorage.removeItem(TEMP_IMAGES_KEY);
      setUploadedImages(new Set());
      setFormData(initialFormData);
      setIsFormDirty(false);
      dispatch(resetInsertStatus());

      Swal.fire({
        title: 'Success!',
        text: 'Job posted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  }, [insertStatus, dispatch, TEMP_IMAGES_KEY]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors(prev => ({
      ...prev,
      [name]: null
    }));
  };
  const handleJobSkillsChange = (selectedOptions) => {
    // Extract only the values from selected options
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];

    setFormData(prev => ({
      ...prev,
      jobSkills:selectedOptions
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

  const handleClearForm = async () => {
    const result = await Swal.fire({
      title: 'Clear Form?',
      text: 'This will clear all form data and delete any uploaded images. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it!'
    });

    if (result.isConfirmed) {
      // Clean up images since user explicitly wants to clear
      await cleanupAbandonedImages();

      // Clear editor
      if (textEditorRef.current && textEditorRef.current.clearEditor) {
        await textEditorRef.current.clearEditor();
      }

      // Reset form data and tracking
      setFormData(initialFormData);
      setUploadedImages(new Set());
      setErrors({});
      setIsFormDirty(false);

      Swal.fire('Cleared!', 'Form has been cleared and images deleted.', 'success');
    }
  };

  const handleResetJobDetails = async () => {
    const result = await Swal.fire({
      title: 'Reset Job Details?',
      text: 'This will clear the job details content. Images will be preserved unless you clear the entire form.',
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

      setFormData(prev => ({ ...prev, jobDetails: '' }));

      if (errors.jobDetails) {
        setErrors(prev => ({ ...prev, jobDetails: undefined }));
      }
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.jobTitle) {
      errors.jobTitle = "Job Title is required!";
    }
    if (!values.jobDetails) {
      errors.jobDetails = "Job Details is required!";
    }
    if (!values.jobType) {
      errors.jobType = "Please Select Job Type";
    }
    if (values.jobSkills.length < 1) {
      errors.jobSkills = "Please Select Job Skill";
    }
    if (!values.salary) {
      errors.salary = "Please Select Salary";
    }
    if (!values.jobCategories) {
      errors.jobCategories = "Please Select job categories";
    }
    if (!values.gender) {
      errors.gender = "Select gender";
    }
    if (!values.qualification) {
      errors.qualification = "Select qualification";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(formData)) {
      const data = {
        ...formData,
        deadlineDate: new Date(
          new Date().getTime() + durationDays * 24 * 60 * 60 * 1000
        ),
        skill,
        keylist,
      };

      // Dispatch job insertion
      dispatch(jobInsertData(data, quotaId));

      // Note: Images are now considered "committed" to the job posting
      // Don't clean them up - let the success handler manage the state
    }
  };

  const borderStyle = "1px solid red";

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Job Title */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Title"
            onChange={handleInputChange}
            value={formData.jobTitle}
            style={{ border: `${errors?.jobTitle ? borderStyle : ""}` }}
          />
          {errors?.jobTitle && (
            <p className="err-message">{errors?.jobTitle}</p>
          )}
        </div>


        {/* Job Type */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <select
            className="chosen-single form-select"
            name="jobType"
            onChange={handleInputChange}
            value={formData.jobType}
            style={{ border: `${errors?.jobType ? borderStyle : ""}` }}
          >
            <option value="">Select</option>
            {jobTypes.map((i, index) => (
              <option key={i.id} value={i.name}>{i.name}</option>
            ))}
          </select>
          {errors?.jobType && <p className="err-message">{errors?.jobType}</p>}
        </div>

        {/* Gender */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <select
            className="chosen-single form-select"
            name="gender"
            onChange={handleInputChange}
            value={formData.gender}
            style={{ border: `${errors?.gender ? borderStyle : ""}` }}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          {errors?.gender && <p className="err-message">{errors?.gender}</p>}
        </div>

        {/* Qualification */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <select
            className="chosen-single form-select"
            name="qualification"
            onChange={handleInputChange}
            value={formData.qualification}
            style={{ border: `${errors?.qualification ? borderStyle : ""}` }}
          >
            <option value="">Select</option>
            <option value="Not specific">Not specific</option>
            <option value="Certificate">Certificate</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor Degree">Bachelor Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate Degree">Doctorate Degree</option>
          </select>
          {errors?.qualification && (
            <p className="err-message">{errors?.qualification}</p>
          )}
        </div>

        {/* Offered Salary */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Offered Salary</label>
          <select
            className="chosen-single form-select"
            name="salary"
            onChange={handleInputChange}
            value={formData.salary}
            style={{ border: `${errors?.salary ? borderStyle : ""}` }}
          >
            <option value="">Select</option>
            <option value="negotiable">Negotiable</option>
            <option value="< 2.000.000"> less than 2.000.000</option>
            <option value="2.000.000 - 3.000.0000">2.000.000 - 3.000.0000</option>
            <option value="3.000.000 - 5.000.0000">3.000.000 - 5.000.0000</option>
            <option value="5.000.000 - 7.000.0000">5.000.000 - 7.000.0000</option>
            <option value="> 7.000.000">more than 7.000.000</option>
          </select>
          {errors?.salary && <p className="err-message">{errors?.salary}</p>}
        </div>

        {/* Job Categories */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Categories</label>
          <select
            className="chosen-single form-select"
            name="jobCategories"
            onChange={handleInputChange}
            value={formData.jobCategories}
            style={{ border: `${errors?.jobCategories ? borderStyle : ""}` }}
          >
            <option value="">Select option</option>
            {jobCategories.map((i, index) => (
              <option key={i.id} value={i.name}>{i.name}</option>
            ))}
          </select>
          {errors?.jobCategories && (
            <p className="err-message">{errors?.jobCategories}</p>
          )}
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Skills</label>
          <Select
            // defaultValue={[jobSkills[1]]}
            isMulti
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

        {/* Deadline Days */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Deadline Days</label>
          <input
            type="text"
            name="deadlineDate"
            value={`${durationDays} days`}
            disabled
          />
        </div>
        {/* Job Details with TextEditor */}
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
          <div style={{ border: `${errors?.jobDetails ? borderStyle : ""}` }}>
            <TextEditor
              ref={textEditorRef}
              value={formData.jobDetails}
              onChange={(content) => handleEditorChange('jobDetails', content)}
              onImageUpload={handleImageUpload}
              deleteImageFromFirebase={(url) => deleteImageFromFirebase(url, true)}
              placeholder="Write your complete job details here including:
              
              Job Description:
              [Enter detailed job description here...]
              
              Key Responsibilities:
              • [Responsibility 1]
              • [Responsibility 2]
              • [Responsibility 3]
              
              Required Skills:
              • [Skill 1]
              • [Skill 2]
              • [Skill 3]
              
              Click the image button in the toolbar to add images."
              height="400px"
              maxImageSize={5 * 1024 * 1024}
              allowedImageTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
              error={errors?.jobDetails}
            />
          </div>
        </div>
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
                  style={{ border: `${errors?.keylist ? borderStyle : ""}` }}
                />
                {errors?.keylist && (
                  <p className="err-message">{errors?.keylist}</p>
                )}
                {keylist.length - 1 === index && (
                  <button onClick={handleKeyAdd} type="button">
                    Add a Key
                  </button>
                )}
              </div>
              <div className="remove-key_btn">
                {keylist.length !== 1 && (
                  <button onClick={() => handleKeyRemove(index)} type="button">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
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
                  onChange={(e) => handleSkillChange(e, index)}
                  style={{ border: `${errors?.skill ? borderStyle : ""}` }}
                />
                {errors?.skill && (
                  <p className="err-message">{errors?.skill}</p>
                )}
                {skill.length - 1 === index && (
                  <button onClick={handleSkillAdd} type="button">
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
            type="button"
            onClick={handleClearForm}
            className="btn btn-outline-danger me-2"
          >
            Clear Form
          </button>
          <button className="theme-btn btn-style-one" type="submit">
            {loading ? <Loading /> : "Post Job"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
import { useEffect, useState } from "react";

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
const EditJob = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const initialFormData = {
    deadlineDate: "",
    jobCategories: "",
    jobDescription: "",
    jobTitle: "",
    jobType: "",
    salary: "",
    gender: "",
    // ... other fields
  };
  const [skill, setSkill] = useState([{ skillList: "" }]);
  const [keylist, setKeylist] = useState([{ keyList: "" }]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const userUid = useSelector((state) => state.user?.user?.uid);
  const loading = useSelector((state) => {
    return state.jobs.loading;
  });
  const jobData = useSelector((state) => {
    return state.jobSingle.data;
  });
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

  const handleSkillChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skill];
    list[index][name] = value;
    setSkill(list);
  };

  const handleSkillRemove = (index) => {
    console.log("Removing skill at index:", index);

    // Filter out the skill at the specified index
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
  const validate = (values) => {
    const errors = {};

    if (!values.jobTitle) {
      errors.jobTitle = "Job Title is required!";
    }
    if (!values.jobDescription) {
      errors.jobDescription = "Job Description is required!";
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

    if (!values.deadlineDate) {
      errors.deadlineDate = "Deadline date is required";
    }
    if (!values.gender) {
      errors.gender = "Select gender";
    }
    if (!values.qualification) {
      errors.qualification = "Select qualification";
    }
    if (!values.skill || values.skill[0]?.skillList.trim() === "") {
      errors.skill = "Please enter at least one skill";
    }

    // Validate the first keylist entry
    if (!values.keylist || values.keylist[0]?.keyList.trim() === "") {
      errors.keylist = "Please enter at least one key responsibilities";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (validate({ ...formData, skill, keylist })) {
      const data = { ...formData, skill, keylist };
      dispatch(jobInsertData(data)).then(() => {
        Swal.fire({
          title: "Success",
          text: "Your Job has been posted",
          icon: "success",
          confirmButtonText: "Accept",
          timer: 3000,
          timerProgressBar: true,
        });
      });
    }
  };
  useEffect(() => {
    dispatch(jobSingleData(id));
  }, [id, dispatch]);
  // useEffect(() => {
  //   console.log(errors);
  //   if (Object.keys(errors).length === 0) {
  //     console.log(formData);
  //   }
  // }, [errors]);
  useEffect(() => {
    if (jobData) {
      setFormData({
        deadlineDate: jobData.deadlineDate || "", // Example: jobData.deadlineDate is the property from jobData
        jobCategories: jobData.jobCategories || "",
        jobDescription: jobData.jobDescription || "",
        jobTitle: jobData.jobTitle || "",
        jobType: jobData.jobType || "",
        salary: jobData.salary || "",
        gender: jobData.gender || "",
        qualification: jobData.qualification || "",
      });
      setKeylist(jobData.keylist || []); // Provide a default value if keylist is initially undefined
      setSkill(jobData.skill || []); // Provide a default value if skill is initially undefined
    }
  }, [jobData]);
  const borderStyle = "1px solid red";
  return (
    <Layout authPage={true}>
      <div className="page-wrapper dashboard">
        <span className="header-span"></span>
        {/* <!-- Header Span for hight --> */}

        <LoginPopup />
        {/* End Login Popup Modal */}

        {/* <DashboardHeader /> */}
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        <DashboardEmployerSidebar />
        {/* <!-- End User Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <BreadCrumb title="Edit Job" />
            {/* breadCrumb */}

            <MenuToggler />
            {/* Collapsible sidebar button */}

            <div className="row">
              <div className="col-lg-12">
                {/* <!-- Ls widget --> */}
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Edit Job</h4>
                    </div>

                    <div className="widget-content">
                      {/* End job steps form */}
                      <form className="default-form" onSubmit={handleSubmit}>
                        <div className="row">
                          {/* <!-- Input --> */}
                          <div className="form-group col-lg-12 col-md-12">
                            <label>Job Title</label>
                            <input
                              type="text"
                              name="jobTitle"
                              placeholder="Title"
                              value={formData.jobTitle}
                              onChange={handleInputChange}
                              style={{
                                border: `${
                                  errors?.jobTitle ? borderStyle : ""
                                }`,
                              }}
                            />
                            {errors?.jobTitle && (
                              <p className="err-message">{errors?.jobTitle}</p>
                            )}
                          </div>

                          {/* <!-- About Company --> */}
                          <div className="form-group col-lg-12 col-md-12">
                            <label>Job Description</label>
                            <textarea
                              onChange={handleInputChange}
                              name="jobDescription"
                              value={formData.jobDescription}
                              style={{
                                border: `${
                                  errors?.jobDescription ? borderStyle : ""
                                }`,
                              }}
                              placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
                            ></textarea>
                            {errors?.jobDescription && (
                              <p className="err-message">
                                {errors?.jobDescription}
                              </p>
                            )}
                          </div>

                          {/* <!-- Search Select --> */}
                          {/* <div className="form-group col-lg-6 col-md-12">
          <label>Specialisms </label>
          <Select
            defaultValue={[specialisms[2]]}
            isMulti
            name="colors"
            options={specialisms}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div> */}

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
                                <option key={i.id}>{i.name}</option>
                              ))}
                            </select>
                            {errors?.jobType && (
                              <p className="err-message">{errors?.jobType}</p>
                            )}
                          </div>
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
                          <div className="form-group col-lg-6 col-md-12">
                            <label>Qualification</label>
                            <select
                              className="chosen-single form-select"
                              name="qualification"
                              value={formData.qualification}
                              onChange={handleInputChange}
                              style={{
                                border: `${
                                  errors?.qualification ? borderStyle : ""
                                }`,
                              }}
                            >
                              <option value="">Select</option>

                              <option value="Certificate">Certificate</option>
                              <option value="Associate Degree">
                                Associate Degree
                              </option>
                              <option value="Bachelor Degree">
                                Bachelor Degree
                              </option>
                              <option value="Master's Degree">
                                Master's Degree
                              </option>
                              <option value="Doctorate Degree">
                                Doctorate Degree
                              </option>
                            </select>
                            {errors?.qualification && (
                              <p className="err-message">
                                {errors?.qualification}
                              </p>
                            )}
                          </div>

                          {/* <!-- Input --> */}
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

                          <div className="form-group col-lg-6 col-md-12">
                            <label>Job Categories</label>
                            <select
                              className="chosen-single form-select"
                              name="jobCategories"
                              value={formData.jobCategories}
                              onChange={handleInputChange}
                              style={{
                                border: `${
                                  errors?.jobCategories ? borderStyle : ""
                                }`,
                              }}
                            >
                              <option value="">Select option</option>
                              {jobCategories.map((i, index) => (
                                <option key={i.id}>{i.name}</option>
                              ))}
                            </select>
                            {errors?.jobCategories && (
                              <p className="err-message">
                                {errors?.jobCategories}
                              </p>
                            )}
                          </div>

                          {/* <!-- Input --> */}
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
                                      border: `${
                                        errors?.keylist ? borderStyle : ""
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
                                      border: `${
                                        errors?.skill ? borderStyle : ""
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
                          {/* <!-- Input --> */}
                          <div className="form-group col-lg-12 col-md-12 text-right">
                            <button
                              className="theme-btn btn-style-one"
                              disabled={loading}
                            >
                              {!!loading ? <Loading /> : "Update"}
                            </button>
                          </div>
                        </div>
                      </form>
                      {/* End post box form */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}

        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
      </div>
    </Layout>
  );
};
export default dynamic(() => Promise.resolve(EditJob), {
  ssr: false,
});

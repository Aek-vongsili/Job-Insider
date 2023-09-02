import { useEffect, useState } from "react";
import Map from "../../../Map";
import Select from "react-select";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../firebase/clientApp";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../../../Loading/Loading";
const PostBoxForm = () => {
  const initialFormData = {
    deadlineDate: "",
    jobCategories: "",
    jobDescription: "",
    jobTitle: "",
    jobType: "",
    salary: "",
    // ... other fields
  };
  const [skill, setSkill] = useState([{ skillList: "" }]);
  const [keylist, setKeylist] = useState([{ keyList: "" }]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading,setLoading]= useState(false)
  const userUid = useSelector((state) => state.user?.user?.uid);

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

  const handleSkillChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skill];
    list[index][name] = value;
    setSkill(list);
  };

  const handleSkillRemove = (index) => {
    const list = [...skill];
    list.splice(index, 1);
    setSkill(list);
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
      errors.jobDescription = "JobDescription is required!";
    }
    if (!values.jobType) {
      errors.jobType = "Please Select Job Type";
    }
    if (!values.salary) {
      errors.salary = "Please Select Salary";
    }

    if (!values.jobCategories) {
      errors.jobCategories = "Please Select jobCategories";
    }

    if (!values.deadlineDate) {
      errors.deadlineDate = "Deadline date is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    if (validate(formData)) {
      try {
        console.log(formData);
        const data = { ...formData, skill, keylist };
        // console.log({ ...formData, skill, keylist });
        addDoc(collection(db, "job_features"), {
          ...data,
          company: userUid,
          createdAt: serverTimestamp(),
        }).then((rs) => {
          setLoading(false)
          Swal.fire({
            title: "Success",
            text: "Your Job has been posted",
            icon: "success",
            confirmButtonText: "Accept",
            timer: 3000,
            timerProgressBar: true,
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  // useEffect(() => {
  //   console.log(errors);
  //   if (Object.keys(errors).length === 0) {
  //     console.log(formData);
  //   }
  // }, [errors]);
  const borderStyle = "1px solid red";
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Title"
            onChange={handleInputChange}
            style={{ border: `${errors?.jobTitle ? borderStyle : ""}` }}
          />
          <p className="err-message">{errors?.jobTitle}</p>
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea
            onChange={handleInputChange}
            name="jobDescription"
            style={{ border: `${errors?.jobDescription ? borderStyle : ""}` }}
            placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
          ></textarea>
          <p className="err-message">{errors?.jobDescription}</p>
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
            style={{ border: `${errors?.jobType ? borderStyle : ""}` }}
          >
            <option value="">Select</option>
            {jobTypes.map((i, index) => (
              <option key={i.id}>{i.name}</option>
            ))}
          </select>
          <p className="err-message">{errors?.jobType}</p>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Offered Salary</label>
          <select
            className="chosen-single form-select"
            name="salary"
            onChange={handleInputChange}
            style={{ border: `${errors?.salary ? borderStyle : ""}` }}
          >
            <option value="">Select</option>
            <option>$1500</option>
            <option>$2000</option>
            <option>$2500</option>
            <option>$3500</option>
            <option>$4500</option>
            <option>$5000</option>
          </select>
          <p className="err-message">{errors?.salary}</p>
        </div>

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Career Level</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>Banking</option>
            <option>Digital & Creative</option>
            <option>Retail</option>
            <option>Human Resources</option>
            <option>Management</option>
          </select>
        </div> */}

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>Banking</option>
            <option>Digital & Creative</option>
            <option>Retail</option>
            <option>Human Resources</option>
            <option>Management</option>
          </select>
        </div> */}

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Categories</label>
          <select
            className="chosen-single form-select"
            name="jobCategories"
            onChange={handleInputChange}
            style={{ border: `${errors?.jobCategories ? borderStyle : ""}` }}
          >
            <option value="">Select option</option>
            {jobCategories.map((i, index) => (
              <option key={i.id}>{i.name}</option>
            ))}
          </select>
          <p className="err-message">{errors?.jobCategories}</p>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Application Deadline Date</label>
          <input
            type="date"
            name="deadlineDate"
            onChange={handleInputChange}
            style={{ border: `${errors?.jobCategories ? borderStyle : ""}` }}
          />
          <p className="err-message">{errors?.deadlineDate}</p>
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Key Responsibilities</label>
          {keylist.map((singleKey, index) => (
            <div className="add-key" key={index}>
              <div className="add-key_btn">
                <input
                  type="text"
                  name="keyList"
                  placeholder="Key Responsibilities"
                  value={singleKey.name}
                  onChange={(e) => handleKeyChange(e, index)}
                />
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
          <label>Require Skills</label>
          {skill.map((singleKey, index) => (
            <div className="add-key" key={index}>
              <div className="add-key_btn">
                <input
                  type="text"
                  name="skillList"
                  placeholder="Skills / Qualifications"
                  value={singleKey.name}
                  onChange={(e) => handleSkillChange(e, index)}
                />
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
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one"> {!!loading ? <Loading /> : "Post"}</button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;

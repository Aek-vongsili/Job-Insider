import Map from "../../../Map";
import Select from "react-select";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/clientApp";
import { useState } from "react";

const PostBoxForm = () => {
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
  const [selectedValue, setSelectedValue] = useState([]);
  const [jobtitle, setJobtitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [logoLink, setLogoLink] = useState("");
  const [Link, setLink] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [experience, setExperience] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [minDetination, setMinDetination] = useState(0);
  const [maxDetination, setMaxDetination] = useState(0);
  const [tag2, setTag2] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const jobID = doc(db, "Job-Featured", "eA0qbWcY3XzWWQmd8QFD");
  const jobtype = [
    { value: "Full Time", label: "Fulltime" },
    { value: "Freelancer", label: "Freelancer" },
    { value: "Private", label: "Private" },
    { value: "Urgent", label: "Urgent" },
  ];
  let jobtypes = []
  const handleSubmit = async (e) => {
    
    handleJobtype();
    await updateDoc(jobID, {
      jop_feature: arrayUnion({
        id:2,
        logo:logoLink,
        jobTitle:jobtitle,
        company:jobCompany,
        location:`${country}, ${city}`,
        time: "1 hours ago",
        salary:"400$ - 600$",
        joptype:jobtypes,
        link:Link,
        tag:tag,
        destination:{
          min:minDetination,
          max:maxDetination
        },
        category:category,
        created_at: "Last Hour",
        experience: experience,
        totalSalary: {
          min: minSalary,
          max: maxSalary,
        },
        tag2: tag2,
      }),
    });
   
  };
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  

  const handleJobtype = () => {
    for (let i = 0; i <= selectedValue.length-1; i++) {
      jobtypes.push(
        {
          styleClass: selectedValue[i].includes("Private")
            ? "privacy"
            : selectedValue[i].includes("Urgent")
            ? "required"
            : selectedValue[i].includes("Full Time")
            ? "time"
            : selectedValue[i].includes("Freelancer")
            ? "time"
            : "time",
         
          type:selectedValue[i]
        },
      ); 
    
    };
  }
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="name"
            placeholder="Title"
            onChange={(e) => setJobtitle(e.target.value)}
          />
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label>Company</label>
          <input
            type="text"
            name="name"
            placeholder="Company"
            onChange={(e) => setJobCompany(e.target.value)}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Logo Link</label>
          <input
            type="text"
            name="name"
            placeholder="Logo Link"
            onChange={(e) => setLogoLink(e.target.value)}
          />
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type </label>
          <Select
            defaultValue={[jobtype[2]]}
            isMulti
            name="colors"
            options={jobtype}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Link</label>
          <input
            type="text"
            placeholder="Link"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Min Salary</label>
          <input
            type="number"
            placeholder="Min Salary"
            onChange={(e) => setMinSalary(e.target.value)}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Max Salary</label>
          <input
            type="number"
            placeholder="Max Salary"
            onChange={(e) => setMaxSalary(e.target.value)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <select
            className="chosen-single form-select"
            onChange={(e) => setExperience(e.target.value)}
          >
            <option>Fresh</option>
            <option>1 Year</option>
            <option>2 Year</option>
            <option>3 Year</option>
            <option>4 Year</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Category</label>
          <select
            className="chosen-single form-select"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
            <option>Apartments</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Tag</label>
          <select
            className="chosen-single form-select"
            onChange={(e) => setTag(e.target.value)}
          >
            <option>internship</option>
            <option>full-time</option>
            <option>freelancer</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Tag2</label>
          <input
            type="text"
            placeholder="Tag2"
            onChange={(e) => setTag2(e.target.value)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Min Destination</label>
          <input
            type="number"
            placeholder="Min Destination"
            onChange={(e) => setMinDetination(e.target.value)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Max Destination</label>
          <input
            type="number"
            placeholder="Max Destination"
            onChange={(e) => setMaxDetination(e.target.value)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <input
            type="text"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one">Insert</button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;

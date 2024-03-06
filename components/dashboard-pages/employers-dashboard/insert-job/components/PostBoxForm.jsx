import Map from "../../../Map";
import Select from "react-select";

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
  const [logoImg, setLogoImg] = useState("");
  const [percent, setPercent] = useState(0);
  const [data, setData] = useState([]);
  const [keylist, setKeylist] = useState([{ keyList: "" }]);
  const [skill, setSkill] = useState([{ skillList: "" }]);

  // const jobID = doc(db, "Job-Featured", "eA0qbWcY3XzWWQmd8QFD");
  const jobtype = [
    { value: "Full Time", label: "Fulltime" },
    { value: "Freelancer", label: "Freelancer" },
    { value: "Private", label: "Private" },
    { value: "Urgent", label: "Urgent" },
  ];
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

  let jobtypes = [];
  // const handleSubmit = async (e) => {
  //   handleJobtype();
  //   await updateDoc(jobID, {
  //     jop_feature: arrayUnion({
  //       id: 2,
  //       logo: logoLink,
  //       jobTitle: jobtitle,
  //       company: jobCompany,
  //       location: `${country}, ${city}`,
  //       time: "1 hours ago",
  //       salary: "400$ - 600$",
  //       joptype: jobtypes,
  //       link: Link,
  //       tag: tag,
  //       destination: {
  //         min: minDetination,
  //         max: maxDetination,
  //       },
  //       category: category,
  //       created_at: "Last Hour",
  //       experience: experience,
  //       totalSalary: {
  //         min: minSalary,
  //         max: maxSalary,
  //       },
  //       tag2: tag2,
  //     }),
  //   });
  // };
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const handleJobtype = () => {
    for (let i = 0; i <= selectedValue.length - 1; i++) {
      jobtypes.push({
        styleClass: selectedValue[i].includes("Private")
          ? "privacy"
          : selectedValue[i].includes("Urgent")
          ? "required"
          : selectedValue[i].includes("Full Time")
          ? "time"
          : selectedValue[i].includes("Freelancer")
          ? "time"
          : "time",

        type: selectedValue[i],
      });
    }
  };
  // const handleDrop = (e) => {
  //   e.preventDefault()
  //   const file = e.dataTransfer.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setLogoImg(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setLogoImg(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setLogoImg(file);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setLogoImg(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(keylist);
    console.log(skill);
    // if (!logoImg) {
    //   alert("choose image first");
    //   return;
    // } else {
    //   const imageName = `${Date.now()}_${logoImg.name}`;
    //   const storageRef = ref(storage, `/files/${imageName}`);
    //   const uploadTask = uploadBytesResumable(storageRef, logoImg);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const percent = Math.round(
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //       );

    //       // update progress
    //       setPercent(percent);
    //     },
    //     (err) => console.log(err),
    //     () => {
    //       // download url
    //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //         console.log(url);
    //       });
    //     }
    //   );
    // }
    // const querySnapshot = await getDocs(collection(db, "users"));

    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.data().user);
    //   data.push(doc.data().user)

    // });
    // console.log(data)
    // console.log(logoImg.name);
  };

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
          <label>Job Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Description"
          ></textarea>
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
          <label>Job Skills</label>
          {skill.map((singleKey, index) => (
            <div className="add-key" key={index}>
              <div className="add-key_btn">
                <input
                  type="text"
                  name="skillList"
                  placeholder="Key Responsibilities"
                  value={singleKey.name}
                  onChange={(e) => handleSkillChange(e, index)}
                />
                {skill.length - 1 === index && (
                  <button onClick={handleSkillAdd} type="button">
                    Add a Key
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
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Logo</label>
          <div className="uploading-outer">
            <div
              className="uploadButton"
              // onDrop={handleDrop}
              // onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                className="uploadButton-input"
                type="file"
                name="attachments[]"
                accept="image/*"
                id="upload"
                // required
                // onChange={(e) => logoHandler(e.target.files[0])}
                onChange={handleFileUpload}
              />
              <label
                className="uploadButton-button ripple-effect upload-image-btn"
                htmlFor="upload"
              >
                {logoImg ? (
                  <img
                    className="upload-img"
                    src={URL.createObjectURL(logoImg)}
                    alt="uploaded image"
                  />
                ) : (
                  <p>Drag and drop your image here or click to upload</p>
                )}
              </label>
              <span className="uploadButton-file-name"></span>
              {/* {logoImg !== null ? logoImg?.name : " Browse Logo"} */}
            </div>
            <div className="text">
              Image should be png, jpg, jpeg
              {/* <p>{percent} "% done"</p> */}
              <p>{logoImg ? logoImg.name : ""}</p>
            </div>
          </div>
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

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { useEffect, useState } from "react";
import Select from "react-select";
// import { db, storage } from "../../../../../../firebase/clientApp";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Loading from "../../../../../Loading/Loading";
import {
  employerUploadFile,
  employersProfileData,
  employersUpdateData,
} from "../../../../../../features/employer/actionCreator";
const FormInfoBox = () => {
  const router = useRouter();
  const catOptions = [
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Service", label: "Service" },
    { value: "Retail", label: "Retail" },
    { value: "Technology", label: "Technology" },
    { value: "Financial Institutions", label: "Financial Institutions" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Energy", label: "Energy" },
    { value: "Transportation", label: "Transportation" },
    { value: "Construction", label: "Construction" },
    { value: "Agriculture and Farming", label: "Agriculture and Farming" },
    { value: "Entertainment and Media", label: "Entertainment and Media" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Food and Beverage", label: "Food and Beverage" },
    { value: "Pharmaceutical", label: "Pharmaceutical" },
    { value: "Aerospace and Defense", label: "Aerospace and Defense" },
    { value: "Hospitality and Tourism", label: "Hospitality and Tourism" },
    { value: "Education and Training", label: "Education and Training" },
    {
      value: "Environmental and Sustainability",
      label: "Environmental and Sustainability",
    },
    { value: "Telecommunications", label: "Telecommunications" },
    { value: "Nonprofit Organizations", label: "Nonprofit Organizations" },
  ];
  const dispatch = useDispatch();
  const [logoImg, setLogoImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [formData, setFormData] = useState(new FormData());
  const [selectedValue, setSelectedValue] = useState([]);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  // get state
  const company_profile = useSelector((state) => {
    return state.employerSingle.data?.profile;
  });
  const borderStyle = "1px solid red";
  const findIndices = (arr, searchArray) => {
    const indices = [];

    for (let i = 0; i < searchArray?.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j]["value"] === searchArray[i]) {
          indices.push(j);
        }
      }
    }

    return indices;
  };
  const defaultValues = findIndices(catOptions, formData?.company_cat).map(
    (index) => {
      return { value: catOptions[index].value, label: catOptions[index].label };
    }
  );
  console.log(defaultValues);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.company_name) {
      errors.company_name = "Company name is required!";
    }
    if (!values.company_email) {
      errors.company_email = "Company email is required!";
    } else if (!regex.test(values.company_email)) {
      errors.company_email = "Invalid email address!";
    }

    if (!values.company_phone) {
      errors.company_phone = "Numberphone is required";
    }
    if (!values.company_website) {
      errors.company_website = "Company website is required";
    }

    if (!values.company_est) {
      errors.company_est = "Company Est is required";
    }

    if (!values.company_cat || values.company_cat.length === 0) {
      errors.company_cat = "Company Type is required";
    }
    if (!values.company_about) {
      errors.company_about = "Company about is required";
    } else if (values.company_about.length < 150) {
      errors.company_about = "Company about must be at least 150 words";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleLogoDragOver = (event) => {
    event.preventDefault();
  };
  const handleCoverDragOver = (event) => {
    event.preventDefault();
  };

  const handleLogoDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLogoImg(reader.result);
    };
  };
  const handleCoverDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCoverImg(reader.result);
    };
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setLogoImg(reader.result);
    };
  };
  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCoverImg(reader.result);
    };
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(typeof event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleMultipleSelect = (e) => {
    const selectedValue = Array.isArray(e) ? e.map((x) => x.value) : [];
    setFormData((prevFormData) => ({
      ...prevFormData,
      company_cat: selectedValue,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(formData)) {
      if (logoImg) {
        dispatch(employerUploadFile(logoImg, "profileImage"));
      }
      if (coverImg) {
        dispatch(employerUploadFile(coverImg, "coverImage"));
      }
      dispatch(employersUpdateData(formData));
    }
  };
  useEffect(() => {
    if (company_profile) {
      const { logoImage, coverImage, ...info } = company_profile;
      setFormData(info);
      setLogoUrl(logoImage);
      setCoverUrl(coverImage);
    }
  }, [company_profile]);

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="uploading-outer">
        <div
          className="uploadButton"
          onDrop={handleLogoDrop}
          onDragOver={handleLogoDragOver}
        >
          <input
            className="uploadButton-input"
            type="file"
            name="attachments[]"
            accept=".jpg, .jpeg, .png"
            id="upload"
            onChange={handleLogoUpload}
          />
          <label className="uploadButton-button ripple-effect" htmlFor="upload">
            {logoImg || logoUrl ? (
              <Image
                className=""
                src={logoImg || logoUrl}
                alt="uploaded image"
                priority
                width={500}
                height={500}
              />
            ) : (
              <p>Drag and drop your image here or click to upload</p>
            )}
          </label>
          <span className="uploadButton-file-name"></span>
        </div>
        <div className="text">Logo Image should be png, jpg or jpeg</div>
      </div>

      <div className="uploading-outer">
        <div
          className="uploadButton"
          onDrop={handleCoverDrop}
          onDragOver={handleCoverDragOver}
        >
          <input
            className="uploadButton-input"
            type="file"
            name="attachments[]"
            accept=".jpg, .jpeg, .png"
            id="upload_cover"
            onChange={handleCoverUpload}
          />
          <label
            className="uploadButton-button ripple-effect"
            htmlFor="upload_cover"
          >
            {/* {loading && <Loading />} */}
            {coverImg || coverUrl ? (
              <Image
                className=""
                src={coverImg || coverUrl}
                alt="uploaded image"
                priority
                width={500}
                height={500}
              />
            ) : (
              <p>Drag and drop your image here or click to upload</p>
            )}
          </label>
          <span className="uploadButton-file-name"></span>
        </div>
        <div className="text">Cover Image should be png, jpg or jpeg</div>
      </div>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Company name (optional)</label>
          <input
            type="text"
            name="company_name"
            placeholder="Invisionn"
            value={formData.company_name || ""}
            onChange={handleInputChange}
            style={{ border: `${errors?.company_name ? borderStyle : ""}` }}
          />
          {errors?.company_name && (
            <p className="err-message">{errors?.company_name}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input
            type="text"
            name="company_email"
            placeholder="example@example.com"
            value={formData.company_email || ""}
            onChange={handleInputChange}
            style={{ border: `${errors?.company_email ? borderStyle : ""}` }}
          />
          {errors?.company_email && (
            <p className="err-message">{errors?.company_email}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="company_phone"
            placeholder="020 96218527"
            onChange={handleInputChange}
            value={formData.company_phone || ""}
            style={{ border: `${errors?.company_phone ? borderStyle : ""}` }}
          />
          {errors?.company_phone && (
            <p className="err-message">{errors?.company_phone}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="company_website"
            placeholder="www.invision.com"
            onChange={handleInputChange}
            value={formData.company_website || ""}
            style={{ border: `${errors?.company_website ? borderStyle : ""}` }}
          />
          {errors?.company_website && (
            <p className="err-message">{errors?.company_website}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Est. Since</label>
          <input
            type="date"
            name="company_est"
            placeholder="06.04.2020"
            onChange={handleInputChange}
            value={formData.company_est || ""}
            style={{ border: `${errors?.company_est ? borderStyle : ""}` }}
          />
          {errors?.company_est && (
            <p className="err-message">{errors?.company_est}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Team Size</label>
          <select
            className="chosen-single form-select"
            required
            name="company_teamsize"
            onChange={handleInputChange}
          >
            <option>50 - 100</option>
            <option>100 - 150</option>
            <option>200 - 250</option>
            <option>300 - 350</option>
            <option>500 - 1000</option>
          </select>
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Company Type </label>
          <Select
            // defaultValue={[catOptions[2]]}
            value={defaultValues}
            isMulti
            name="company_type"
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultipleSelect}
          />
          {errors?.company_cat && (
            <p className="err-message">{errors?.company_cat}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Allow In Search & Listing</label>
          <select
            className="chosen-single form-select"
            name="company_listing"
            onChange={handleInputChange}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>About Company</label>
          <textarea
            placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
            name="company_about"
            onChange={handleInputChange}
            value={formData.company_about || ""}
            style={{ border: `${errors?.company_about ? borderStyle : ""}` }}
          ></textarea>
          {errors?.company_about && (
            <p className="err-message">{errors?.company_about}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button className="theme-btn btn-style-one" disabled={!!loading}>
            {" "}
            {!!loading ? <Loading /> : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;

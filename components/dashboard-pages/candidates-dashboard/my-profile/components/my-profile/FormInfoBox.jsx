import Image from "next/image";
import { useEffect, useState } from "react";
import Select from "react-select";
import cityData from "../../../../../../data/countryData";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../../../../../../firebase/clientApp";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/clientApp";
import Swal from "sweetalert2";
import Loading from "../../../../../Loading/Loading";
const FormInfoBox = () => {
  const [profileImg, setProfileImg] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [logoImgName, setLogoImgName] = useState("");
  const [formData, setFormData] = useState(new FormData());
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [district, setDistrict] = useState([]);
  const [loading, setLoading] = useState(false);
  const userUid = useSelector((state) => state.user?.user?.uid);
  
  const catOptions = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Managemnet", label: "Managemnet" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];
  const provinces = [
    "Attapeu",
    "Bokeo",
    "Bolikhamsai",
    "Champasak",
    "Houaphanh",
    "Khammouane",
    "Luang Namtha",
    "Luang Prabang",
    "Oudomxay",
    "Phongsaly",
    "Salavan",
    "Savannakhet",
    "Sekong",
    "Vientiane Province",
    "Vientiane Capital",
    "Xaisomboun",
    "Xayabouly",
    "Xieng Khouang",
  ];
  const handleLogoDragOver = (event) => {
    event.preventDefault();
  };
  const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);

  // Generate an array of months (1 to 12)
  const monthsArray = Array.from({ length: 12 }, (_, i) => i + 1);

  // Generate an array of years (from 1900 to current year)
  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  const handleLogoDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImg(reader.result);
        setLogoImgName(file.name);
      };
    }
  };
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImg(reader.result);
        setLogoImgName(file.name);
      };
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleDayChange = (event) => {
    console.log(event.target.value);
    setDay(event.target.value);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const uploadImage = async (img) => {
    return new Promise((resolve, reject) => {
      const imageName = `${Date.now()}_${uuidv4()}`;
      const storageRef = ref(
        storage,
        `/user_profile/${userUid}/profile_Image/${imageName}`
      );

      uploadString(storageRef, img, "data_url")
        .then((snapshot) => {
          console.log("Uploaded a data_url string!");
          getDownloadURL(snapshot.ref).then((url) => {
            resolve(url);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const handleProvinceChange = (e) => {
    const newState = e.target.value;
    setSelectedProvince(newState);
    setDistrict(cityData[newState] || []);
    setSelectedDistrict("");
  };
  const handleDistrictChange = (e) => {
    const newCity = e.target.value;
    setSelectedDistrict(newCity);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userRef = doc(db, "users", userUid);
    if (profileImg) {
      const profileUrl = await uploadImage(profileImg);
      await updateDoc(userRef, {
        "profile.userProfile.profileImage": profileUrl,
      });
    }
    setDoc(
      userRef,
      {
        profile: {
          userProfile: {
            ...formData,
            dateOfBirth: `${day}/${month}/${year}`,
            province: selectedProvince,
            district: selectedDistrict,
          },
        },
      },
      { merge: true }
    )
      .then((rs) => {
        setLoading(false);
        Swal.fire({
          title: "Success",
          text: "Update Your Information Success",
          icon: "success",
          confirmButtonText: "Accept",
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "Accept",
          timer: 3500,
          timerProgressBar: true,
        });
      });
  };
  const getProfileData = async () => {
    const userRef = doc(db, "users", userUid);
    const profileData = await getDoc(userRef);
    if (
      profileData.exists() &&
      profileData.data().profile &&
      profileData.data().profile.userProfile
    ) {
      const { profileImage, district, province, dateOfBirth, ...data } =
        profileData.data()?.profile?.userProfile;
      const [day, month, year] = dateOfBirth.split("/");
      setDay(day);
      setMonth(month);
      setYear(year);
      setProfileUrl(profileImage);
      setFormData(data);
      setSelectedProvince(province);
      setDistrict(cityData[province] || []);
      setSelectedDistrict(district);
    }
    console.log(profileData.data());
  };
  useEffect(() => {
    getProfileData();
  }, []);

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
            accept="image/*"
            id="upload"
            onChange={handleLogoUpload}
          />
          <label className="uploadButton-button ripple-effect" htmlFor="upload">
            {profileImg || profileUrl ? (
              <Image
                className=""
                src={profileImg || profileUrl}
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
        <div className="text">
          Max file size is 1MB, Minimum dimension: 330x300 And Suitable files
          are .jpg & .png
          <p>{logoImgName}</p>
        </div>
      </div>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            placeholder="John"
            value={formData.firstname || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Doe"
            value={formData.lastname || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Date of birth</label>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "8%",
            }}
          >
            <select
              name="days"
              id=""
              className=" form-select"
              onChange={handleDayChange}
              value={day}
            >
              <option disabled selected value="">
                Days
              </option>
              {daysArray.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            <select
              name="months"
              id=""
              className=" form-select"
              onChange={handleMonthChange}
              value={month}
            >
              <option disabled selected value="">
                Months
              </option>
              {monthsArray.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select
              name="years"
              id=""
              className=" form-select"
              onChange={handleYearChange}
              value={year}
            >
              <option disabled selected value="">
                Years
              </option>
              {yearsArray.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="020 XXXXXXXX"
            value={formData.phone || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-lg-4 col-md-12">
          <label>Province</label>
          <select
            name="province"
            id=""
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
            <option value="" disabled selected>
              Select Your Province
            </option>
            {provinces.map((provinces, index) => (
              <option key={index} value={provinces}>
                {provinces}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-4 col-md-12">
          <label>District</label>
          <select
            name="district"
            id=""
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            <option value="" disabled selected>
              Select Your District
            </option>
            {district.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-lg-4 col-md-12">
          <label>Village</label>
          <input
            type="text"
            placeholder="Your Village"
            name="village"
            value={formData.village || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <select
            name="gender"
            id=""
            onChange={handleInputChange}
            value={formData.gender || ""}
          >
            <option value="" disabled selected>
              Select Your Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="others">others</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Current Salary($)</label>
          <select
            className="chosen-single form-select"
            name="currentSalary"
            onChange={handleInputChange}
            value={formData.currentSalary || ""}
          >
            <option disabled selected>
              Select your Current Salary
            </option>
            <option>40-70 K</option>
            <option>50-80 K</option>
            <option>60-90 K</option>
            <option>70-100 K</option>
            <option>100-150 K</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Expected Salary($)</label>
          <select
            name="expectedSalary"
            className="chosen-single form-select"
            onChange={handleInputChange}
            value={formData.expectedSalary || ""}
          >
            <option disabled selected>
              Select your Expected Salary
            </option>
            <option>120-350 K</option>
            <option>40-70 K</option>
            <option>50-80 K</option>
            <option>60-90 K</option>
            <option>70-100 K</option>
            <option>100-150 K</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Current Position</label>
          <input
            type="text"
            name="currentPosition"
            placeholder="Your Current Position"
            value={formData.currentPosition || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <input
            type="text"
            name="experience"
            placeholder="Your Experience 1-2 years"
            value={formData.experience || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Categories </label>
          <Select
            defaultValue={[catOptions[1]]}
            isMulti
            name="colors"
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Allow In Search & Listing</label>
          <select className="chosen-single form-select">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea
            value={formData.description || ""}
            onChange={handleInputChange}
            name="description"
            placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
          ></textarea>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            {!!loading ? <Loading /> : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;

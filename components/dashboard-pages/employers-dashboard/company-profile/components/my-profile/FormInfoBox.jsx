import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { useEffect, useState } from "react";
import Select from "react-select";
import { db, storage } from "../../../../../../firebase/clientApp";
import { useSelector } from "react-redux";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
const FormInfoBox = () => {
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
  const [logoImg, setLogoImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [formData, setFormData] = useState(new FormData());
  const [selectedValue, setSelectedValue] = useState([]);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const userUid = useSelector((state) => state.user?.user?.uid);

  // get state
  const company_profile = useSelector(
    (state) => state.employerProfile.company_info
  );
  console.log(company_profile);

  // const [logoUrl, setLogoUrl] = useSxtate("");
  // const [coverUrl, setCoverUrl] = useState("");
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
    console.log(typeof event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleMultipleSelect = (e) => {
    const selectedValue = Array.isArray(e) ? e.map((x) => x.value) : [];
    setFormData((prevFormData) => ({
      ...prevFormData,
      company_cat: selectedValue,
    }));
  };

  const uploadImage = async (img) => {
    return new Promise((resolve, reject) => {
      const imageName = `${Date.now()}_${uuidv4()}`;
      const storageRef = ref(storage, `/Image_upload/${imageName}`);
      // const uploadTask = uploadBytesResumable(storageRef, img);
      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const percent = Math.round(
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //     );

      //     // update progress
      //     setPercent(percent);
      //   },
      //   (err) => reject(err),
      //   async () => {
      //     // download url
      //     const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
      //     resolve(imageUrl);
      //   }
      // );
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", userUid);
    console.log(formData);

    // await updateDoc(userRef, {
    //   "profile.company_info":formData,
    // });

    if (logoImg) {
      const logoImgUrl = await uploadImage(logoImg);
      await updateDoc(userRef, {
        "profile.company_info.logoImage": logoImgUrl,
      });
    }
    if (coverImg) {
      const coverImgUrl = await uploadImage(coverImg);
      await updateDoc(userRef, {
        "profile.company_info.coverImage": coverImgUrl,
      });
    }
    await setDoc(
      userRef,
      {
        profile: {
          company_info: formData,
        },
      },
      { merge: true }
    );
  };
  // useEffect(() => {
  //   const getData = async () => {
  //     const userRef = doc(db, "users", userUid);
  //     const docSnap = await getDoc(userRef);
  //     if (docSnap.exists()) {
  //       if (docSnap.data()?.profile?.company_info) {

  //         const { logoImage, coverImage, ...data } =
  //           docSnap.data()?.profile?.company_info;
  //         setFormData(data);
  //         setLogoUrl(logoImage);
  //         setCoverUrl(coverImage);
  //       }
  //     } else {

  //       console.log("No such document!");
  //     }
  //   };

  //   getData();
  // }, []);

  useEffect(() => {
    if (company_profile) {
      const { logoImage, coverImage, ...info } = company_profile;
      console.log(info);
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
            accept="image/*"
            id="upload"
            onChange={handleLogoUpload}
          />
          <label className="uploadButton-button ripple-effect" htmlFor="upload">
            {logoImg || logoUrl ? (
              <Image
                className=""
                src={logoImg || logoUrl}
                alt="uploaded image"
                loading="lazy"
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
            accept="image/*, application/pdf"
            id="upload_cover"
            onChange={handleCoverUpload}
          />
          <label
            className="uploadButton-button ripple-effect"
            htmlFor="upload_cover"
          >
            {coverImg || coverUrl ? (
              <Image
                className=""
                src={coverImg || coverUrl}
                alt="uploaded image"
                loading="lazy"             
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
            required
            value={formData.company_name || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input
            type="text"
            name="company_email"
            placeholder="example@example.com"
            required
            value={formData.company_email || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="company_phone"
            placeholder="020 96218527"
            required
            onChange={handleInputChange}
            value={formData.company_phone || ""}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="company_website"
            placeholder="www.invision.com"
            required
            onChange={handleInputChange}
            value={formData.company_website || ""}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Est. Since</label>
          <input
            type="date"
            name="company_est"
            placeholder="06.04.2020"
            required
            onChange={handleInputChange}
            value={formData.company_est || ""}
          />
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
            defaultValue={[catOptions[2]]}
            isMulti
            name="company_type"
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultipleSelect}
          />
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
          ></textarea>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button className="theme-btn btn-style-one">Save</button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;

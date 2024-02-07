import { useEffect, useState } from "react";
import AddPortfolio from "./AddPortfolio";
import Awards from "./Awards";
import CvUploader from "./CvUploader";
import Education from "./Education";
import Experiences from "./Experiences";
import SkillsMultiple from "./SkillsMultiple";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
// import { db, storage } from "../../../../../firebase/clientApp";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Swal from "sweetalert2";
import Loading from "../../../../Loading/Loading";

const index = () => {
  const [getManager, setManager] = useState(null);
  const [getError, setError] = useState("");
  const [oldFileName, setOldFilename] = useState("");
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const userUid = useSelector((state) => state.user?.user?.uid);

  function checkFileType(file) {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      return false;
    }
    return true;
  }
  const deleteEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };
  const deleteExperience = (index) => {
    const updatedExperience = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperience);
  };

  const cvManagerHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file && file.name !== oldFileName) {
      setOldFilename(file.name);
      // Change the file name
      const fileParts = file.name.split(".");
      const fileExtension = fileParts.pop();
      const newFileName = `${uuidv4()}_${Date.now()}.${fileExtension}`;
      const modifiedFile = new File([file], newFileName, { type: file.type });

      if (checkFileType(modifiedFile)) {
        setManager(modifiedFile);
        setError("");
      } else {
        setError("Only accept (.doc, .docx, .pdf) files");
      }
    } else {
      setError("File is Already Exists");
    }
  };
  const uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
      const imageName = `${Date.now()}_${uuidv4()}`;
      const storageRef = ref(
        storage,
        `/user_profile/${userUid}/cv/${file.name}`
      );

      uploadBytes(storageRef, file)
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
  const deleteHandler = () => {
    setManager(null);
  };
  const handleSave = async (event) => {
    event.preventDefault();
    console.log(event);
    // try {
    //   const userRef = doc(db, "users", userUid);
    //   setLoading(true);
    //   console.log(education);
    //   console.log(experiences);
    //   if (getManager) {
    //     const fileUrl = await uploadFile(getManager);
    //     setDoc(
    //       userRef,
    //       {
    //         profile: {
    //           resume: {
    //             cv: fileUrl,
    //           },
    //         },
    //       },
    //       { merge: true }
    //     );
    //   }
    //   if (education.length > 0) {
    //     setDoc(
    //       userRef,
    //       {
    //         profile: {
    //           resume: {
    //             education: education,
    //           },
    //         },
    //       },
    //       { merge: true }
    //     );
    //   }
    //   if (experiences.length > 0) {
    //     setDoc(
    //       userRef,
    //       {
    //         profile: {
    //           resume: {
    //             experiences: experiences,
    //           },
    //         },
    //       },
    //       { merge: true }
    //     );
    //   }
    //   setLoading(false);
    //   Swal.fire({
    //     title: "Update Success",
    //     text: "Update Your Information Success",
    //     icon: "success",
    //     confirmButtonText: "Accept",
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    // } catch (err) {
    //   Swal.fire({
    //     title: "Error",
    //     text: "Something went wrong!",
    //     icon: "error",
    //     confirmButtonText: "Accept",
    //     timer: 3500,
    //     timerProgressBar: true,
    //   });
    // }
    // fetch(
    //   "https://firebasestorage.googleapis.com/v0/b/job-insider-b06ee.appspot.com/o/user_profile%2FPTePbaqum6cTI453aWH7qK40uCE2%2Fcv%2F49812cda-4bff-4d3c-adca-9853ce2cfc28_1699180119787.pdf?alt=media&token=91402147-a682-403d-86ff-f923fb393be7"
    // )
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const fetchedFile = new File([blob], "sample (3).pdf", {
    //       type: blob.type,
    //     });
    //     console.log(fetchedFile)
    //     setManager(fetchedFile);
    //   });
  };
  const getUserResume = async () => {
    // try {
    //   const userRef = doc(db, "users", userUid);
    //   const resumeData = await getDoc(userRef);
    //   if (
    //     resumeData.exists() &&
    //     resumeData.data().profile &&
    //     resumeData.data().profile.resume
    //   ) {
    //     console.log(resumeData.data()?.profile?.resume);
    //     const { cv, education, experiences } = resumeData.data().profile.resume;
    //     setEducation(education);
    //     setExperiences(experiences);
    //     const urlParts = cv.split("/");
    //     const encodedFileName = urlParts[urlParts.length - 1].split("?")[0];
    //     const decodedFileName = decodeURIComponent(encodedFileName);
    //     const filename = decodedFileName.split("/").pop();
    //     fetch(cv)
    //       .then((response) => response.blob())
    //       .then((blob) => {
    //         const fetchedFile = new File([blob], filename, {
    //           type: blob.type,
    //         });

    //         setManager(fetchedFile);
    //       });
    //   }
    // } catch (err) {
    //   Swal.fire({
    //     title: "Error",
    //     text: "Something went wrong!",
    //     icon: "error",
    //     confirmButtonText: "Accept",
    //     timer: 3500,
    //     timerProgressBar: true,
    //   });
    // }
  };
  useEffect(() => {
    getUserResume();
  }, []);

  return (
    <form className="default-form" onSubmit={handleSave}>
      <div className="row">
        <div className="form-group col-lg-12 col-md-12">
          <CvUploader
            cvManagerHandler={cvManagerHandler}
            getError={getError}
            deleteHandler={deleteHandler}
            getManager={getManager}
          />
        </div>
        {/* <!-- Input --> */}

        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
        </div>
        {/* <!-- About Company --> */}

        <div className="form-group col-lg-12 col-md-12">
          <Education
            setEducation={setEducation}
            education={education}
            deleteEducation={deleteEducation}
          />
          {/* <!-- Resume / Education --> */}

          <Experiences
            setExperiences={setExperiences}
            experiences={experiences}
            deleteExperience={deleteExperience}
          />
          {/* <!-- Resume / Work & Experience --> */}
        </div>
        {/* <!--  education and word-experiences --> */}

        <div className="form-group col-lg-6 col-md-12">
          <AddPortfolio />
        </div>
        {/* <!-- End more portfolio upload --> */}

        <div className="form-group col-lg-12 col-md-12">
          {/* <!-- Resume / Awards --> */}
          <Awards />
        </div>
        {/* <!-- End Award --> */}

        <div className="form-group col-lg-6 col-md-12">
          <label>Skills </label>
          <SkillsMultiple />
        </div>
        {/* <!-- Multi Selectbox --> */}

        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            {!!loading ? <Loading /> : "Save"}
          </button>
        </div>
        {/* <!-- Input --> */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default index;

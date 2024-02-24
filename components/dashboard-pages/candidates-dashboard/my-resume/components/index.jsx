import { useEffect, useState } from "react";
import AddPortfolio from "./AddPortfolio";
import Awards from "./Awards";
import CvUploader from "./CvUploader";
import Education from "./Education";
import Experiences from "./Experiences";
import SkillsMultiple from "./SkillsMultiple";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../../../Loading/Loading";
import {
  candidateResumeSubmit,
  candidateUploadCv,
} from "../../../../../features/candidates/actionCreator";
import Language from "./Language";

const index = () => {
  const dispatch = useDispatch();
  const [getManager, setManager] = useState(null);
  const [getError, setError] = useState("");
  const [oldFileName, setOldFilename] = useState("");
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [language, setLanguage] = useState([]);
  const [loading, setLoading] = useState(false);
  const candidateData = useSelector((state) => {
    return state.candidateSingle.data;
  });
  console.log(education);
  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });
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
  const deleteLanguage = (index) => {
    const updatedLanguage = language.filter((_, i) => i !== index);
    setLanguage(updatedLanguage);
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
  const deleteHandler = () => {
    setManager(null);
  };
  const handleSave = async (event) => {
    event.preventDefault();
    if (getManager) {
      dispatch(candidateUploadCv(getManager, userUid));
    }

    await dispatch(candidateResumeSubmit(education, userUid, "education"));

    await dispatch(candidateResumeSubmit(experiences, userUid, "experiences"));
    await dispatch(candidateResumeSubmit(language, userUid, "languages"));
  };
  const getUserResume = async () => {
    if (candidateData?.resume) {
      const { cvUrl, education, experiences, languages } =
        candidateData?.resume;
      setEducation(education);
      setExperiences(experiences);
      setLanguage(languages);
      if (cvUrl) {
        const urlParts = cvUrl.split("/");
        const encodedFileName = urlParts[urlParts.length - 1].split("?")[0];
        const decodedFileName = decodeURIComponent(encodedFileName);
        const filename = decodedFileName.split("/").pop();
        fetch(cvUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const fetchedFile = new File([blob], filename, {
              type: blob.type,
            });
            setManager(fetchedFile);
          });
      }
    }
  };
  useEffect(() => {
    if (candidateData) {
      getUserResume();
    }
  }, [candidateData]);

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

        {/* <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
        </div> */}
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
          <Language
            language={language}
            setLanguage={setLanguage}
            deleteLanguage={deleteLanguage}
          />
        </div>
        {/* <!--  education and word-experiences --> */}

        {/* <div className="form-group col-lg-6 col-md-12">
          <AddPortfolio />
        </div> */}
        {/* <!-- End more portfolio upload --> */}

        {/* <div className="form-group col-lg-12 col-md-12">
          
          <Awards />
        </div> */}
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

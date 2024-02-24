import { useRef, useState } from "react";
import { Modal, Form } from "react-bootstrap";
const EditModal = ({
  showEdit,
  handleCloseEdit,
  data,
  updatedEducation,
  index,
  validation,
  errors,
}) => {
  const [editData, setEditData] = useState(data);
  const handleInputEdit = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  const CloseEdit = () => {
    handleCloseEdit();
    setEditData(data);
  };
  const handleEdit = () => {
    console.log(editData);
    if (validation(editData)) {
      updatedEducation(index, editData);
      handleCloseEdit();
    }
  };
  return (
    <>
      <Modal show={showEdit === `modal${index}`} onHide={CloseEdit}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div id="login-modal">
            {/* <!-- Login Form --> */}
            <div className="login-form default-form">
              <div className="form-inner">
                <h3>Edit</h3>

                <div className="form-group">
                  <label>School or University</label>
                  <input
                    type="text"
                    name="study_place"
                    placeholder="School or University"
                    value={editData?.study_place}
                    onChange={handleInputEdit}
                  />
                  {errors?.study_place && (
                    <p className="ui-danger mb-0">{errors?.study_place}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <select
                    name="degree"
                    id=""
                    className="chosen-single form-select"
                    value={editData?.degree}
                    onChange={handleInputEdit}
                  >
                    <option value="" disabled selected>
                      Select Degree
                    </option>
                    <option value="Higher Diploma">Higher Diploma</option>
                  </select>
                  {errors?.degree && (
                    <p className="ui-danger mb-0">{errors?.degree}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Dates Attended</label>
                  <div className="select-group">
                    <select
                      className="chosen-single form-select"
                      name="start"
                      value={editData?.start}
                      onChange={handleInputEdit}
                    >
                      <option value="" disabled selected>
                        select year
                      </option>
                      <option value="2000">2000</option>
                    </select>
                    to
                    <select
                      className="chosen-single form-select"
                      name="end"
                      value={editData?.end}
                      onChange={handleInputEdit}
                    >
                      <option value="" disabled selected>
                        select year
                      </option>
                      <option value="2010">2010</option>
                    </select>
                    {errors?.start && (
                      <p className="ui-danger mb-0">{errors?.start}</p>
                    )}
                    {errors?.end && (
                      <p className="ui-danger mb-0">{errors?.end}</p>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    style={{ minHeight: "60px" }}
                    placeholder="About your study"
                    name="description"
                    value={editData?.description}
                    onChange={handleInputEdit}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="theme-btn btn-style-one"
                    type="submit"
                    name="log-in"
                    onClick={handleEdit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* <!--End Login Form --> */}
          </div>
          {/* <!-- End Login Module --> */}
        </Modal.Body>
      </Modal>
    </>
  );
};
const AddEducation = ({
  show,
  handleClose,
  handleSubmit,
  handleInputChange,
  errors,
  degrees,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div id="login-modal">
            {/* <!-- Login Form --> */}
            <div className="login-form default-form">
              <div className="form-inner">
                <h3>Add Education</h3>

                <div className="form-group">
                  <label>School or University</label>
                  <input
                    type="text"
                    name="study_place"
                    placeholder="School or University"
                    onChange={handleInputChange}
                  />
                  {errors?.study_place && (
                    <p className="ui-danger mb-0">{errors?.study_place}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <select
                    name="degree"
                    className="chosen-single form-select"
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected>
                      Select Degree
                    </option>
                    {degrees.map((i, index) => (
                      <option value={i} key={index}>
                        {i}
                      </option>
                    ))}
                  </select>
                  {errors?.degree && (
                    <p className="ui-danger mb-0">{errors?.degree}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Dates Attended</label>
                  <div className="select-group">
                    <select
                      className="chosen-single form-select"
                      name="start"
                      onChange={handleInputChange}
                    >
                      <option value="" disabled selected>
                        select year
                      </option>
                      <option value="2000">2000</option>
                    </select>
                    to
                    <select
                      className="chosen-single form-select"
                      name="end"
                      onChange={handleInputChange}
                    >
                      <option value="" disabled selected>
                        select year
                      </option>
                      <option value="2010">2010</option>
                    </select>
                  </div>
                  {errors?.start && (
                    <p className="ui-danger mb-0">{errors?.start}</p>
                  )}
                  {errors?.end && (
                    <p className="ui-danger mb-0">{errors?.end}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    style={{ minHeight: "60px" }}
                    placeholder="About your study"
                    name="description"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="theme-btn btn-style-one"
                    type="button"
                    name="log-in"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* <!--End Login Form --> */}
          </div>
          {/* <!-- End Login Module --> */}
        </Modal.Body>
      </Modal>
    </>
  );
};
const Education = ({ setEducation, education, deleteEducation }) => {
  const initialState = {
    study_place: "",
    degree: "",
    start: "",
    end: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState("");
  const handleClose = () => {
    setShow(false);
    setErrors({});
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleCloseEdit = () => {
    setShowEdit("");
    setErrors({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validation = (form) => {
    let valid = true;
    let newErrors = {};

    if (form.study_place.trim() === "") {
      newErrors.study_place = "School or University is required";
      valid = false;
    }

    if (form.degree === "") {
      newErrors.degree = "Select Degree ";
      valid = false;
    }

    if (form.start === "") {
      newErrors.start = "Select Start year";
      valid = false;
    }
    if (form.end === "") {
      newErrors.end = "Select end year";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const updatedEducation = (index, data) => {
    setEducation((prevData) => {
      return prevData.map((item, i) => {
        if (i === index) {
          console.log(item);
          return { ...data };
        }
        return item;
      });
    });
  };
  const degrees = [
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation(formData)) {
      setEducation([...education, formData]);
      setFormData(initialState);
      handleClose();
    }
  };
  function getFirstLetterUppercase(str) {
    // Split the string into an array of words
    if (str) {
      var words = str.split(" ");

      // Get the first word and convert the first character to uppercase
      var firstWord = words[0];
      var firstLetter = firstWord.charAt(0).toUpperCase();

      return firstLetter;
    }
  }
  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Education</h4>

        <button className="add-info-btn" type="button" onClick={handleShow}>
          <span className="icon flaticon-plus"></span> Add Aducation
        </button>
        <AddEducation
          show={show}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          errors={errors}
          degrees={degrees}
        />
      </div>
      {/* <!-- Resume BLock --> */}
      {education?.map((i, index) => (
        <div className="resume-block" key={index}>
          {/* <PopupModal data={i.data} modalId={index} /> */}
          <div className="inner">
            <span className="name">
              {getFirstLetterUppercase(i?.study_place)}
            </span>
            <div className="title-box">
              <div className="info-box">
                <h3>{i?.degree}</h3>
                <span>{i?.study_place}</span>
              </div>
              <div className="edit-box">
                <span className="year">{`${i?.start} - ${i?.end}`}</span>
                <div className="edit-btns">
                  <button
                    onClick={() => setShowEdit(`modal${index}`)}
                    type="button"
                  >
                    <span className="la la-pencil"></span>
                  </button>
                  <EditModal
                    showEdit={showEdit}
                    handleCloseEdit={handleCloseEdit}
                    updatedEducation={updatedEducation}
                    key={index}
                    data={i}
                    index={index}
                    validation={validation}
                    errors={errors}
                  />
                  <button onClick={() => deleteEducation(index)} type="button">
                    <span className="la la-trash"></span>
                  </button>
                </div>
              </div>
            </div>
            <div className="text">{i?.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;

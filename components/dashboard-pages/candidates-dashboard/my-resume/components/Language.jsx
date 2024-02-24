import { useState } from "react";
import { Modal } from "react-bootstrap";
import { languageNames } from "../../../../../data/language";
const EditModal = ({
  showEdit,
  handleCloseEdit,
  data,
  updatedLanguage,
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
      updatedLanguage(index, editData);
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
                  <label>Language</label>
                  <select
                    className="chosen-single form-select"
                    name="language"
                    onChange={handleInputEdit}
                    value={editData?.language}
                  >
                    <option value="" disabled selected>
                      Search language
                    </option>

                    {languageNames.map((i, index) => (
                      <option value={i} key={index}>
                        {i}
                      </option>
                    ))}
                  </select>
                  {errors?.language && (
                    <p className="ui-danger mb-0">{errors?.language}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Proficiency level</label>
                  <select
                    className="chosen-single form-select"
                    name="proficiency_level"
                    onChange={handleInputEdit}
                    value={editData?.proficiency_level}
                  >
                    <option value="" disabled selected>
                      Search proficiency level
                    </option>
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="fluent">Fluent</option>
                  </select>
                  {errors?.proficiency_level && (
                    <p className="ui-danger mb-0">
                      {errors?.proficiency_level}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <button
                    className="theme-btn btn-style-one"
                    type="button"
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
const AddLanguage = ({
  show,
  handleClose,
  handleInputChange,
  handleSave,
  errors,
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
                <h3>Add Language</h3>
                <div className="form-group">
                  <label>Language</label>
                  <select
                    className="chosen-single form-select"
                    name="language"
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected>
                      Search language
                    </option>

                    {languageNames.map((i, index) => (
                      <option value={i} key={index}>
                        {i}
                      </option>
                    ))}
                  </select>
                  {errors?.language && (
                    <p className="ui-danger mb-0">{errors?.language}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Proficiency level</label>
                  <select
                    className="chosen-single form-select"
                    name="proficiency_level"
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected>
                      Search proficiency level
                    </option>
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="fluent">Fluent</option>
                  </select>
                  {errors?.proficiency_level && (
                    <p className="ui-danger mb-0">
                      {errors?.proficiency_level}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <button
                    className="theme-btn btn-style-one"
                    type="button"
                    name="log-in"
                    onClick={handleSave}
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

const Language = ({ language, setLanguage, deleteLanguage }) => {
  const initialState = {
    language: "",
    proficiency_level: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState("");
  const [errors, setErrors] = useState({});
  const handleClose = () => {
    setShow(false);
    setErrors({});
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCloseEdit = () => {
    setShowEdit("");
    setErrors({});
  };
  const updatedLanguage = (index, data) => {
    setLanguage((prevData) => {
      return prevData.map((item, i) => {
        if (i === index) {
          console.log(item);
          return { ...data };
        }
        return item;
      });
    });
  };
  const validation = (form) => {
    let valid = true;
    let newErrors = {};

    if (form.language === "") {
      newErrors.language = "Select language";
      valid = false;
    }
    if (form.proficiency_level === "") {
      newErrors.proficiency_level = "Select your level of language";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (validation(formData)) {
      setLanguage([...language, formData]);
      setFormData(initialState);
      handleClose();
    }
  };
  return (
    <div className="resume-outer theme-blue">
      <div className="upper-title">
        <h4>Languages</h4>
        <button className="add-info-btn" onClick={handleShow} type="button">
          <span className="icon flaticon-plus"></span> Add language
        </button>
        <AddLanguage
          show={show}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          validation={validation}
          errors={errors}
        />
      </div>
      {/* <!-- Resume BLock --> */}
      {language?.map((i, index) => (
        <div className="resume-block" key={index}>
          <div className="inner">
            <span className="name">S</span>
            <div className="title-box">
              <div className="info-box">
                <h3>{i.language}</h3> {/* Change to i.language */}
                <span>{i.proficiency_level}</span>{" "}
                {/* Change to i.proficiency_level */}
              </div>
              <div className="edit-box">
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
                    index={index}
                    data={i}
                    updatedLanguage={updatedLanguage}
                    errors={errors}
                    validation={validation}
                  />
                  <button onClick={() => deleteLanguage(index)}>
                    <span className="la la-trash"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Language;

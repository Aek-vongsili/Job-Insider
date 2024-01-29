import { useState } from "react";
import { Modal } from "react-bootstrap";
const EditModal = ({
  showEdit,
  handleCloseEdit,
  data,
  updatedExperience,
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
      updatedExperience(index, editData);
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
                  <label>Your Position</label>
                  <input
                    type="text"
                    name="position"
                    placeholder="School or University"
                    value={editData?.position}
                    onChange={handleInputEdit}
                  />
                  {errors?.position && (
                    <p className="ui-danger mb-0">{errors?.position}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Industry</label>
                  <input
                    type="text"
                    name="industry"
                    placeholder="Your industry"
                    value={editData?.industry}
                    onChange={handleInputEdit}
                  />

                  {errors?.industry && (
                    <p className="ui-danger mb-0">{errors?.industry}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Since</label>
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
                    value={editData?.description}
                    onChange={handleInputEdit}
                  />
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
const AddExperience = ({
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
                <h3>Add Experience</h3>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    placeholder=" Your Position"
                    onChange={handleInputChange}
                  />
                  {errors?.position && (
                    <p className="ui-danger mb-0">{errors?.position}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Industry</label>
                  <input
                    type="text"
                    name="industry"
                    placeholder="Your industry"
                    onChange={handleInputChange}
                  />
                  {errors?.industry && (
                    <p className="ui-danger mb-0">{errors?.industry}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Since</label>
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
                    placeholder="About your industry and your work"
                    name="description"
                    onChange={handleInputChange}
                  />
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

const Experiences = ({ experiences, setExperiences, deleteExperience }) => {
  const initialState = {
    position: "",
    industry: "",
    start: "",
    end: "",
    description: "",
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCloseEdit = () => {
    setShowEdit("");
    setErrors({});
  };
  const updatedExperience = (index, data) => {
    setExperiences((prevData) => {
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

    if (form.position.trim() === "") {
      newErrors.position = "position is required";
      valid = false;
    }

    if (form.industry.trim() === "") {
      newErrors.industry = "Industry is required";
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
  const handleSave = (e) => {
    e.preventDefault();
    if (validation(formData)) {
      setExperiences([...experiences, formData]);
      setFormData(initialState);
      handleClose();
    }
  };
  return (
    <div className="resume-outer theme-blue">
      <div className="upper-title">
        <h4>Work & Experience</h4>
        <button className="add-info-btn" onClick={handleShow} type="button">
          <span className="icon flaticon-plus"></span> Add Work
        </button>
        <AddExperience
          show={show}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          validation={validation}
          errors={errors}
        />
      </div>
      {/* <!-- Resume BLock --> */}
      {experiences?.map((i, index) => (
        <div className="resume-block">
          <div className="inner" key={index}>
            <span className="name">S</span>
            <div className="title-box">
              <div className="info-box">
                <h3>{i?.position}</h3>
                <span>{i?.industry}</span>
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
                    index={index}
                    data={i}
                    updatedExperience={updatedExperience}
                    errors={errors}
                    validation={validation}
                  />
                  <button onClick={() => deleteExperience(index)}>
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

export default Experiences;

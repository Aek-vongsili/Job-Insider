import { useState } from "react";

// validation chaching

const CvUploader = ({
  cvManagerHandler,
  getError,
  getManager,
  deleteHandler,
}) => {
  // delete image

  return (
    <>
      {/* Start Upload resule */}
      <label>Your CV</label>
      <div className="uploading-resume">
        
        <div className="uploadButton">
          <input
            className="uploadButton-input"
            type="file"
            name="attachments[]"
            accept=".doc,.docx,.xml,application/msword,application/pdf,image/*"
            id="uploadcv"
            // multiple
            onChange={cvManagerHandler}
          />
          <label className="cv-uploadButton" htmlFor="uploadcv">
            <span className="title">Drop files here to upload</span>
            <span className="text">
              To upload file size is (Max 5Mb) and allowed file types are (.doc,
              .docx, .pdf)
            </span>
            <span className="theme-btn btn-style-one">Upload Resume</span>
            {getError !== "" ? (
              <p className="ui-danger mb-0">{getError}</p>
            ) : undefined}
          </label>
          <span className="uploadButton-file-name"></span>
        </div>
      </div>
      {/* End upload-resume */}

      {/* Start resume Preview  */}
      <div className="files-outer">
        {getManager ? (
          <div className="file-edit-box">
            <span className="title" style={{wordBreak:"break-word"}}>{getManager.name}</span>
            <div className="edit-btns">
              <button>
                <span className="la la-pencil"></span>
              </button>
              <button onClick={() => deleteHandler(getManager.name)}>
                <span className="la la-trash"></span>
              </button>
            </div>
          </div>
        ) : undefined}

        {/* <div className="file-edit-box">
                    <span className="title">Sample CV</span>
                    <div className="edit-btns">
                        <button>
                            <span className="la la-pencil"></span>
                        </button>
                        <button>
                            <span className="la la-trash"></span>
                        </button>
                    </div>
                </div>

                <div className="file-edit-box">
                    <span className="title">Sample CV</span>
                    <div className="edit-btns">
                        <button>
                            <span className="la la-pencil"></span>
                        </button>
                        <button>
                            <span className="la la-trash"></span>
                        </button>
                    </div>
                </div>*/}
      </div>
      {/* <div className="form-group">
        <button type="submit" className="theme-btn btn-style-one">
          Upload
        </button>
      </div> */}
      {/* End resume Preview  */}
    </>
  );
};

export default CvUploader;

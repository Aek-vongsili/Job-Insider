const actions = {
  EMPLOYER_UPDATE_BEGIN: "EMPLOYER_INSERT_BEGIN",
  EMPLOYER_UPDATE_SUCCESS: "EMPLOYER_INSERT_SUCCESS",
  EMPLOYER_UPDATE_ERR: "EMPLOYER_INSERT_ERR",

  EMPLOYER_READ_BEGIN: "EMPLOYER_READ_BEGIN",
  EMPLOYER_READ_SUCCESS: "EMPLOYER_READ_SUCCESS",
  EMPLOYER_READ_ERR: "EMPLOYER_READ_ERR",

  EMPLOYER_SINGLE_BEGIN: "EMPLOYER_SINGLE_BEGIN",
  EMPLOYER_SINGLE_SUCCESS: "EMPLOYER_SINGLE_SUCCESS",
  EMPLOYER_SINGLE_ERR: "EMPLOYER_SINGLE_ERR",

  EMPLOYER_UPLOAD_BEGIN: "EMPLOYER_UPLOAD_BEGIN",
  EMPLOYER_UPLOAD_SUCCESS: "EMPLOYER_UPLOAD_SUCCESS",
  EMPLOYER_UPLOAD_ERR: "EMPLOYER_UPLOAD_ERR",

  EMPLOYER_LOCATION_BEGIN: "EMPLOYER_LOCATION_BEGIN",
  EMPLOYER_LOCATION_SUCCESS: "EMPLOYER_LOCATION_SUCCESS",
  EMPLOYER_LOCATION_ERR: "EMPLOYER_LOCATION_ERR",

  EMPLOYER_LOCATION_READ_BEGIN: "EMPLOYER_LOCATION_READ_BEGIN",
  EMPLOYER_LOCATION_READ_SUCCESS: "EMPLOYER_LOCATION_READ_SUCCESS",
  EMPLOYER_LOCATION_READ_ERR: "EMPLOYER_LOCATION_READ_ERR",

  EMPLOYER_GET_JOBS_BEGIN: "EMPLOYER_GET_JOBS_BEGIN",
  EMPLOYER_GET_JOBS_SUCCESS: "EMPLOYER_GET_JOBS_SUCCESS",
  EMPLOYER_GET_JOBS_ERR: "EMPLOYER_GET_JOBS_ERR",

  EMPLOYER_EDIT_JOB_BEGIN: "EMPLOYER_EDIT_JOB_BEGIN",
  EMPLOYER_EDIT_JOB_SUCCESS: "EMPLOYER_EDIT_JOB_SUCCESS",
  EMPLOYER_EDIT_JOB_ERR: "EMPLOYER_EDIT_JOB_ERR",

  EMPLOYER_DELETE_JOB_BEGIN: "EMPLOYER_DELETE_JOB_BEGIN",
  EMPLOYER_DELETE_JOB_SUCCESS: "EMPLOYER_DELETE_JOB_SUCCESS",
  EMPLOYER_DELETE_JOB_ERR: "EMPLOYER_DELETE_JOB_ERR",

  EMPLOYER_APPROVE_APPLICANT_BEGIN: "EMPLOYER_APPROVE_APPLICANT_BEGIN",
  EMPLOYER_APPROVE_APPLICANT_SUCCESS: "EMPLOYER_APPROVE_APPLICANT_SUCCESS",
  EMPLOYER_APPROVE_APPLICANT_ERR: "EMPLOYER_APPROVE_APPLICANT_ERR",

  EMPLOYER_REJECT_APPLICANT_BEGIN: "EMPLOYER_REJECT_APPLICANT_BEGIN",
  EMPLOYER_REJECT_APPLICANT_SUCCESS: "EMPLOYER_REJECT_APPLICANT_SUCCESS",
  EMPLOYER_REJECT_APPLICANT_ERR: "EMPLOYER_REJECT_APPLICANT_ERR",

  EMPLOYER_UNDO_APPLICANT_BEGIN: "EMPLOYER_UNDO_APPLICANT_BEGIN",
  EMPLOYER_UNDO_APPLICANT_SUCCESS: "EMPLOYER_UNDO_APPLICANT_SUCCESS",
  EMPLOYER_UNDO_APPLICANT_ERR: "EMPLOYER_UNDO_APPLICANT_ERR",

  employerUpdateBegin: () => {
    return {
      type: actions.EMPLOYER_UPDATE_BEGIN,
    };
  },
  employerUpdateSuccess: (data) => {
    return {
      type: actions.EMPLOYER_UPDATE_SUCCESS,
      data,
    };
  },

  employerUpdateErr: (err) => {
    return {
      type: actions.EMPLOYER_UPDATE_ERR,
      err,
    };
  },

  employerReadBegin: () => {
    return {
      type: actions.EMPLOYER_READ_BEGIN,
    };
  },
  employerReadSuccess: (data) => {
    return {
      type: actions.EMPLOYER_READ_SUCCESS,
      data,
    };
  },

  employerReadErr: (err) => {
    return {
      type: actions.EMPLOYER_READ_ERR,
      err,
    };
  },

  employerUploadBegin: () => {
    return {
      type: actions.EMPLOYER_UPLOAD_BEGIN,
    };
  },
  employerUploadSuccess: (data) => {
    return {
      type: actions.EMPLOYER_UPLOAD_SUCCESS,
      data,
    };
  },

  employerUploadErr: (err) => {
    return {
      type: actions.EMPLOYER_UPLOAD_ERR,
      err,
    };
  },

  employerSingleBegin: () => {
    return {
      type: actions.EMPLOYER_SINGLE_BEGIN,
    };
  },
  employerSingleSuccess: (data) => {
    return {
      type: actions.EMPLOYER_SINGLE_SUCCESS,
      data,
    };
  },

  employerSingleErr: (err) => {
    return {
      type: actions.EMPLOYER_SINGLE_ERR,
      err,
    };
  },
  employerLocationBegin: () => {
    return {
      type: actions.EMPLOYER_LOCATION_BEGIN,
    };
  },
  employerLocationSuccess: (data) => {
    return {
      type: actions.EMPLOYER_LOCATION_SUCCESS,
      data,
    };
  },

  employerLocationErr: (err) => {
    return {
      type: actions.EMPLOYER_LOCATION_ERR,
      err,
    };
  },
  employerLocationReadBegin: () => {
    return {
      type: actions.EMPLOYER_LOCATION_READ_BEGIN,
    };
  },
  employerLocationReadSuccess: (data) => {
    return {
      type: actions.EMPLOYER_LOCATION_READ_SUCCESS,
      data,
    };
  },

  employerLocationReadErr: (err) => {
    return {
      type: actions.EMPLOYER_LOCATION_READ_ERR,
      err,
    };
  },

  //EMPLOYER JOB LIST
  employerJobListReadBegin: () => {
    return {
      type: actions.EMPLOYER_GET_JOBS_BEGIN,
    };
  },
  employerJobListReadSuccess: (data) => {
    return {
      type: actions.EMPLOYER_GET_JOBS_SUCCESS,
      data,
    };
  },

  employerJobListReadErr: (err) => {
    return {
      type: actions.EMPLOYER_GET_JOBS_ERR,
      err,
    };
  },

  //EMPLOYER EDIT JOB
  employerEditJobBegin: () => {
    return {
      type: actions.EMPLOYER_EDIT_JOB_BEGIN,
    };
  },
  employerEditJobSuccess: (data) => {
    return {
      type: actions.EMPLOYER_EDIT_JOB_SUCCESS,
      data,
    };
  },

  employerEditJobErr: (err) => {
    return {
      type: actions.EMPLOYER_EDIT_JOB_ERR,
      err,
    };
  },
  //EMPLOYER DELETE JOB
  employerDeleteJobBegin: () => {
    return {
      type: actions.EMPLOYER_DELETE_JOB_BEGIN,
    };
  },
  employerDeleteJobSuccess: (data) => {
    return {
      type: actions.EMPLOYER_DELETE_JOB_SUCCESS,
      data,
    };
  },

  employerDeleteJobErr: (err) => {
    return {
      type: actions.EMPLOYER_DELETE_JOB_ERR,
      err,
    };
  },
  //EMPLOYER APPROVE APPLICANT
  employerApproveApplicantBegin: () => {
    return {
      type: actions.EMPLOYER_APPROVE_APPLICANT_BEGIN,
    };
  },
  employerApproveApplicantSuccess: (data) => {
    return {
      type: actions.EMPLOYER_APPROVE_APPLICANT_SUCCESS,
      data,
    };
  },

  employerApproveApplicantErr: (err) => {
    return {
      type: actions.EMPLOYER_APPROVE_APPLICANT_ERR,
      err,
    };
  },
  //EMPLOYER REJECT APPLICANT
  employerRejectApplicantBegin: () => {
    return {
      type: actions.EMPLOYER_REJECT_APPLICANT_BEGIN,
    };
  },
  employerRejectApplicantSuccess: (data) => {
    return {
      type: actions.EMPLOYER_REJECT_APPLICANT_SUCCESS,
      data,
    };
  },

  employerRejectApplicantErr: (err) => {
    return {
      type: actions.EMPLOYER_REJECT_APPLICANT_ERR,
      err,
    };
  },

  employerUndoApplicantBegin: () => {
    return {
      type: actions.EMPLOYER_UNDO_APPLICANT_BEGIN,
    };
  },
  employerUndoApplicantSuccess: (data) => {
    return {
      type: actions.EMPLOYER_UNDO_APPLICANT_SUCCESS,
      data,
    };
  },

  employerUndoApplicantErr: (err) => {
    return {
      type: actions.EMPLOYER_UNDO_APPLICANT_ERR,
      err,
    };
  },
};

export default actions;

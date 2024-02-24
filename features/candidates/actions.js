const actions = {
  CANDIDATE_UPDATE_BEGIN: "CANDIDATE_UPDATE_BEGIN",
  CANDIDATE_UPDATE_SUCCESS: "CANDIDATE_UPDATE_SUCCESS",
  CANDIDATE_UPDATE_ERR: "CANDIDATE_UPDATE_ERR",

  CANDIDATE_READ_BEGIN: "CANDIDATE_READ_BEGIN",
  CANDIDATE_READ_SUCCESS: "CANDIDATE_READ_SUCCESS",
  CANDIDATE_READ_ERR: "CANDIDATE_READ_ERR",

  CANDIDATE_SINGLE_BEGIN: "CANDIDATE_SINGLE_BEGIN",
  CANDIDATE_SINGLE_SUCCESS: "CANDIDATE_SINGLE_SUCCESS",
  CANDIDATE_SINGLE_ERR: "CANDIDATE_SINGLE_ERR",

  CANDIDATE_UPLOAD_BEGIN: "CANDIDATE_UPLOAD_BEGIN",
  CANDIDATE_UPLOAD_SUCCESS: "CANDIDATE_UPLOAD_SUCCESS",
  CANDIDATE_UPLOAD_ERR: "CANDIDATE_UPLOAD_ERR",

  CANDIDATE_UPLOAD_CV_BEGIN: "CANDIDATE_UPLOAD_CV_BEGIN",
  CANDIDATE_UPLOAD_CV_SUCCESS: "CANDIDATE_UPLOAD_CV_SUCCESS",
  CANDIDATE_UPLOAD_CV_ERR: "CANDIDATE_UPLOAD_CV_ERR",

  CANDIDATE_RESUME_SUBMIT_BEGIN: "CANDIDATE_RESUME_SUBMIT_BEGIN",
  CANDIDATE_RESUME_SUBMIT_SUCCESS: "CANDIDATE_RESUME_SUBMIT_SUCCESS",
  CANDIDATE_RESUME_SUBMIT_ERR: "CANDIDATE_RESUME_SUBMIT_ERR",

  CANDIDATE_RESUME_READ_BEGIN: "CANDIDATE_RESUME_READ_BEGIN",
  CANDIDATE_RESUME_READ_SUCCESS: "CANDIDATE_RESUME_READ_SUCCESS",
  CANDIDATE_RESUME_READ_ERR: "CANDIDATE_RESUME_READ_ERR",

  candidateUpdateBegin: () => {
    return {
      type: actions.CANDIDATE_UPDATE_BEGIN,
    };
  },
  candidateUpdateSuccess: (data) => {
    return {
      type: actions.CANDIDATE_UPDATE_SUCCESS,
      data,
    };
  },
  candidateUpdateErr: (err) => {
    return {
      type: actions.CANDIDATE_UPDATE_ERR,
      err,
    };
  },

  candidateUploadBegin: () => {
    return {
      type: actions.CANDIDATE_UPLOAD_BEGIN,
    };
  },
  candidateUploadSuccess: (data) => {
    return {
      type: actions.CANDIDATE_UPLOAD_SUCCESS,
      data,
    };
  },
  candidateUploadErr: (err) => {
    return {
      type: actions.CANDIDATE_UPLOAD_ERR,
      err,
    };
  },

  candidateReadBegin: () => {
    return {
      type: actions.CANDIDATE_READ_BEGIN,
    };
  },
  candidateReadSuccess: (data) => {
    return {
      type: actions.CANDIDATE_READ_SUCCESS,
      data,
    };
  },
  candidateReadErr: (err) => {
    return {
      type: actions.CANDIDATE_READ_ERR,
      err,
    };
  },

  candidateSingleBegin: () => {
    return {
      type: actions.CANDIDATE_SINGLE_BEGIN,
    };
  },
  candidateSingleSuccess: (data) => {
    return {
      type: actions.CANDIDATE_SINGLE_SUCCESS,
      data,
    };
  },
  candidateSingleErr: (err) => {
    return {
      type: actions.CANDIDATE_SINGLE_ERR,
      err,
    };
  },

  candidateCvBegin: () => {
    return {
      type: actions.CANDIDATE_UPLOAD_CV_BEGIN,
    };
  },
  candidateCvSuccess: (data) => {
    return {
      type: actions.CANDIDATE_UPLOAD_CV_SUCCESS,
      data,
    };
  },
  candidateCvErr: (err) => {
    return {
      type: actions.CANDIDATE_UPLOAD_CV_ERR,
      err,
    };
  },

  candidateResumeBegin: () => {
    return {
      type: actions.CANDIDATE_RESUME_SUBMIT_BEGIN,
    };
  },
  candidateResumeSuccess: (data) => {
    return {
      type: actions.CANDIDATE_RESUME_SUBMIT_SUCCESS,
      data,
    };
  },
  candidateResumeErr: (err) => {
    return {
      type: actions.CANDIDATE_RESUME_SUBMIT_ERR,
      err,
    };
  },
  candidateResumeReadBegin: () => {
    return {
      type: actions.CANDIDATE_RESUME_READ_BEGIN,
    };
  },
  candidateResumeReadSuccess: (data) => {
    return {
      type: actions.CANDIDATE_RESUME_READ_SUCCESS,
      data,
    };
  },
  candidateResumeReadErr: (err) => {
    return {
      type: actions.CANDIDATE_RESUME_READ_ERR,
      err,
    };
  },
};

export default actions;

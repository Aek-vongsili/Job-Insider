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
};

export default actions;

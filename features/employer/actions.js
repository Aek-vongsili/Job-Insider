const actions = {
  EMPLOYER_UPDATE_BEGIN: "EMPLOYER_INSERT_BEGIN",
  EMPLOYER_UPDATE_SUCESS: "EMPLOYER_INSERT_SUCESS",
  EMPLOYER_UPDATE_ERR: "EMPLOYER_INSERT_ERR",

  EMPLOYER_READ_BEGIN: "EMPLOYER_READ_BEGIN",
  EMPLOYER_READ_SUCESS: "EMPLOYER_READ_SUCESS",
  EMPLOYER_READ_ERR: "EMPLOYER_READ_ERR",

  EMPLOYER_SINGLE_BEGIN: "EMPLOYER_SINGLE_BEGIN",
  EMPLOYER_SINGLE_SUCESS: "EMPLOYER_SINGLE_SUCESS",
  EMPLOYER_SINGLE_ERR: "EMPLOYER_SINGLE_ERR",

  EMPLOYER_UPLOAD_BEGIN: "EMPLOYER_UPLOAD_BEGIN",
  EMPLOYER_UPLOAD_SUCESS: "EMPLOYER_UPLOAD_SUCESS",
  EMPLOYER_UPLOAD_ERR: "EMPLOYER_UPLOAD_ERR",

  EMPLOYER_LOCATION_BEGIN: "EMPLOYER_LOCATION_BEGIN",
  EMPLOYER_LOCATION_SUCESS: "EMPLOYER_LOCATION_SUCESS",
  EMPLOYER_LOCATION_ERR: "EMPLOYER_LOCATION_ERR",

  employerUpdateBegin: () => {
    return {
      type: actions.EMPLOYER_UPDATE_BEGIN,
    };
  },
  employerUpdateSuccess: (data) => {
    return {
      type: actions.EMPLOYER_UPDATE_SUCESS,
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
      type: actions.EMPLOYER_READ_SUCESS,
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
      type: actions.EMPLOYER_UPLOAD_SUCESS,
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
      type: actions.EMPLOYER_SINGLE_SUCESS,
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
      type: actions.EMPLOYER_LOCATION_SUCESS,
      data,
    };
  },

  employerLocationErr: (err) => {
    return {
      type: actions.EMPLOYER_LOCATION_ERR,
      err,
    };
  },
};

export default actions;

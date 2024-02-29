const actions = {
  JOBS_READ_BEGIN: "JOBS_READ_BEGIN",
  JOBS_READ_SUCCESS: "JOBS_READ_SUCCESS",
  JOBS_READ_ERR: "JOBS_READ_ERR",

  JOB_SINGLE_BEGIN: "JOB_SINGLE_BEGIN",
  JOB_SINGLE_SUCCESS: "JOB_SINGLE_SUCCESS",
  JOB_SINGLE_ERR: "JOB_SINGLE_ERR",

  JOB_INSERT_BEGIN: "JOB_INSERT_BEGIN",
  JOB_INSERT_SUCCESS: "JOB_INSERT_SUCCESS",
  JOB_INSERT_ERR: "JOB_INSERT_ERR",

  FAV_JOB_BEGIN: "FAV_JOB_BEGIN",
  FAV_JOB_SUCCESS: "FAV_JOB_SUCCESS",
  FAV_JOB_ERR: "FAV_JOB_ERR",

  REMOVE_FAV_JOB_BEGIN: "REMOVE_FAV_JOB_BEGIN",
  REMOVE_FAV_JOB_SUCCESS: "REMOVE_FAV_JOB_SUCCESS",
  REMOVE_FAV_JOB_ERR: "REMOVE_FAV_JOB_ERR",

  FAV_JOB_GET_BEGIN: "FAV_JOB_GET_BEGIN",
  FAV_JOB_GET_SUCCESS: "FAV_JOB_GET_SUCCESS",
  FAV_JOB_GET_ERR: "FAV_JOB_GET_ERR",

  jobReadBegin: () => {
    return {
      type: actions.JOBS_READ_BEGIN,
    };
  },
  jobReadSuccess: (data) => {
    return {
      type: actions.JOBS_READ_SUCCESS,
      data,
    };
    s;
  },

  jobReadErr: (err) => {
    return {
      type: actions.JOBS_READ_ERR,
      err,
    };
  },
  jobInsertBegin: () => {
    return {
      type: actions.JOB_INSERT_BEGIN,
    };
  },
  jobInsertSuccess: (data) => {
    return {
      type: actions.JOB_INSERT_SUCCESS,
      data,
    };
  },

  jobInsertErr: (err) => {
    return {
      type: actions.JOB_INSERT_ERR,
      err,
    };
  },
  jobSingleBegin: () => {
    return {
      type: actions.JOB_SINGLE_BEGIN,
    };
  },
  jobSingleSuccess: (data) => {
    return {
      type: actions.JOB_SINGLE_SUCCESS,
      data,
    };
  },

  jobSingleErr: (err) => {
    return {
      type: actions.JOB_SINGLE_ERR,
      err,
    };
  },
  favJobBegin: () => {
    return {
      type: actions.FAV_JOB_BEGIN,
    };
  },
  favJobSuccess: (data) => {
    return {
      type: actions.FAV_JOB_SUCCESS,
      data,
    };
  },

  favJobErr: (err) => {
    return {
      type: actions.FAV_JOB_ERR,
      err,
    };
  },
  removeFavJobBegin: () => {
    return {
      type: actions.REMOVE_FAV_JOB_BEGIN,
    };
  },
  removeFavJobSuccess: (data) => {
    return {
      type: actions.REMOVE_FAV_JOB_SUCCESS,
      data,
    };
  },

  removeFavJobErr: (err) => {
    return {
      type: actions.REMOVE_FAV_JOB_ERR,
      err,
    };
  },
  favJobGetBegin: () => {
    return {
      type: actions.FAV_JOB_GET_BEGIN,
    };
  },
  favJobGetSuccess: (data) => {
    return {
      type: actions.FAV_JOB_GET_SUCCESS,
      data,
    };
  },

  favJobGetErr: (err) => {
    return {
      type: actions.FAV_JOB_GET_ERR,
      err,
    };
  },
};

export default actions;

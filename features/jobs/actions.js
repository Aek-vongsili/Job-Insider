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
};

export default actions;

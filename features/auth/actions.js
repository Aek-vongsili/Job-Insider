const actions = {
  FB_LOGIN_BEGIN: "FB_LOGIN_BEGIN",
  FB_LOGIN_SUCCESS: "FB_LOGIN_SUCCESS",
  FB_LOGIN_ERR: "FB_LOGIN_ERR",

  FB_LOGOUT_BEGIN: "FB_LOGOUT_BEGIN",
  FB_LOGOUT_SUCCESS: "FB_LOGOUT_SUCCESS",
  FB_LOGOUT_ERR: "FB_LOGOUT_ERR",

  FB_SIGNUP_BEGIN: "FB_SIGNUP_BEGIN",
  FB_SIGNUP_SUCCESS: "FB_SIGNUP_SUCCESS",
  FB_SIGNUP_ERR: "FB_SIGNUP_ERR",

  LOGIN_CHECK_BEGIN: "LOGIN_BEGIN",
  LOGIN_CHECK_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_CHECK_ERR: "LOGIN_ERR",

  LOGOUT_SUCCESS: "LOGIN_SUCCESS",



  fbLoginBegin: () => {
    return {
      type: actions.FB_LOGIN_BEGIN,
    };
  },

  fbLoginSuccess: (data) => {
    return {
      type: actions.FB_LOGIN_SUCCESS,
      data,
    };
  },

  fbLoginErr: (err) => {
    return {
      type: actions.FB_LOGIN_ERR,
      err,
    };
  },

  fbLogOutBegin: () => {
    return {
      type: actions.FB_LOGOUT_BEGIN,
    };
  },

  fbLogOutSuccess: (data) => {
    return {
      type: actions.FB_LOGOUT_SUCCESS,
      data,
    };
  },

  fbLogOutErr: (err) => {
    return {
      type: actions.FB_LOGOUT_ERR,
      err,
    };
  },

  fbSignUpBegin: () => {
    return {
      type: actions.FB_SIGNUP_BEGIN,
    };
  },

  fbSignUpSuccess: (data) => {
    return {
      type: actions.FB_SIGNUP_SUCCESS,
      data,
    };
  },

  fbSignUpErr: (err) => {
    return {
      type: actions.FB_SIGNUP_ERR,
      err,
    };
  },
  loginCheckBegin: () => {
    return {
      type: actions.LOGIN_CHECK_BEGIN,
    };
  },

  loginCheckSuccess: (data) => {
    return {
      type: actions.LOGIN_CHECK_SUCCESS,
      data,
    };
  },
  

  loginCheckErr: (err) => {
    return {
      type: actions.LOGIN_CHECK_ERR,
      err,
    };
  },

  logoutSuccess: (data) => {
    return {
      type: actions.LOGOUT_SUCCESS,
      data,
    };
  },
};

export default actions;

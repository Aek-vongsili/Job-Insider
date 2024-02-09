import actions from "./actions";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import employerAction from "../employer/actions";
const showSuccessNotification = (text, callback) => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: text || "Operation completed successfully!",
    confirmButtonText: "Accept",
    timer: 2000,
    timerProgressBar: true,
  }).then((result) => {
    if (typeof callback === "function") {
      callback();
    }
  });
};
const { employerSingleSuccess } = employerAction;
const {
  fbLoginBegin,
  fbLoginSuccess,
  fbLoginErr,

  fbLogOutBegin,
  fbLogOutSuccess,
  fbLogOutErr,

  fbSignUpBegin,
  fbSignUpSuccess,
  fbSignUpErr,

  loginCheckBegin,
  loginCheckSuccess,
  loginCheckErr,

  logoutSuccess,
} = actions;

const fbAuthLogin = (data, callback) => {
  return async (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase();
    try {
      await dispatch(fbLoginBegin());
      await fb.auth().signInWithEmailAndPassword(data.email, data.password);
      await dispatch(fbLoginSuccess());
      callback();
    } catch (err) {
      await dispatch(fbLoginErr(err));
    }
  };
};

const fbLoginCheck = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase();
    dispatch(loginCheckBegin());
    try {
      const idToken = await fb.auth().currentUser.getIdToken(true);
      const getRole = await axios.post(
        "/api/decode",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json", // Adjust content type as needed
          },
        }
      );
      if (getRole.status === 200) {
        Cookies.set("token", idToken, { sameSite: "none", secure: true });
        Cookies.set("logedIn", true, { sameSite: "none", secure: true });
        Cookies.set("role", getRole.data.role, {
          sameSite: "none",
          secure: true,
        });
        dispatch(loginCheckSuccess({ login: true, role: getRole.data.role }));
      } else {
        dispatch(loginCheckSuccess({ login: false, role: null }));
      }
    } catch (err) {
      dispatch(loginCheckErr(err));
    }
  };
};
const fbAuthLogout = (callback) => {
  return async (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase();
    try {
      await dispatch(fbLogOutBegin());
      await fb.auth().signOut();
      Cookies.remove("logedIn");
      Cookies.remove("token");
      await dispatch(logoutSuccess(false));
      await dispatch(fbLogOutSuccess());
      await dispatch(employerSingleSuccess(null));
      callback();
    } catch (err) {
      await dispatch(fbLogOutErr(err));
    }
  };
};

const fbAuthSignUp = (newUser, type, colName, callback) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const fb = getFirebase();
    try {
      await dispatch(fbSignUpBegin());
      const response = await fb
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
      const idToken = await response.user.getIdToken();
      const userData = {
        user: {
          displayName:
            response.user.displayName === null
              ? response.user.email.substring(
                  0,
                  response.user.email.indexOf("@")
                )
              : response.user.displayName,
          role: type,
          email: response.user.email,
          createAt: new Date(),
        },
      };
      await db
        .collection(colName)
        .doc(response.user.uid)
        .set({
          ...userData,
        });
      const stt = await axios.post(
        "/api/customClaims",
        {
          role: type,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json", // Adjust content type as needed
          },
        }
      );
      await dispatch(fbSignUpSuccess());
      showSuccessNotification("Register Success", () => {
        callback();
      });
    } catch (err) {
      await dispatch(fbSignUpErr(err));
    }
  };
};

const fbAuthLoginWithGoogle = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase();
    const provider = new fb.auth.GoogleAuthProvider();
    try {
      await dispatch(fbLoginBegin());
      const result = await fb.auth().signInWithPopup(provider);
      await dispatch(fbLoginSuccess(result));
    } catch (err) {
      await dispatch(fbLoginErr(err));
    }
  };
};

const fbAuthLoginWithFacebook = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase();
    const provider = new fb.auth.FacebookAuthProvider();
    try {
      await dispatch(fbLoginBegin());
      const result = await fb.auth().signInWithPopup(provider);
      await dispatch(fbLoginSuccess(result));
    } catch (err) {
      await dispatch(fbLoginErr(err));
    }
  };
};

export {
  fbAuthLogin,
  fbAuthLogout,
  fbAuthSignUp,
  fbAuthLoginWithGoogle,
  fbAuthLoginWithFacebook,
  fbLoginCheck,
};

import actions from "./actions";
import { v4 as uuidv4 } from "uuid";
const {
  employerReadBegin,
  employerReadSuccess,
  employerReadErr,

  employerSingleBegin,
  employerSingleSuccess,
  employerSingleErr,

  employerUpdateBegin,
  employerUpdateSuccess,
  employerUpdateErr,

  employerUploadBegin,
  employerUploadSuccess,
  employerUploadErr,

  employerLocationBegin,
  employerLocationSuccess,
  employerLocationErr,

  employerLocationReadBegin,
  employerLocationReadSuccess,
  employerLocationReadErr,
} = actions;

const employerUploadFile = (imageAsString, path) => {
  return async (dispatch, getState, { getFirebase, getFirestore, storage }) => {
    const fb = getFirebase();
    const db = getFirestore();
    try {
      dispatch(employerUploadBegin());
      const uid = fb.auth().currentUser.uid;
      console.log(uid);
      const imageName = `${Date.now()}_${uuidv4()}`;
      const uploadTask = storage()
        .ref(`/company_profile/${uid}/${path}/${imageName}`)
        .putString(imageAsString, "data_url");
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
          dispatch(employerUploadErr(error));
          console.log(error);
        },
        async () => {
          // Upload completed successfully, now get the download URL
          try {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            if (path === "profileImage") {
              await db
                .collection("employers")
                .doc(uid)
                .set(
                  {
                    profile: { logoImage: downloadURL },
                  },
                  { merge: true }
                );
            } else {
              await db
                .collection("employers")
                .doc(uid)
                .set(
                  {
                    profile: { coverImage: downloadURL },
                  },
                  { merge: true }
                );
            }
            dispatch(employerUploadSuccess(downloadURL));
          } catch (error) {
            // Handle errors getting download URL
            dispatch(employerUploadErr(error));
          }
        }
      );
    } catch (err) {
      dispatch(employerUploadErr(err));
    }
  };
};

const employersProfileData = (uid) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(employerSingleBegin());
      const companyData = await db.collection("employers").doc(uid).get();
      if (companyData.exists) {
        // If the document exists and profile field is not empty
        dispatch(employerSingleSuccess(companyData.data())); // Example dispatch to handle the data
      } else {
        console.log("Company profile is empty or does not exist.");
        dispatch(employerSingleSuccess(null));
      }
    } catch (err) {
      console.log(err);
      dispatch(employerSingleErr(err));
    }
  };
};

const employersUpdateData = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const fb = getFirebase();
    const db = getFirestore();
    try {
      const uid = fb.auth().currentUser.uid;
      dispatch(employerUpdateBegin());
      await db
        .collection("employers")
        .doc(uid)
        .set(
          {
            profile: {
              ...data,
            },
          },
          { merge: true }
        );
      dispatch(employerUpdateSuccess());
    } catch (err) {
      dispatch(employerUpdateErr(err));
    }
  };
};
const employerLocationSubmit = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const fb = getFirebase();
    const db = getFirestore();
    try {
      const uid = fb.auth().currentUser.uid;
      dispatch(employerLocationBegin());
      await db
        .collection("employers")
        .doc(uid)
        .set(
          {
            location: {
              ...data,
            },
          },
          { merge: true }
        );
      dispatch(employerLocationSuccess());
    } catch (err) {
      dispatch(employerLocationErr(err));
    }
  };
};

export {
  employerUploadFile,
  employersUpdateData,
  employersProfileData,
  employerLocationSubmit,
};

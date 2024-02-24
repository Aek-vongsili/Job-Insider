import actions from "./actions";
const {
  candidateReadBegin,
  candidateReadSuccess,
  candidateReadErr,

  candidateSingleBegin,
  candidateSingleSuccess,
  candidateSingleErr,

  candidateUpdateBegin,
  candidateUpdateSuccess,
  candidateUpdateErr,

  candidateUploadBegin,
  candidateUploadSuccess,
  candidateUploadErr,

  candidateCvBegin,
  candidateCvSuccess,
  candidateCvErr,

  candidateResumeBegin,
  candidateResumeSuccess,
  candidateResumeErr,

  candidateResumeReadBegin,
  candidateResumeReadSuccess,
  candidateResumeReadErr,
} = actions;

const candidateProfileData = (uid) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(candidateSingleBegin());
      const candidateData = await db.collection("candidates").doc(uid).get();
      console.log(candidateData.data());
      if (candidateData.exists) {
        dispatch(candidateSingleSuccess(candidateData.data()));
      }
    } catch (err) {
      dispatch(candidateSingleErr(err));
    }
  };
};

const candidateUpdateData = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const fb = getFirebase();
    try {
      const uid = fb.auth().currentUser.uid;
      dispatch(candidateUpdateBegin());
      await db
        .collection("candidates")
        .doc(uid)
        .set(
          {
            profile: {
              ...data,
            },
          },
          { merge: true }
        );
      dispatch(candidateUpdateSuccess());
    } catch (err) {
      dispatch(candidateUpdateErr(err));
    }
  };
};
const candidateUploadFile = (imageAsString, uid) => {
  return async (dispatch, getState, { getFirebase, getFirestore, storage }) => {
    const db = getFirestore();
    try {
      dispatch(candidateUploadBegin());
      const imageName = `${Date.now()}_${uid}`;
      const uploadTask = storage()
        .ref(`/candidate_profile/${uid}/profile/${imageName}`)
        .putString(imageAsString, "data_url");
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
          dispatch(candidateUploadErr(error));
          console.log(error);
        },
        async () => {
          // Upload completed successfully, now get the download URL
          try {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            await db
              .collection("candidates")
              .doc(uid)
              .set(
                {
                  profile: { profileImage: downloadURL },
                },
                { merge: true }
              );

            dispatch(candidateUploadSuccess(downloadURL));
          } catch (error) {
            // Handle errors getting download URL
            dispatch(candidateUploadErr(error));
          }
        }
      );
    } catch (err) {
      dispatch(candidateUploadErr(err));
    }
  };
};
const candidateUploadCv = (file, uid) => {
  return async (dispatch, getState, { getFirebase, getFirestore, storage }) => {
    const db = getFirestore();
    try {
      dispatch(candidateCvBegin());
      const imageName = `${Date.now()}_${uid}`;
      const uploadTask = storage()
        .ref(`/candidate_profile/${uid}/cv/${imageName}`)
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
          dispatch(candidateCvErr(error));
          console.log(error);
        },
        async () => {
          // Upload completed successfully, now get the download URL
          try {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            await db
              .collection("candidates")
              .doc(uid)
              .set(
                {
                  resume: { cvUrl: downloadURL },
                },
                { merge: true }
              );

            dispatch(candidateCvSuccess(downloadURL));
          } catch (error) {
            // Handle errors getting download URL
            dispatch(candidateCvErr(error));
          }
        }
      );
    } catch (err) {
      dispatch(candidateCvErr(err));
    }
  };
};
const candidateResumeSubmit = (data, uid, type) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(candidateResumeBegin());
      let resumeData = {};

      // Check if type is 'education', then include it in the resume data
      if (type === "education") {
        resumeData = {
          resume: {
            education: data,
          },
        };
      } else if (type === "experiences") {
        resumeData = {
          resume: {
            experiences: data,
          },
        };
      } else {
        // Otherwise, include data directly under resume
        resumeData = {
          resume: {
            languages: data,
          },
        };
      }

      await db
        .collection("candidates")
        .doc(uid)
        .set(resumeData, { merge: true });

      dispatch(candidateResumeSuccess());
    } catch (err) {
      dispatch(candidateResumeErr(err));
    }
  };
};

// const candidateResumeRead = (uid) => {
//   return async (dispatch, getState, { getFirebase, getFirestore }) => {
//     const db = getFirestore();
//     try {
//       dispatch(candidateResumeReadBegin());
//       const resumeData = await db.collection("candidates").doc(uid).get();
//       if(resumeData.data)
//       dispatch(candidateResumeReadSuccess());
//     } catch (err) {
//       dispatch(candidateResumeReadErr(err));
//     }
//   };
// };
export {
  candidateUpdateData,
  candidateProfileData,
  candidateUploadFile,
  candidateUploadCv,
  candidateResumeSubmit,
};

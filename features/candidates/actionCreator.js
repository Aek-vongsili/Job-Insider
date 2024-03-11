import Swal from "sweetalert2";
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

  candidateJobAppliedReadBegin,
  candidateJobAppliedReadSuccess,
  candidateJobAppliedReadErr,

  candidateJobAppliedDeleteBegin,
  candidateJobAppliedDeleteSuccess,
  candidateJobAppliedDeleteErr,
} = actions;

const candidateProfileData = (uid) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(candidateSingleBegin());
      const candidateData = await db.collection("candidates").doc(uid).get();
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
const candidateGetJobApplied = (userid) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(candidateJobAppliedReadBegin());

      // Fetch jobs
      const jobsQuerySnapshot = await db.collection("jobs").get();
      const allApplications = [];

      // Fetch all applications for the user in parallel
      const applicationPromises = jobsQuerySnapshot.docs.map(async (jobDoc) => {
        const jobData = jobDoc.data();
        const jobApplicationsRef = jobDoc.ref.collection("applications");
        const applicationsSnapshot = await jobApplicationsRef
          .where("userId", "==", userid)
          .get();

        // Fetch company data
        const companyDataSnapshot = await db
          .collection("employers")
          .doc(jobData?.company)
          .get();

        // Process each application and add to allApplications array
        applicationsSnapshot.forEach((appDoc) => {
          const appData = appDoc.data();
          const companyData = companyDataSnapshot.data();

          allApplications.push({
            id: appDoc.id,
            jobId: jobDoc.id,
            ...appData,
            title: jobData?.jobTitle,
            company: companyData?.profile?.company_name,
            location: companyData?.location?.address,
            jobLogo: companyData?.profile?.logoImage,
          });
        });
      });

      // Wait for all application data to be fetched
      await Promise.all(applicationPromises);

      // Dispatch action with fetched data
      dispatch(candidateJobAppliedReadSuccess(allApplications));
    } catch (err) {
      // Dispatch action in case of error
      dispatch(candidateJobAppliedReadErr(err));
    }
  };
};

const candidateDeleteAppliedJob = (jobId, applicantId, userId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(candidateJobAppliedDeleteBegin());

      // Access the specific application document
      const applicationRef = db
        .collection("jobs")
        .doc(jobId)
        .collection("applications")
        .doc(applicantId);
      const applicationDoc = await applicationRef.get();

      // Check if the application document exists
      if (applicationDoc.exists) {
        // Check if the user ID associated with the application matches the provided user ID
        const applicationData = applicationDoc.data();
        if (applicationData.userId !== userId) {
          throw new Error("Unauthorized access"); // User is not authorized to delete the applicant ID
        }

        // Delete the applicant ID from the sub-collection
        await applicationRef.delete();
        Swal.fire("Deleted!", "Your application has been deleted.", "success");

        // Dispatch action indicating success
        dispatch(candidateJobAppliedDeleteSuccess());
      } else {
        // Dispatch action indicating application not found
        dispatch(candidateJobAppliedDeleteErr("Application not found"));
        Swal.fire("Error", "Application not found.", "error");
      }
    } catch (err) {
      dispatch(candidateJobAppliedDeleteErr(err));
      Swal.fire("Error", err.message, "error");
    }
  };
};

export {
  candidateUpdateData,
  candidateProfileData,
  candidateUploadFile,
  candidateUploadCv,
  candidateResumeSubmit,
  candidateGetJobApplied,
  candidateDeleteAppliedJob,
};

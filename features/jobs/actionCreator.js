import Swal from "sweetalert2";
import actions from "./actions";
import { toast } from "react-toastify";
const {
  jobSingleBegin,
  jobSingleSuccess,
  jobSingleErr,

  jobInsertBegin,
  jobInsertSuccess,
  jobInsertErr,

  jobReadBegin,
  jobReadSuccess,
  jobReadErr,

  favJobBegin,
  favJobSuccess,
  favJobErr,

  favJobGetBegin,
  favJobGetSuccess,
  favJobGetErr,

  removeFavJobBegin,
  removeFavJobSuccess,
  removeFavJobErr,

  jobApplyBegin,
  jobApplySuccess,
  jobApplyErr,

  jobApplicationCheckBegin,
  jobApplicationCheckSuccess,
  jobApplicationCheckErr,
} = actions;

const jobInsertData = (jobData) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const fb = getFirebase();
    const db = getFirestore();
    try {
      dispatch(jobInsertBegin());
      const uid = fb.auth().currentUser.uid;
      const userDoc = await db.collection("employers").doc(uid).get();
      if (!userDoc.exists) {
        // If the user is not found in the employers collection, show an error message and exit
        Swal.fire({
          title: "Error",
          text: "Only employers can insert jobs.",
          icon: "error",
          confirmButtonText: "Got it",
          timer: 3000, // Timer in milliseconds (3 seconds in this case)
          timerProgressBar: true, // Show a progress bar
        });
        dispatch(jobInsertErr("Only employer can insert job"));
        return;
        // Exit the function
      }
      const { deadlineDate, ...data } = jobData;
      await db.collection("jobs").add({
        ...data,
        company: uid,
        deadlineDate: new Date(deadlineDate),
        createdAt: new Date(),
        status: "active",
      });
      dispatch(jobInsertSuccess());
    } catch (err) {
      dispatch(jobInsertErr(err));
    }
  };
};
const jobReadData = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(jobReadBegin());
      const jobsData = [];
      const querySnapshot = await db.collection("jobs").get();
      // Iterate over each job document
      for (const doc of querySnapshot.docs) {
        const jobData = doc.data();

        // Fetch corresponding company document using companyId stored in the job document
        const companyDoc = await db
          .collection("employers")
          .doc(jobData?.company)
          .get();
        const companyData = companyDoc.exists ? companyDoc.data() : null;

        // Combine jobData with companyData, if available
        const combinedData = {
          id: doc.id,
          ...jobData,
          ...companyData,
        };
        // Push combined data to jobsData array
        jobsData.push(combinedData);
      }
      dispatch(jobReadSuccess(jobsData));
    } catch (err) {
      dispatch(jobReadErr(err));
    }
  };
};
const jobSingleData = (jobUid) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(jobSingleBegin());
      const jobData = await db.collection("jobs").doc(jobUid).get();
      if (jobData.exists) {
        dispatch(jobSingleSuccess(jobData.data()));
      }
    } catch (err) {
      console.log(err);
      dispatch(jobSingleErr(err));
    }
  };
};

const favouriteJobAdd = (userUid, jobId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const fb = getFirebase();
    try {
      dispatch(favJobBegin());
      const candidateDoc = await db.collection("candidates").doc(userUid).get();
      if (!candidateDoc.exists) {
        // If the user doesn't exist in the candidate collection or the role is not "candidate", show an error message and exit
        Swal.fire({
          title: "Error",
          text: "Only candidates can save jobs.",
          icon: "error",
          confirmButtonText: "Got it",
          timer: 3000, // Timer in milliseconds (3 seconds in this case)
          timerProgressBar: true, // Show a progress bar
        });
        dispatch(
          favJobErr("User not found in candidate collection or not a candidate")
        );
        return; // Exit the function
      }
      await db
        .collection("candidates")
        .doc(userUid)
        .set(
          {
            favouriteJobs: db.FieldValue.arrayUnion({
              jobId: jobId,
              createdAt: new Date(),
            }),
          },
          { merge: true }
        );

      dispatch(favJobSuccess());
      toast.success("Added to favorites");
    } catch (err) {
      dispatch(favJobErr(err));
    }
  };
};

const removeFavouriteJob = (userUid, jobId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(removeFavJobBegin());

      const userDocRef = db.collection("candidates").doc(userUid);

      // Get the current document data
      const userDoc = await userDocRef.get();
      if (!userDoc.exists) {
        throw new Error("Document does not exist");
      }

      // Remove the item from the array
      const updatedFavouriteJobs = userDoc
        .data()
        .favouriteJobs.filter((job) => job.jobId !== jobId);

      // Update the document with the modified array
      await userDocRef.update({
        favouriteJobs: updatedFavouriteJobs,
      });

      dispatch(removeFavJobSuccess());
      toast.error("Removed from favorites");
    } catch (err) {
      console.log(err);
      dispatch(removeFavJobErr(err));
    }
  };
};

const getFavouriteJob = (uid) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(favJobGetBegin());
      // Retrieve candidate data from Firestore
      const candidateData = await db.collection("candidates").doc(uid).get();

      // Check if the candidate data exists and contains favorite jobs
      if (candidateData.exists && candidateData.data()?.favouriteJobs) {
        const favouriteJobs = candidateData.data().favouriteJobs;
        const favJobData = [];

        // Use Promise.all() to await all asynchronous operations
        await Promise.all(
          favouriteJobs.map(async ({ jobId, createdAt }) => {
            const jobDoc = await db.collection("jobs").doc(jobId).get();
            if (jobDoc.exists) {
              const { company, jobTitle, deadlineDate } = jobDoc.data();
              const employer = await db
                .collection("employers")
                .doc(company)
                .get();
              const { profile, location } = employer.data();
              const { company_name, logoImage } = profile;
              favJobData.push({
                ...location,
                company,
                logoImage,
                company_name,
                jobTitle,
                deadlineDate,
                jobId: jobDoc.id,
                createdAt,
              }); // Push the job data into favJobData array
            }
          })
        );
        dispatch(favJobGetSuccess(favJobData));
      } else {
        dispatch(favJobGetSuccess([]));
      }
    } catch (err) {
      // Handle errors
      console.log(err);
      dispatch(favJobGetErr(err));
    }
  };
};

const jobApplyApplication = (userUid, jobId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(jobApplyBegin());
      const resume = await getUserResume(userUid, db);
      if (resume && resume?.cvUrl) {
        const userApplied = await dispatch(checkIfUserApplied(userUid, jobId));
        console.log(userApplied);
        if (!userApplied) {
          await applyJobToFirestore(userUid, jobId, db);
        } else {
          throw new Error("User has already applied for this job");
        }
      }
      dispatch(jobApplySuccess());
    } catch (err) {
      console.log(err);
      dispatch(jobApplyErr(err));
    }
  };
};

const getUserResume = async (userUid, db) => {
  try {
    const cvDoc = await db.collection("candidates").doc(userUid).get();
    if (cvDoc.exists) {
      const userData = cvDoc.data();
      if (userData.resume) {
        return userData.resume; // Return the resume if it exists and is truthy
      } else {
        return null; // Return null if the resume field is falsy or doesn't exist
      }
    } else {
      return null; // User document not found
    }
  } catch (err) {
    throw new Error("Error fetching user's resume: " + err.message);
  }
};

const applyJobToFirestore = async (userId, jobId, db) => {
  try {
    const jobRef = db.collection("jobs").doc(jobId);
    const jobSnapshot = await jobRef.get();

    if (!jobSnapshot.exists) {
      throw new Error("Job not found");
    }

    // Add the job application to a subcollection of the job document
    await jobRef.collection("applications").add({
      userId: userId,
      appliedAt: new Date(),
    });
  } catch (err) {
    throw new Error("Error applying for the job: " + err.message);
  }
};
const checkIfUserApplied = (userId, jobId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      dispatch(jobApplicationCheckBegin());
      const jobRef = db.collection("jobs").doc(jobId);
      const applicationQuery = await jobRef
        .collection("applications")
        .where("userId", "==", userId)
        .get();

      let userApplied = false;
      applicationQuery.forEach((doc) => {
        // Access data of each document
        const data = doc.data();
        console.log(data); // Log data of each document
        userApplied = true; // Assuming if any document exists, user has applied
      });

      dispatch(jobApplicationCheckSuccess(userApplied)); // Dispatching the success action with the result
      return userApplied;
    } catch (err) {
      dispatch(jobApplicationCheckErr(err));
      console.log(err);
      // throw new Error("Error checking if user applied for job: " + err.message);
    }
  };
};
export {
  jobInsertData,
  jobReadData,
  jobSingleData,
  favouriteJobAdd,
  getFavouriteJob,
  removeFavouriteJob,
  jobApplyApplication,
  checkIfUserApplied,
};

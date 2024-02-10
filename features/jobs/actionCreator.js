import { ca } from "date-fns/locale";
import actions from "./actions";

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
} = actions;

const jobInsertData = (jobData) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const fb = getFirebase();
    const db = getFirestore();
    try {
      const uid = fb.auth().currentUser.uid;
      dispatch(jobInsertBegin());
      await db.collection("jobs").add({ ...jobData, company: uid });
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
        console.log(combinedData);
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
      console.log(jobData);
    } catch (err) {
      console.log(err);
      dispatch(jobSingleErr(err));
    }
  };
};
export { jobInsertData, jobReadData, jobSingleData };

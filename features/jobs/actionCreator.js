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

export { jobInsertData };

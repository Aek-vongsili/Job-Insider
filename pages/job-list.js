import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import JobListV5 from "../components/job-listing-pages/job-list-v5";
import Layout from "../components/Layout";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/clientApp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ListJob } from "../features/job/jobSlice";
const index = ({ jobData }) => {
  console.log(JSON.parse(jobData));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ListJob(JSON.parse(jobData)));
  }, []);
  return (
    <>
      <Seo pageTitle="Find Jobs" />
      <Layout>
        <JobListV5 />
      </Layout>
    </>
  );
};

export async function getServerSideProps({ req }) {
  const querySnapshot = await getDocs(collection(db, "job_features"));
  let jobList = [];
  try {
    await Promise.all(
      querySnapshot.docs.map(async (docData) => {
        const docRef = doc(db, "employers", docData.data().company);

        const companyInfo = await getDoc(docRef);
        if (companyInfo.exists()) {
          const { profile, ...user } = companyInfo.data();
          const job = { id: docData.id, ...docData.data(), ...profile };
          jobList.push(job);
          // console.log("Document data:", companyInfo.data());
        } else {
          console.log("No such document!");
        }
      })
    );
  } catch (err) {
    throw err;
  }
  

  const jobData = JSON.stringify(jobList);
  // console.log(jobData);
  return {
    props: {
      jobData: jobData,
    },
  };
}
export default dynamic(() => Promise.resolve(index), { ssr: false });

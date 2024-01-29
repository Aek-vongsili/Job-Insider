import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import EmployersList from "../components/employers-listing-pages/employers-list";
import Layout from "../components/Layout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/clientApp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { employersList } from "../features/employer/employerSlice";

const index = ({ employerList }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(employersList(JSON.parse(employerList)));
  }, [employerList]);
  return (
    <>
      <Seo pageTitle="Employers List" />
      <Layout>
        <EmployersList />
      </Layout>
    </>
  );
};
export async function getServerSideProps({ req }) {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "employers"), where("profile", "!=", null))
    );
    const employerList = [];

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const q = query(
          collection(db, "job_features"),
          where("company", "==", doc.id)
        );
        const jobQuerySnapshot = await getDocs(q);
        const jobCount = jobQuerySnapshot.size;

        const employerData = {
          emp_id: doc.id,
          openJobs: jobCount,
          ...doc.data().profile,
        };

        employerList.push(employerData);
      })
    );

    const employerJson = JSON.stringify(employerList);
    // console.log(employerList)
    return {
      props: {
        employerList: employerJson,
      },
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      props: {
        employerList: "[]", // Return an empty array in case of an error
      },
    };
  }
}
export default dynamic(() => Promise.resolve(index), { ssr: false });

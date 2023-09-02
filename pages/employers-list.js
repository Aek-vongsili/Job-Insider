import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import EmployersList from "../components/employers-listing-pages/employers-list";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
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
  const querySnapshot = await getDocs(collection(db, "employers"));
  let employerList = [];
  try {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().profile);
      employerList.push(doc.data().profile);
    });
  } catch (err) {
    throw err;
  }
  const employerJson = JSON.stringify(employerList);
  return {
    props: {
      employerList: employerJson,
    },
  };
}
export default dynamic(() => Promise.resolve(index), { ssr: false });

import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import AllApplicants from "../../../components/dashboard-pages/employers-dashboard/all-applicants";
import Layout from "../../../components/Layout";
import withAuth from "../../utils/withAuth";

const index = () => {
  return (
    <>
      <Seo pageTitle="All Applicants" />
      <Layout authPage={true}>
        <AllApplicants />
      </Layout>
      
    </>
  );
};

export default (dynamic(() => Promise.resolve(index), { ssr: false }));

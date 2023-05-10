import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ShortlistedResumes from "../../../components/dashboard-pages/employers-dashboard/shortlisted-resumes";
import Layout from "../../../components/Layout";
import withAuth from "../../utils/withAuth";

const index = () => {
  return (
    <>
      <Seo pageTitle="Shortlisted Resumes" />
      <Layout authPage={true}>

        <ShortlistedResumes />
      </Layout>
    </>
  );
};

export default (dynamic(() => Promise.resolve(index), { ssr: false }));

import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import JobListV5 from "../components/job-listing-pages/job-list-v5";
import Layout from "../components/Layout";

const index = () => {
  return (
    <>
      <Seo pageTitle="Find Jobs" />
      <Layout>
        <JobListV5 />
      </Layout>
      
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import AppliedJobs from "../../../components/dashboard-pages/candidates-dashboard/applied-jobs";
import Layout from "../../../components/Layout";

const index = () => {
  return (
    <>
      <Seo pageTitle="Applied Jobs" />
      <Layout authPage={true}>
        <AppliedJobs />
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

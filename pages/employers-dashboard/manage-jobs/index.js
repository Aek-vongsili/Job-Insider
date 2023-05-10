import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ManageJobs from "../../../components/dashboard-pages/employers-dashboard/manage-jobs";
import Layout from "../../../components/Layout";
import withAuth from "../../utils/withAuth";

const index = () => {
  return (
    <>
      <Seo pageTitle="Manage Jobs" />
      <Layout authPage={true}>
        <ManageJobs />
      </Layout>
    </>
  );
};

export default (dynamic(() => Promise.resolve(index), { ssr: false }));

import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import PostJob from "../../../components/dashboard-pages/employers-dashboard/post-jobs";
import InsertJob from "../../../components/dashboard-pages/employers-dashboard/insert-job";
import Layout from "../../../components/Layout";
import withAuth from "../../utils/withAuth";

const index = () => {
  return (
    <>
        <Seo pageTitle="Insert Jobs" />
        <Layout authPage={true}>
          <InsertJob/>
        </Layout>
    </>
  );
};

export default (dynamic(() => Promise.resolve(index), { ssr: false }));

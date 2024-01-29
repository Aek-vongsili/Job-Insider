import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ShortListedJobs from "../../../components/dashboard-pages/candidates-dashboard/short-listed-jobs";
import Layout from "../../../components/Layout";
import { withAuth } from "../../../utils/withAuth";

const index = () => {
  return (
    <>
      <Seo pageTitle="Short ListedJobs" />
      <Layout authPage={true}>
        <ShortListedJobs />
      </Layout>
    </>
  );
};
export const getServerSideProps = withAuth(async (ctx) => {
  return {
    props: {},
  };
});
export default dynamic(() => Promise.resolve(index), { ssr: false });

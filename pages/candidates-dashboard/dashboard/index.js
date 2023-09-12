import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import DashboadHome from "../../../components/dashboard-pages/candidates-dashboard/dashboard";
import { withAuth } from "../../../utils/withAuth";
import Layout from "../../../components/Layout";

const index = () => {
  return (
    <>
      <Seo pageTitle="Candidates Dashboard" />
      <Layout authPage={true}>
        <DashboadHome />
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

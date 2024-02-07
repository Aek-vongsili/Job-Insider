import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import CompanyProfile from "../../../components/dashboard-pages/employers-dashboard/company-profile";
import Layout from "../../../components/Layout";
import { withAuth } from "../../../utils/withAuth";
const index = () => {
  return (
    <>
      <Seo pageTitle="Company Profile" />
      <Layout authPage={true}>
        <CompanyProfile />
      </Layout>
    </>
  );
};
export const getServerSideProps = withAuth(async ({ req }) => {
  return {
    props: {},
  };
});
export default dynamic(() => Promise.resolve(index), { ssr: false });

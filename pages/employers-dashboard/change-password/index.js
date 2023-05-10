import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ChangePassword from "../../../components/dashboard-pages/employers-dashboard/change-password";
import Layout from "../../../components/Layout";
import withAuth from "../../utils/withAuth";

const index = () => {
  return (
    <>
      <Seo pageTitle="Change Password" />
      <Layout authPage={true}>
        <ChangePassword />
      </Layout>
      
    </>
  );
};

export default (dynamic(() => Promise.resolve(index), { ssr: false }));

import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import MyProfile from "../../../components/dashboard-pages/candidates-dashboard/my-profile";
import Layout from "../../../components/Layout";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Profile" />
      <Layout authPage={true}>
        <MyProfile />
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

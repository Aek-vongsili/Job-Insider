import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import MyResume from "../../../components/dashboard-pages/candidates-dashboard/my-resume";
import Layout from "../../../components/Layout";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Resume" />
      <Layout authPage>
        <MyResume />
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

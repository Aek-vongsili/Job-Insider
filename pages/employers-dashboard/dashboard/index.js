import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import DashboadHome from "../../../components/dashboard-pages/employers-dashboard/dashboard";
import Layout from "../../../components/Layout";
import withAuth from "../../utils/withAuth";

const index = () => {
  return (
    <>
      <Seo pageTitle="Employeers Dashboard" />
      <Layout authPage={true}>
        <DashboadHome />
      </Layout>
      
    </>
  );
};

export default (dynamic(() => Promise.resolve(index), { ssr: false }));

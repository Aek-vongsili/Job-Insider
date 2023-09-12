import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import DashboadHome from "../../../components/dashboard-pages/employers-dashboard/dashboard";
import Layout from "../../../components/Layout";
import { verifyFirebaseJwt } from "../../../services/jwt_verify";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { withAuth } from "../../../utils/withAuth";
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

export const getServerSideProps = withAuth(async (ctx) => {
  return {
    props: {},
  };
});
export default dynamic(() => Promise.resolve(index), { ssr: false });

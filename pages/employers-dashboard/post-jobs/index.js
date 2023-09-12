import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import PostJob from "../../../components/dashboard-pages/employers-dashboard/post-jobs";
import Layout from "../../../components/Layout";
import { verifyFirebaseJwt } from "../../../services/jwt_verify";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { withAuth } from "../../../utils/withAuth";
const index = () => {
  return (
    <>
      <Seo pageTitle="Post Jobs" />
      <Layout authPage={true}>
        <PostJob />
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

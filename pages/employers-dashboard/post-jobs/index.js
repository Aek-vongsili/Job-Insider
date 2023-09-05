import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import PostJob from "../../../components/dashboard-pages/employers-dashboard/post-jobs";
import Layout from "../../../components/Layout";
import { verifyFirebaseJwt } from "../../../services/jwt_verify";
import { getAuth } from "firebase/auth";
import axios from "axios";
const index = () => {
  return (
    <>
      <Seo pageTitle="Post Jobs" />
      <Layout authPage={true}></Layout>
      <PostJob />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

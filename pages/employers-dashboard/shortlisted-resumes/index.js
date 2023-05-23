import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ShortlistedResumes from "../../../components/dashboard-pages/employers-dashboard/shortlisted-resumes";
import Layout from "../../../components/Layout";
import { verifyFirebaseJwt } from "../../../services/jwt_verify";

const index = () => {
  return (
    <>
      <Seo pageTitle="Shortlisted Resumes" />
      <Layout authPage={true}>
        <ShortlistedResumes />
      </Layout>
    </>
  );
};
export async function getServerSideProps({ req }) {
  const { token } = req.cookies || null;
  if (token) {
    try {
      const rs = await verifyFirebaseJwt(token);
      console.log(rs);
      if (!rs) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default dynamic(() => Promise.resolve(index), { ssr: false });

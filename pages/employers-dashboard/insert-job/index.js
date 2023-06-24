import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import InsertJob from "../../../components/dashboard-pages/employers-dashboard/insert-job";
import Layout from "../../../components/Layout";
import { verifyFirebaseJwt } from "../../../services/jwt_verify";
import { getAuth } from "firebase/auth";
const index = () => {
  return (
    <>
        <Seo pageTitle="Insert Jobs" />
        <Layout authPage={true}>
          <InsertJob/>
        </Layout>
    </>
  );
};
export async function getServerSideProps({ req }) {
  const { token } = req.cookies || null;
  const auth = getAuth()
  if (token) {
    try {
      const rs = await verifyFirebaseJwt(token);
      const currentTime = new Date().getTime() / 1000;
      const expireOrnot = rs.exp < currentTime
      if (!rs || expireOrnot) {
        auth.signOut().then((rs)=>{
          console.log("you are not have Token or your Token is expired");
        }).catch(err=>{
          console.log(err.message);
        })
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

export default (dynamic(() => Promise.resolve(index), { ssr: false }));

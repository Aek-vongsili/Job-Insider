import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import CompanyProfile from "../../../components/dashboard-pages/employers-dashboard/company-profile";
import Layout from "../../../components/Layout";
import { verifyFirebaseJwt } from "../../../services/jwt_verify";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanyData } from "../../../features/employer/employerProfile";
const index = ({ dataDoc }) => {
  const dispatch = useDispatch();
  // console.log(dataDoc);
  useEffect(() => {
    if (dataDoc) {
      dispatch(setCompanyData(dataDoc));
    }
  }, [dataDoc]);
  return (
    <>
      <Seo pageTitle="Company Profile" />
      <Layout authPage={true}>
        <CompanyProfile />
      </Layout>
    </>
  );
};
export async function getServerSideProps({ req }) {
  const { token } = req.cookies || null;
  const auth = getAuth();
  let dataDoc = {};
  if (token) {
    try {
      const rs = await verifyFirebaseJwt(token);
      const collectionRef = doc(db, "users", rs.user_id);
      const docSnap = await getDoc(collectionRef);
      if (docSnap.exists()) {
        dataDoc = { ...docSnap.data().profile };
      }
      const currentTime = new Date().getTime() / 1000;
      const expireOrnot = rs.exp < currentTime;
      if (!rs || expireOrnot) {
        await axios.get("/api/logout");
        auth
          .signOut()
          .then((rs) => {
            console.log("you are not have Token or your Token is expired");
          })
          .catch((err) => {
            console.log(err.message);
          });
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
    props: {
      dataDoc: dataDoc,
    },
  };
}
export default dynamic(() => Promise.resolve(index), { ssr: false });

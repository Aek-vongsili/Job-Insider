import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import Home16 from "../components/home-16";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { setLogout, setRole } from "../features/user/userSlice";
import firebaseAdmin from "../firebaseAdmin";
import { useDispatch } from "react-redux";
import { serialize } from "cookie";
import axios from "axios";
const index = ({ role }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRole(role));
  }, [role]);

  return (
    <>
      <Seo pageTitle="Home" />
      <Layout>
        <Home16 />
      </Layout>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const { cookies } = req;
  const token = cookies.token || null;
  console.log(token);
  let role = "";
  try {
    if (token) {
      const claims = await firebaseAdmin.auth().verifyIdToken(token);
      console.log(claims.role);
      role = claims.role;
    }
  } catch (err) {
    // throw new Error(err);
    if (err.code === "auth/id-token-expired") {
      console.error("Token has expired. Please re-authenticate.");
      // await axios.get("/api/logout");
      const logoutCookie = serialize("token", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });

      res.setHeader("Set-Cookie", logoutCookie);
      return {
        redirect: {
          destination: "/", // Redirect to login page or handle as appropriate
          permanent: false,
        },
      };
    } else {
      console.error("Error verifying token:", err);
    }
  }
  return {
    props: {
      role: role || "",
    },
  };
}

export default dynamic(() => Promise.resolve(index), { ssr: false });

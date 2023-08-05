import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import Home16 from "../components/home-16";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/clientApp";

import { setLogout } from "../features/user/userSlice";
const index = () => {
 
  // useEffect(() => {
  //   const checkToken = async() => {
  //     if (token === null) {
  //       await signOut(auth)
  //       // dispatch(setLogout());
  //     }
  //   };

  //   checkToken();
  // }, [token]);

  return (
    <>
      <Seo pageTitle="Home" />
      <Layout>
        <Home16 />
      </Layout>
    </>
  );
};


// export async function getServerSideProps({ req }) {
//   const { cookies } = req;
//   const token = cookies.token || null;
//   if(token === null){
//     await signOut(auth);
//   }
//   return {
//     props: { token },
//   };
// }

export default dynamic(() => Promise.resolve(index), { ssr: false });

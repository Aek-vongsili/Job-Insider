import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import ForgotPassword from "../components/pages-menu/login/ForgotPassword";


const index = () => {
  return (
    <>
      <Seo pageTitle="Forgot password" />
      <ForgotPassword />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

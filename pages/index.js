import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import Home16 from "../components/home-16";
import Layout from "../components/Layout";

// Dynamic import for AdPopup to ensure it only runs on client side
const AdPopup = dynamic(() => import("../components/common/AdPopup"), {
  ssr: false // Disable server-side rendering for this component
});
const index = () => {
  return (
    <>
      <Seo pageTitle="Home" />
      <Layout>
        <Home16 />
      </Layout>
      <AdPopup />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

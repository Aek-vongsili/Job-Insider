import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import Pricing from "../components/pages-menu/pricing";
import Layout from "../components/Layout";

const index = () => {
  return (
    <>
      <Seo pageTitle="Pricing" />
      <Layout>
        <Pricing />
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

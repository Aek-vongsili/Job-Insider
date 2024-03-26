import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import Consultant from "../components/pages-menu/consultant_work";
import Layout from "../components/Layout";

const index = () => {
  return (
    <>
      <Seo pageTitle="Consultant" />
      <Layout>
        <Consultant/>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
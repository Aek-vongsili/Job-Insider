import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import Terms from "../components/pages-menu/terms";
import Layout from "../components/Layout";

const index = () => {
  return (
    <>
      <Seo pageTitle="Terms" />
      <Layout>
        <Terms />
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

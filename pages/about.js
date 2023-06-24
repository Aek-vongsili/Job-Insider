import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import About from "../components/pages-menu/about";
import Layout from "../components/Layout";
const index = () => {
  return (
    <>
      <Seo pageTitle="About" />
      <Layout>
        <About />
      </Layout>
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });

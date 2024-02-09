import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import Packages from "../../../components/dashboard-pages/employers-dashboard/packages";
import Layout from "../../../components/Layout";
const index = () => {
  return (
    <>
      <Seo pageTitle="Packages" />
      <Layout authPage={true}>

        <Packages />
      </Layout>
    </>
  );
};

export default (dynamic(() => Promise.resolve(index), { ssr: false }));

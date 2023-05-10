import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import EmployersListV3 from "../components/employers-listing-pages/employers-list-v3";
import Layout from "../components/Layout";

const index = () => {
  return (
    <>
      <Seo pageTitle="Employers List" />
      <Layout>
        <EmployersListV3 />
      </Layout>
     
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import EmployersList from "../components/employers-listing-pages/employers-list";
import Layout from "../components/Layout";

const index = () => {
  return (
    <>
      <Seo pageTitle="Employers List" />
      <Layout>
        <EmployersList />
      </Layout>
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });

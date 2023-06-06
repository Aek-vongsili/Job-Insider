import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import CandidatesList from "../components/candidates-listing-pages/candidate-list";
import Layout from "../components/Layout";

const index = () => {
  return (
    <>
      <Layout >
        <Seo pageTitle="Candidates List V3" />
        <CandidatesList />
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

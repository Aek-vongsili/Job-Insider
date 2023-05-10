import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import Messages from "../../../components/dashboard-pages/employers-dashboard/messages";
import Layout from "../../../components/Layout";
import withAuth from "../../utils/withAuth";

const index = () => {
  return (
    <>
      <Seo pageTitle="Messages" />
      <Layout authPage={true}>
        <Messages />

      </Layout>
    </>
  );
};

export default (dynamic(() => Promise.resolve(index), { ssr: false }));

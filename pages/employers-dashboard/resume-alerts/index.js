import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ResumeAlerts from "../../../components/dashboard-pages/employers-dashboard/resume-alerts";
import Layout from "../../../components/Layout";
import withAuth from "../../utils/withAuth";

const index = () => {
  return (
    <>
      <Seo pageTitle="Resume Alerts" />
      <Layout authPage={true}>

        <ResumeAlerts />
      </Layout>
    </>
  );
};

export default (dynamic(() => Promise.resolve(index), { ssr: false }));

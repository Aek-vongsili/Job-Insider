import dynamic from "next/dynamic";
import employersInfo from "../../data/topCompany";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/common/Seo";
import JobDetailsDescriptions from "../../components/employer-single-pages/shared-components/JobDetailsDescriptions";
import RelatedJobs from "../../components/employer-single-pages/related-jobs/RelatedJobs";
import MapJobFinder from "../../components/job-listing-pages/components/MapJobFinder";
import Social from "../../components/employer-single-pages/social/Social";
import PrivateMessageBox from "../../components/employer-single-pages/shared-components/PrivateMessageBox";
import Layout from "../../components/Layout";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/clientApp";

const EmployersSingleV1 = ({ employerData , openJobs}) => {
  const router = useRouter();
  const [employer, setEmployersInfo] = useState({});
  const id = router.query.id;
  console.log(employerData);
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const dateObj = new Date(employerData?.company_info?.company_est)
  const companyEst =formatDate(dateObj)
  // useEffect(() => {
  //   if (!id) <h1>Loading...</h1>;
  //   else setEmployersInfo(employersInfo.find((item) => item.id == id));

  //   return () => {};
  // }, [id]);

  return (
    <>
      <Layout>
        <Seo pageTitle="Employers Single Dyanmic V1" />

        {/* <!-- Header Span --> */}
        <span className="header-span"></span>

        <LoginPopup />
        {/* End Login Popup Modal */}

        {/* <DefaulHeader /> */}
        {/* <!--End Main Header --> */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <!-- Job Detail Section --> */}
        <section className="job-detail-section">
          {/* <!-- Upper Box --> */}
          <div className="upper-box">
            <div className="auto-container">
              <div className="job-block-seven">
                <div className="inner-box">
                  <div className="content">
                    <span className="company-logo">
                      <img
                        src={employerData?.company_info?.logoImage}
                        alt="logo"
                      />
                    </span>
                    <h4>{employerData?.company_info?.company_name}</h4>

                    <ul className="job-info">
                      <li>
                        <span className="icon flaticon-map-locator"></span>
                        {employerData?.location?.address}
                      </li>
                      {/* compnay info */}
                      <li>
                        <span className="icon flaticon-briefcase"></span>
                        {employerData?.company_info?.company_cat?.join(" / ")}
                      </li>
                      {/* location info */}
                      <li>
                        <span className="icon flaticon-telephone-1"></span>
                        {employerData?.company_info?.company_phone}
                      </li>
                      {/* time info */}
                      <li>
                        <span className="icon flaticon-mail"></span>
                        {employerData?.company_info?.company_email}
                      </li>
                      {/* salary info */}
                    </ul>
                    {/* End .job-info */}

                    <ul className="job-other-info">
                      <li className="time">Open Jobs – {openJobs}</li>
                    </ul>
                    {/* End .job-other-info */}
                  </div>
                  {/* End .content */}

                  <div className="btn-box">
                    <button
                      className="theme-btn btn-style-one"
                      data-bs-toggle="modal"
                      data-bs-target="#privateMessage"
                    >
                      Private Message
                    </button>
                    <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>
                  {/* End btn-box */}

                  {/* <!-- Modal --> */}
                  <div
                    className="modal fade"
                    id="privateMessage"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="apply-modal-content modal-content">
                        <div className="text-center">
                          <h3 className="title">
                            Send message to{" "}
                            {employerData?.company_info?.company_name}
                          </h3>
                          <button
                            type="button"
                            className="closed-modal"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        {/* End modal-header */}

                        <PrivateMessageBox />
                        {/* End PrivateMessageBox */}
                      </div>
                      {/* End .send-private-message-wrapper */}
                    </div>
                  </div>
                  {/* End .modal */}
                </div>
              </div>
              {/* <!-- Job Block --> */}
            </div>
          </div>
          {/* <!-- Upper Box --> */}

          {/* <!-- job-detail-outer--> */}
          <div className="job-detail-outer">
            <div className="auto-container">
              <div className="row">
                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                  {/*  job-detail */}
                  <JobDetailsDescriptions
                    employerDescription={
                      employerData?.company_info?.company_about
                    }
                  />
                  {/* End job-detail */}

                  {/* <!-- Related Jobs --> */}
                  <div className="related-jobs">
                    <div className="title-box">
                      <h3>3 Others jobs available</h3>
                      <div className="text">
                        2020 jobs live - 293 added today.
                      </div>
                    </div>
                    {/* End .title-box */}

                    <RelatedJobs />
                    {/* End RelatedJobs */}
                  </div>
                  {/* <!-- Related Jobs --> */}
                </div>
                {/* End .content-column */}

                <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                  <aside className="sidebar">
                    <div className="sidebar-widget company-widget">
                      <div className="widget-content">
                        {/*  compnay-info */}
                        <ul className="company-info mt-0">
                          <li>
                            Primary industry: <span>Software</span>
                          </li>
                          <li>
                            Company size: <span>501-1,000</span>
                          </li>
                          <li>
                            Founded in: <span>{companyEst}</span>
                          </li>
                          <li>
                            Phone:{" "}
                            <span>
                              {employerData?.company_info?.company_phone}
                            </span>
                          </li>
                          <li>
                            Email:{" "}
                            <span>
                              {employerData?.company_info?.company_email}
                            </span>
                          </li>
                          <li>
                            Location:{" "}
                            <span>{employerData?.location?.address}</span>
                          </li>
                          <li>
                            Social media:
                            <Social />
                          </li>
                        </ul>
                        {/* End compnay-info */}

                        <div className="btn-box">
                          <a
                            href={`https://${employerData?.company_info?.company_website}`}
                            className="theme-btn btn-style-three"
                            style={{ textTransform: "lowercase" }}
                            target="_blank"
                          >
                            {employerData?.company_info?.company_website}
                          </a>
                        </div>
                        {/* btn-box */}
                      </div>
                    </div>
                    {/* End company-widget */}

                    <div className="sidebar-widget">
                      {/* <!-- Map Widget --> */}
                      <h4 className="widget-title">Job Location</h4>
                      <div className="widget-content">
                        <div style={{ height: "300px", width: "100%" }}>
                          <MapJobFinder location={employerData?.location} />
                        </div>
                      </div>
                      {/* <!--  Map Widget --> */}
                    </div>
                    {/* End sidebar-widget */}
                  </aside>
                  {/* End .sidebar */}
                </div>
                {/* End .sidebar-column */}
              </div>
            </div>
          </div>
          {/* <!-- job-detail-outer--> */}
        </section>
        {/* <!-- End Job Detail Section --> */}
      </Layout>

      {/* <FooterDefault footerStyle="alternate5" /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};
export async function getServerSideProps(context) {
  const { params } = context;
  console.log(params.id);
  let employerData;
  let openJobs;
  try {
    const docRef = doc(db, "employers", `${params.id}`);
    const docSnap = await getDoc(docRef);

    // console.log(docSnap.data().profile)
    if (docSnap.exists()) {
      const q = query(
        collection(db, "job_features"),
        where("company", "==", params.id)
      );
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.size);
      openJobs = querySnapshot.size;
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
      employerData = docSnap.data().profile;
    } else {
      return {
        notFound: true,
      };
    }
  } catch (err) {
    throw err;
  }

  return {
    props: {
      employerData: employerData,
      openJobs: openJobs,
    },
  };
}
export default dynamic(() => Promise.resolve(EmployersSingleV1), {
  ssr: false,
});

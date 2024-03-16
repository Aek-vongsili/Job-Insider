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
import { wrapper } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { employerJobListRead } from "../../features/employer/actionCreator";

const EmployersSingleV1 = ({ employerData, openJobs }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      dispatch(employerJobListRead(id));
    }
  }, [id, dispatch]);
  const jobsData = useSelector((state) => {
    return state.employerSingle.jobData;
  });
  console.log(jobsData);
  const loading = useSelector((state) => {
    return state.employerSingle.jobLoading;
  });
  // useEffect(() => {
  //   if (!id) <h1>Loading...</h1>;
  //   else setEmployersInfo(employersInfo.find((item) => item.id == id));

  //   return () => {};
  // }, [id]);
  const { profile, location } = employerData;
  return (
    <>
      <Layout>
        <Seo pageTitle="Employers Details" />

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
                      <img src={profile?.logoImage} alt="logo" />
                    </span>
                    <h4>{profile.company_name}</h4>

                    <ul className="job-info">
                      <li>
                        <span className="icon flaticon-map-locator"></span>
                        {employerData?.location?.address}
                      </li>
                      {/* compnay info */}
                      <li>
                        <span className="icon flaticon-briefcase"></span>
                        {profile?.company_cat?.join(" / ")}
                      </li>
                      {/* location info */}
                      <li>
                        <span className="icon flaticon-telephone-1"></span>
                        {profile?.company_phone}
                      </li>
                      {/* time info */}
                      <li>
                        <span className="icon flaticon-mail"></span>
                        {profile?.company_email}
                      </li>
                      {/* salary info */}
                    </ul>
                    {/* End .job-info */}

                    <ul className="job-other-info">
                      <li className="time">Open Jobs – {jobsData?.length}</li>
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
                    employerDescription={profile?.company_about}
                  />
                  {/* End job-detail */}

                  {/* <!-- Related Jobs --> */}
                  <div className="related-jobs">
                    <div className="title-box">
                      <h3>Open position</h3>
                      {/* <div className="text">
                        2020 jobs live - 293 added today.
                      </div> */}
                    </div>
                    {/* End .title-box */}
                    {jobsData?.map((i, index) => (
                      <RelatedJobs
                        item={i}
                        key={index}
                        profile={profile}
                        location={location}
                      />
                    ))}

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
                            Founded in: <span>{profile?.founded_date}</span>
                          </li>
                          <li>
                            Phone: <span>{profile?.company_phone}</span>
                          </li>
                          <li>
                            Email: <span>{profile?.company_email}</span>
                          </li>
                          <li>
                            Location: <span>{location?.address}</span>
                          </li>
                          <li>
                            Social media:
                            <Social />
                          </li>
                        </ul>
                        {/* End compnay-info */}

                        <div className="btn-box">
                          <a
                            href={`https://${profile?.company_website}`}
                            className="theme-btn btn-style-three"
                            style={{ textTransform: "lowercase" }}
                            target="_blank"
                          >
                            {profile?.company_website}
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
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const employerData = await store.firestore
        .collection("employers")
        .doc(query.id)
        .get();
      if (!employerData.data()) {
        return {
          notFound: true,
        };
      }

      // Check if jobData or employerData is undefined and handle accordingly

      const serializedEmployerData = employerData.data()
        ? JSON.parse(JSON.stringify(employerData.data()))
        : null;

      return {
        props: {
          employerData: serializedEmployerData,
        },
      };
    }
);
export default dynamic(() => Promise.resolve(EmployersSingleV1), {
  ssr: false,
});

import dynamic from "next/dynamic";
import MobileMenu from "../../components/header/MobileMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { wrapper } from "../../app/store";
import Seo from "../../components/common/Seo";
import RelatedJobs from "../../components/job-single-pages/related-jobs/RelatedJobs";
import JobOverView from "../../components/job-single-pages/job-overview/JobOverView";
import JobSkills from "../../components/job-single-pages/shared-components/JobSkills";
import CompanyInfo from "../../components/job-single-pages/shared-components/CompanyInfo";
import MapJobFinder from "../../components/job-listing-pages/components/MapJobFinder";
import SocialTwo from "../../components/job-single-pages/social/SocialTwo";
import Contact from "../../components/job-single-pages/shared-components/Contact";
import JobDetailsDescriptions from "../../components/job-single-pages/shared-components/JobDetailsDescriptions";
import ApplyJobModalContent from "../../components/job-single-pages/shared-components/ApplyJobModalContent";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIfUserApplied,
  favouriteJobAdd,
  getFavouriteJob,
  jobApplyApplication,
  removeFavouriteJob,
} from "../../features/jobs/actionCreator";
import { Modal } from "react-bootstrap";

const JobSingleDynamicV1 = ({ jobData }) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });
  const loading = useSelector((state) => {
    return state.jobs.jobFavLoading;
  });
  const role = useSelector((state) => state.auth.role);

  const [like, setLike] = useState(false);
  const favJobData = useSelector((state) => {
    return state.jobs.jobFavData;
  });
  const isApplied = useSelector((state) => {
    return state.jobSingle.isApplied;
  });
  console.log(isApplied);

  useEffect(() => {
    dispatch(getFavouriteJob(userUid));
  }, [userUid, like]);
  useEffect(() => {
    const isJobFavorited = favJobData.some((job) => job.jobId === id);
    if (isJobFavorited) {
      setLike(true); // Set like to true if the job is favorited
    } else {
      setLike(false); // Set like to false if the job is not favorited
    }
  }, [id, favJobData]);
  if (!id) {
    return <div>Loading...</div>; // Or display a different component if id is not present
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (userUid) {
      dispatch(checkIfUserApplied(userUid, id));
    }
  }, [dispatch, userUid, id]);

  const convertTimestampToDateTime = (timestampInSeconds) => {
    const timestampInMilliseconds = timestampInSeconds * 1000; // Convert to milliseconds
    const date = new Date(timestampInMilliseconds);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  // console.log(jobData?.createdAt?.seconds);
  const calculateTimeDistanceFromNow = (timestampInSeconds) => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const timeDifferenceInSeconds = currentTimeInSeconds - timestampInSeconds;

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 365 * secondsInDay;

    if (timeDifferenceInSeconds < secondsInMinute) {
      return `${timeDifferenceInSeconds} seconds ago`;
    } else if (timeDifferenceInSeconds < secondsInHour) {
      const minutes = Math.floor(timeDifferenceInSeconds / secondsInMinute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifferenceInSeconds < secondsInDay) {
      const hours = Math.floor(timeDifferenceInSeconds / secondsInHour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifferenceInSeconds < secondsInMonth) {
      const days = Math.floor(timeDifferenceInSeconds / secondsInDay);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDifferenceInSeconds < secondsInYear) {
      const months = Math.floor(timeDifferenceInSeconds / secondsInMonth);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(timeDifferenceInSeconds / secondsInYear);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };
  const styleClass = (jobType) => {
    switch (jobType) {
      case "Full-Time":
      case "Part-Time":
      case "Contract/Freelance":
        return "time";
      case "Temporary":
      case "Internship":
        return "privacy";
      case "Remote/Telecommute":
        return "required";
    }
  };
  const handleSaveFavouriteJob = async () => {
    if (!userUid) {
      alert("not login");
      return;
    } else {
      const isJobAlreadySaved = favJobData.some((job) => job.jobId === id);

      if (isJobAlreadySaved) {
        // If the job is already saved, remove it from favorites
        await dispatch(removeFavouriteJob(userUid, id));
        setLike(false); // Update the like state to false
      } else {
        // If the job is not saved, add it to favorites
        await dispatch(favouriteJobAdd(userUid, id));
        setLike(true); // Update the like state to true
      }
    }
  };

  return (
    <>
      <Layout>
        <Seo pageTitle="Job Details" />
        <span className="header-span"></span>

        {/* <LoginPopup /> */}
        {/* End Login Popup Modal */}

        {/* <DefaulHeader /> */}
        {/* <!--End Main Header --> */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <!-- Job Detail Section --> */}
        <section className="job-detail-section">
          <div className="upper-box">
            <div className="auto-container">
              <div className="job-block-seven">
                <div className="inner-box">
                  <div className="content">
                    <span className="company-logo">
                      <img src={jobData?.profile?.logoImage} alt="logo" />
                    </span>
                    <h4>{jobData?.jobTitle}</h4>

                    <ul className="job-info">
                      <li>
                        <span className="icon flaticon-briefcase"></span>
                        {jobData?.profile?.company_name}
                      </li>
                      {/* compnay info */}
                      <li>
                        <span className="icon flaticon-map-locator"></span>
                        {jobData?.location?.address}
                      </li>
                      {/* location info */}
                      <li>
                        <span className="icon flaticon-clock-3"></span>{" "}
                        {calculateTimeDistanceFromNow(
                          jobData?.createdAt?.seconds
                        )}
                      </li>
                      {/* time info */}
                      {/* <li>
                        <span className="icon flaticon-money"></span>{" "}
                        {jobData?.salary}
                      </li> */}
                      {/* salary info */}
                    </ul>
                    {/* End .job-info */}

                    <ul className="job-other-info">
                      {/* {company?.jobType?.map((val, i) => ( */}
                      <li className={`${styleClass(jobData?.jobType)}`}>
                        {jobData?.jobType}
                      </li>
                      {/* ))} */}
                    </ul>
                    {/* End .job-other-info */}
                  </div>
                  {/* End .content */}

                  <div
                    className="action"
                    style={{ display: "block", textAlign: "right" }}
                  >
                    <div
                      className="deadline-time"
                      style={{ marginBottom: "15px" }}
                    >
                      {"Application ends : "}
                      <strong style={{ color: "red" }}>
                        {new Date(
                          jobData?.deadlineDate.seconds * 1000 +
                            jobData?.deadlineDate.nanoseconds / 1000000
                        ).toLocaleDateString("en-GB")}
                      </strong>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        href="#"
                        className="theme-btn btn-style-one"
                        // data-bs-toggle="modal"
                        // data-bs-target="#applyJobModal"
                        style={{ minWidth: "222px" }}
                        disabled={isApplied}
                        onClick={handleShow}
                      >
                        {isApplied ? (
                          <i className="flaticon-checked">{" Applied"}</i>
                        ) : (
                          " Apply now"
                        )}
                      </button>
                      <button
                        className="bookmark-btn"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: like ? "#1967d2" : "",
                        }}
                        onClick={handleSaveFavouriteJob}
                      >
                        {loading ? (
                          <ReactLoading
                            type="spin"
                            color="#fff"
                            width={25}
                            height={25}
                          />
                        ) : (
                          <i
                            className="flaticon-bookmark"
                            style={{ color: like ? "gold" : "" }}
                          ></i>
                        )}
                      </button>
                    </div>
                  </div>
                  {/* End apply for job btn */}

                  {/* <!-- Modal --> */}
                  <Modal show={show} onHide={handleClose} centered>
                    <div className="apply-modal-content">
                      <div className="text-center">
                        <h3 className="title">Apply for this job</h3>
                        <button
                          type="button"
                          className="closed-modal"
                          onClick={handleClose}
                        ></button>
                      </div>
                      {/* End modal-header */}

                      <ApplyJobModalContent
                        id={id}
                        userUid={userUid}
                        handleClose={handleClose}
                      />
                      {/* End PrivateMessageBox */}
                    </div>
                  </Modal>

                  {/* End .modal */}
                </div>
              </div>
              {/* <!-- Job Block --> */}
            </div>
          </div>
          <div className="job-detail-outer">
            <div className="auto-container">
              <div className="row">
                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                  <JobDetailsDescriptions jobData={jobData} />
                  {/* End jobdetails content */}

                  <div className="other-options">
                    <div className="social-share">
                      <h5>Share this job</h5>
                      <SocialTwo />
                    </div>
                  </div>
                  {/* <!-- Other Options --> */}

                  {/* <div className="related-jobs">
                    <div className="title-box">
                      <h3>Related Jobs</h3>
                      <div className="text">
                        2020 jobs live - 293 added today.
                      </div>
                    </div>
                  

                    <RelatedJobs />
                  </div> */}
                  {/* <!-- Related Jobs --> */}
                </div>
                {/* End .content-column */}

                <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                  <aside className="sidebar">
                    {/* End apply for job btn */}

                    {/* <!-- Modal --> */}

                    {/* End .modal */}

                    <div className="sidebar-widget">
                      {/* <!-- Job Overview --> */}
                      <h4 className="widget-title">Job Overview</h4>
                      <JobOverView
                        jobData={jobData}
                        timeDistance={calculateTimeDistanceFromNow(
                          jobData?.createdAt?.seconds
                        )}
                      />

                      {/* <!-- Map Widget --> */}
                      <h4
                        className="widget-title"
                        style={{ marginTop: "30px" }}
                      >
                        Job Location
                      </h4>
                      <div className="widget-content">
                        <div className="map-outer">
                          <div style={{ height: "300px", width: "100%" }}>
                            <MapJobFinder location={jobData?.location} />
                          </div>
                        </div>
                      </div>
                      {/* <!--  Map Widget --> */}

                      <h4 className="widget-title">Job Skills</h4>
                      <div className="widget-content">
                        <JobSkills />
                      </div>
                      {/* <!-- Job Skills --> */}
                    </div>
                    {/* End .sidebar-widget */}

                    <div className="sidebar-widget company-widget">
                      <div className="widget-content">
                        <div
                          className="company-title"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div className="company-logo">
                            <img
                              src={jobData?.profile?.logoImage}
                              alt="resource"
                            />
                          </div>
                          <h5 className="company-name">
                            {jobData?.company_info?.company_name}
                          </h5>
                          <Link
                            href={`/employers-single/${jobData.company}`}
                            className="profile-link"
                            target="_blank"
                          >
                            {jobData?.profile?.company_name}
                          </Link>
                        </div>
                        {/* End company title */}

                        <CompanyInfo company={jobData?.profile} />

                        <div className="btn-box">
                          {/* <a
                            href={`https://${jobData?.profile?.company_website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="theme-btn btn-style-three"
                          >
                            {jobData?.company_info?.company_website}
                          </a> */}
                          <Link
                            href={`/employers-single/${jobData?.company}`}
                            className="theme-btn btn-style-three"
                            target="_blank"
                          >
                            View Company Profile
                          </Link>
                        </div>
                        {/* End btn-box */}
                      </div>
                    </div>
                    {/* End .company-widget */}

                    <div className="sidebar-widget contact-widget">
                      <h4 className="widget-title">Contact Us</h4>
                      <div className="widget-content">
                        <div className="default-form">
                          <Contact />
                        </div>
                        {/* End .default-form */}
                      </div>
                    </div>
                    {/* End contact-widget */}
                  </aside>
                  {/* End .sidebar */}
                </div>
                {/* End .sidebar-column */}
              </div>
            </div>
          </div>
          {/* <!-- job-detail-outer--> */}
        </section>
      </Layout>

      {/* <!-- Header Span --> */}
      {/* <!-- End Job Detail Section --> */}

      {/* <FooterDefault footerStyle="alternate5" /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const jobData = await store.firestore
        .collection("jobs")
        .doc(query.id)
        .get();
      if (!jobData.data()) {
        return {
          notFound: true,
        };
      }
      const employerData = await store.firestore
        .collection("employers")
        .doc(jobData.data()?.company)
        .get();

      // Check if jobData or employerData is undefined and handle accordingly
      const serializedJobData = jobData.data()
        ? JSON.parse(JSON.stringify(jobData.data()))
        : null;
      const serializedEmployerData = employerData.data()
        ? JSON.parse(JSON.stringify(employerData.data()))
        : null;
      const combineData = { ...serializedJobData, ...serializedEmployerData };

      return {
        props: {
          jobData: combineData,
        },
      };
    }
);
export default dynamic(() => Promise.resolve(JobSingleDynamicV1), {
  ssr: false,
});

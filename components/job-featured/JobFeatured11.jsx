import Link from "next/link";
import { useEffect, useState } from "react";
import jobFeatured from "../../data/job-featured";
import { jobReadData } from "../../features/jobs/actionCreator";
import { useDispatch, useSelector } from "react-redux";

const JobFeatured11 = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("1");
  const jobData = useSelector((state) => {
    return state.jobs.data;
  });
  const loading = useSelector((state) => {
    return state.jobs.loading;
  });
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
      case "Urgent":
        return "required";
    }
  };
  const handleClick = (event) => {
    setActive(event.target.id);
  };
  console.log(jobData);
  useEffect(() => {
    dispatch(jobReadData());
  }, []);
  return (
    <>
      <div className="tab-buttons-wrap">
        <ul className="tab-buttons -pills-condensed -blue">
          <li
            className={`tab-btn ${active === "1" ? "active-btn" : ""}`}
            key={1}
            id={"1"}
            onClick={handleClick}
          >
            Feature
          </li>
          <li
            className={`tab-btn ${active === "2" ? "active-btn" : ""}`}
            key={2}
            id={"2"}
            onClick={handleClick}
          >
            Urgent
          </li>
          <li
            className={`tab-btn ${active === "3" ? "active-btn" : ""}`}
            key={3}
            id={"3"}
            onClick={handleClick}
          >
            Private
          </li>
        </ul>
      </div>
      {/* <!--Tabs Box--> */}

      <div className="row pt-50">
        {jobData?.map((item, index) => (
          <div
            className="job-block-three col-lg-4 col-md-6 col-sm-12"
            key={index}
          >
            <div className="inner-box">
              <div className="content">
                <span className="company-logo">
                  <img src={item?.profile?.logoImage} alt="item brand" />
                </span>
                <h4>
                  <Link href={`/job-single/${item?.id}`}>{item?.jobTitle}</Link>
                </h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {item?.profile?.company_name}
                  </li>
                  {/* compnay info */}
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {item?.location?.address}
                  </li>
                  {/* location info */}
                </ul>
                {/* End .job-info */}

                <ul className="job-other-info">
                  {item?.jobType?.map((val, i) => (
                    <li key={i} className={`${styleClass(val)}`}>
                      {val}
                    </li>
                  ))}
                </ul>
                {/* End .job-other-info */}

                <button className="bookmark-btn">
                  <span className="flaticon-bookmark"></span>
                </button>
              </div>
            </div>
          </div>
          // End job-block
        ))}
      </div>
    </>
  );
};

export default JobFeatured11;

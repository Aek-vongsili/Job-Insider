import Link from "next/link";
import { useState } from "react";

import jobFeatured from "../../data/job-featured";

const JobFeatured11 = () => {
  const [active, setActive] = useState("1");
  const handleClick = (event) => {
    setActive(event.target.id);
  };
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
        {jobFeatured.slice(11, 20).map((item) => (
          <div
            className="job-block-three col-lg-4 col-md-6 col-sm-12"
            key={item.id}
          >
            <div className="inner-box">
              <div className="content">
                <span className="company-logo">
                  <img src={item.logo} alt="item brand" />
                </span>
                <h4>
                  <Link href={`/job-single-v5/${item.id}`}>
                    {item.jobTitle}
                  </Link>
                </h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {item.company}
                  </li>
                  {/* compnay info */}
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {item.location}
                  </li>
                  {/* location info */}
                </ul>
                {/* End .job-info */}

                <ul className="job-other-info">
                  {item.jobType.map((val, i) => (
                    <li key={i} className={`${val.styleClass}`}>
                      {val.type}
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

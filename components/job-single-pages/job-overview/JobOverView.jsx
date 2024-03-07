const JobOverView = ({ jobData, timeDistance }) => {
  // Replace with your date string
  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{jobData?.jobTitle}</span>
        </li>
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Date Posted:</h5>
          <span>Posted {timeDistance}</span>
        </li>
        <li>
          <i className="icon icon-expiry"></i>
          <h5>Expiration date:</h5>
          <span>
            {" "}
            {new Date(
              jobData?.deadlineDate.seconds * 1000 +
                jobData?.deadlineDate.nanoseconds / 1000000
            ).toLocaleDateString("en-GB")}
          </span>
        </li>
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>{jobData?.location?.address}</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Gender</h5>
          <span>{jobData?.gender}</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Qualification</h5>
          <span>{jobData?.qualification}</span>
        </li>

        {/* <li>
          <i className="icon icon-clock"></i>
          <h5>Hours:</h5>
          <span>50h / week</span>
        </li>
        <li>
          <i className="icon icon-rate"></i>
          <h5>Rate:</h5>
          <span>$15 - $25 / hour</span>
        </li>
        <li>
          <i className="icon icon-salary"></i>
          <h5>Salary:</h5>
          <span>{jobData?.salary}</span>
        </li> */}
      </ul>
    </div>
  );
};

export default JobOverView;

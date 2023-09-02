const JobOverView = ({ jobData, timeDistance }) => {
  // Replace with your date string
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const dateObject = new Date(jobData?.deadlineDate);
  const formattedDate = formatDate(dateObject);
  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Date Posted:</h5>
          <span>Posted {timeDistance}</span>
        </li>
        <li>
          <i className="icon icon-expiry"></i>
          <h5>Expiration date:</h5>
          <span>{formattedDate}</span>
        </li>
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>{jobData?.location?.address}</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{jobData?.jobTitle}</span>
        </li>
        <li>
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
        </li>
      </ul>
    </div>
  );
};

export default JobOverView;

import Link from "next/link";
import jobs from "../../../data/job-featured";

const RelatedJobs = ({ item, location, profile }) => {
  const calculateTimeDistanceFromNow = (timestampInSeconds, nanoseconds) => {
    // Convert nanoseconds to milliseconds and add to timestampInSeconds
    const timestampInMillis =
      timestampInSeconds * 1000 + Math.floor(nanoseconds / 1e6);

    const currentTimeInMillis = Date.now();
    const timeDifferenceInMillis = currentTimeInMillis - timestampInMillis;

    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 365 * secondsInDay;

    if (timeDifferenceInMillis < millisecondsInSecond) {
      return `${timeDifferenceInMillis} milliseconds ago`;
    } else if (
      timeDifferenceInMillis <
      secondsInMinute * millisecondsInSecond
    ) {
      const seconds = Math.floor(timeDifferenceInMillis / millisecondsInSecond);
      return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    } else if (timeDifferenceInMillis < secondsInHour * millisecondsInSecond) {
      const minutes = Math.floor(
        timeDifferenceInMillis / (secondsInMinute * millisecondsInSecond)
      );
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifferenceInMillis < secondsInDay * millisecondsInSecond) {
      const hours = Math.floor(
        timeDifferenceInMillis / (secondsInHour * millisecondsInSecond)
      );
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifferenceInMillis < secondsInMonth * millisecondsInSecond) {
      const days = Math.floor(
        timeDifferenceInMillis / (secondsInDay * millisecondsInSecond)
      );
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDifferenceInMillis < secondsInYear * millisecondsInSecond) {
      const months = Math.floor(
        timeDifferenceInMillis / (secondsInMonth * millisecondsInSecond)
      );
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(
        timeDifferenceInMillis / (secondsInYear * millisecondsInSecond)
      );
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };
  return (
    <>
      <div className="job-block">
        <div className="inner-box">
          <div className="content">
            <span className="company-logo">
              <img src={profile?.logoImage} alt="resource" />
            </span>
            <h4>
              <Link href={`/job-single/${item.id}`}>{item.jobTitle}</Link>
            </h4>

            <ul className="job-info">
              <li>
                <span className="icon flaticon-briefcase"></span>
                {profile.company_name}
              </li>
              {/* compnay info */}
              <li>
                <span className="icon flaticon-map-locator"></span>
                {location.address}
              </li>
              {/* location info */}
              <li>
                <span className="icon flaticon-clock-3"></span>
                {calculateTimeDistanceFromNow(item?.createdAt?.seconds,item?.createdAt?.nanoseconds)}
              </li>
              {/* time info */}
              <li>
                <span className="icon flaticon-money"></span> {item.salary}
              </li>
              {/* salary info */}
            </ul>
            {/* End .job-info */}

            {/* <ul className="job-other-info">
              {item.jobType.map((val, i) => (
                <li key={i} className={`${val.styleClass}`}>
                  {val.type}
                </li>
              ))}
            </ul> */}
            {/* End .job-other-info */}
            <button className="bookmark-btn">
              <span className="flaticon-bookmark"></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedJobs;

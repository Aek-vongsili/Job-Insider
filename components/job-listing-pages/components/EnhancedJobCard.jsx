import Link from "next/link";
import { useState } from "react";

const EnhancedJobCard = ({ job, linkPrefix = "/job-single-v1" }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const formatTime = (time) => {
    if (!time) return "Recently posted";
    return time;
  };

  const formatSalary = (salary) => {
    if (!salary) return "Competitive";
    return salary;
  };

  return (
    <div className="job-block">
      <div className="inner-box">
        <div className="content">
          <div className="company-logo">
            <img 
              src={job.logo || job?.profile?.logoImage || "/images/resource/company-logo/default.png"} 
              alt={job.company || job?.profile?.company_name || "Company logo"} 
            />
          </div>

          <div className="job-details">
            <div className="job-header">
              <h4>
                <Link href={`${linkPrefix}/${job.id}`}>
                  {job.jobTitle}
                </Link>
              </h4>
              <span className="company-name">
                {job.company || job?.profile?.company_name}
              </span>
            </div>

            <ul className="job-info">
              {(job.company || job?.profile?.company_name) && (
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {job.company || job?.profile?.company_name}
                </li>
              )}
              
              {(job.location || job?.location?.address) && (
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {job.location || job?.location?.address}
                </li>
              )}
              
              <li>
                <span className="icon flaticon-clock-3"></span>
                {formatTime(job.time)}
              </li>
              
              {job.salary && (
                <li>
                  <span className="icon flaticon-money"></span>
                  {formatSalary(job.salary)}
                </li>
              )}
            </ul>

            <div className="job-tags">
              <ul className="job-other-info">
                {job?.jobType?.map((val, i) => (
                  <li key={i} className={val.styleClass || "time"}>
                    {val.type || val}
                  </li>
                ))}
                {typeof job.jobType === 'string' && (
                  <li className="time">
                    {job.jobType}
                  </li>
                )}
                {job.jobType2 && (
                  <li className="green">
                    {job.jobType2}
                  </li>
                )}
              </ul>
            </div>
          </div>

          <button 
            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={handleBookmark}
            aria-label="Bookmark this job"
          >
            <span className={`flaticon-bookmark ${isBookmarked ? 'fas fa-bookmark' : ''}`}></span>
          </button>
        </div>

        <div className="job-card-footer">
          <div className="job-meta">
            {job.applicants && (
              <span className="applicants-count">
                {job.applicants.length || 0} applicant{(job.applicants.length || 0) !== 1 ? 's' : ''}
              </span>
            )}
            {job.experience && (
              <span className="experience-level">
                {job.experience} experience
              </span>
            )}
          </div>
          
          <Link href={`${linkPrefix}/${job.id}`} className="apply-btn">
            <span>View Details</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnhancedJobCard; 
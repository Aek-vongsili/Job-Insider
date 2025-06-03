const JobDetailsDescriptions = ({ jobData }) => {
  return (
    <div className="job-detail">
      {jobData?.jobDetails && <div
        className="job-details-content"
        dangerouslySetInnerHTML={{ __html: jobData?.jobDetails }}
      />}
      {jobData?.jobDescription && jobData.jobDescription.trim() !== '' && (
        <div>
          <h4>Job Description</h4>
          <p style={{ wordWrap: "break-word", overflowWrap: "break-word", textAlign: "justify" }}>
            {jobData.jobDescription}
          </p>
        </div>
      )}


      {jobData?.keylist &&
        jobData.keylist.length > 0 &&
        jobData.keylist.some(item => item.keyList && item.keyList.trim() !== '') && (
          <div>
            <h4>Key Responsibilities</h4>
            <ul className="list-style-three">
              {jobData.keylist
                .filter(item => item.keyList && item.keyList.trim() !== '')
                .map((i, index) => (
                  <li key={index}>{i.keyList}</li>
                ))}
            </ul>
          </div>
        )}

      {jobData?.skill &&
        jobData.skill.length > 0 &&
        jobData.skill.some(item => item.skillList && item.skillList.trim() !== '') && (
          <div>
            <h4>Skill & Experience</h4>
            <ul className="list-style-three">
              {jobData.skill
                .filter(item => item.skillList && item.skillList.trim() !== '')
                .map((i, index) => (
                  <li key={index}>{i.skillList}</li>
                ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default JobDetailsDescriptions;

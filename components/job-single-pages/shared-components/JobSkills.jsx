const JobSkills = ({jobSkills}) => {

  return (
    <>
      {jobSkills && jobSkills.length > 0 && (
        <ul className="job-skills">
          {jobSkills.map((skill, i) => (
            <li key={i}>
              <a href="#">{skill.label}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default JobSkills;
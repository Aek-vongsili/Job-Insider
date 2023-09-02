const JobDetailsDescriptions = ({ jobData }) => {
  return (
    <div className="job-detail">
      <h4>Job Description</h4>
      <p style={{wordWrap:"break-word",overflowWrap:"break-word"}}>{jobData?.jobDescription}</p>
      <h4>Key Responsibilities</h4>
      <ul className="list-style-three">
        {jobData?.keylist?.map((i, index) => (
          <li key={index}>{i.keyList}</li>
        ))}
        {/* <li>
          Be involved in every step of the product design cycle from discovery
          to developer handoff and user acceptance testing.
        </li>
        <li>
          Work with BAs, product managers and tech teams to lead the Product
          Design
        </li>
        <li>
          Maintain quality of the design process and ensure that when designs
          are translated into code they accurately reflect the design
          specifications.
        </li>
        <li>Accurately estimate design tickets during planning sessions.</li>
        <li>
          Contribute to sketching sessions involving non-designersCreate,
          iterate and maintain UI deliverables including sketch files, style
          guides, high fidelity prototypes, micro interaction specifications and
          pattern libraries.
        </li>
        <li>
          Ensure design choices are data led by identifying assumptions to test
          each sprint, and work with the analysts in your team to plan moderated
          usability test sessions.
        </li>
        <li>
          Design pixel perfect responsive UI’s and understand that adopting
          common interface patterns is better for UX than reinventing the wheel
        </li>
        <li>
          Present your work to the wider business at Show & Tell sessions.
        </li> */}
      </ul>
      <h4>Skill & Experience</h4>
      <ul className="list-style-three">
        {jobData?.skill?.map((i, index) => (
          <li key={index}>{i.skillList}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobDetailsDescriptions;

import Social from "../social/Social";

const CompanyInfo = ({ company }) => {
  return (
    <ul className="company-info">
      <li>
        Primary industry: <span>Software</span>
      </li>
      <li>
        Company size: <span>501-1,000</span>
      </li>
      <li>
        Founded in: <span>{company?.company_info?.company_est}</span>
      </li>
      <li>
        Phone: <span>{company?.company_info?.company_phone}</span>
      </li>
      <li>
        Email: <span>{company?.company_info?.company_email}</span>
      </li>
      <li>
        Location: <span>{company?.location?.address}</span>
      </li>
      <li>
        Social media:
        <Social />
      </li>
    </ul>
  );
};

export default CompanyInfo;

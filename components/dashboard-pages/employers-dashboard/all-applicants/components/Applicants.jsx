import Link from "next/link";
import candidatesData from "../../../../../data/candidates";

const Applicants = ({ candidate, appliedAt }) => {
  return (
    <>
      <div className="candidate-block-three col-lg-6 col-md-12 col-sm-12">
        <div className="inner-box">
          <div className="content">
            <figure className="image">
              <img
                src={
                  candidate?.profile?.profileImage ||
                  "/images/resource/avatar-1.jpg"
                }
                alt="candidates"
              />
            </figure>
            <h4 className="name">
              <Link href={`/candidates-single-v1/${candidate.id}`}>
                {candidate?.profile?.firstname} {candidate?.profile?.lastname}
              </Link>
            </h4>

            <ul className="candidate-info">
              <li>
                <span className="icon flaticon-map-locator"></span>{" "}
                {candidate?.profile?.district} , {candidate?.profile?.province}
              </li>
              <li>
                <span className="icon flaticon-time"></span>
                Applied at :{" "}
                {appliedAt && (
                  <>
                    {new Date(
                      appliedAt.seconds * 1000 + appliedAt.nanoseconds / 1000000
                    ).toLocaleDateString("en-GB")}
                    <br />
                  </>
                )}
                {/* {item?.appliedAt && (
                  <>
                    {new Date(
                      item.appliedAt.seconds * 1000 +
                        item.appliedAt.nanoseconds / 1000000
                    ).toLocaleDateString("en-GB")}
                    <br />
                  </>
                )} */}
              </li>
            </ul>
            {/* End candidate-info */}

            {/* <ul className="post-tags">
              {candidate.tags.map((val, i) => (
                <li key={i}>
                  <a href="#">{val}</a>
                </li>
              ))}
            </ul> */}
          </div>
          {/* End content */}

          <div className="option-box">
            <ul className="option-list">
              <li>
                <button data-text="View Aplication">
                  <span className="la la-eye"></span>
                </button>
              </li>
              <li>
                <button data-text="Approve Aplication">
                  <span className="la la-check"></span>
                </button>
              </li>
              <li>
                <button data-text="Reject Aplication">
                  <span className="la la-times-circle"></span>
                </button>
              </li>
              <li>
                <button data-text="Delete Aplication">
                  <span className="la la-trash"></span>
                </button>
              </li>
            </ul>
          </div>
          {/* End admin options box */}
        </div>
      </div>
    </>
  );
};

export default Applicants;

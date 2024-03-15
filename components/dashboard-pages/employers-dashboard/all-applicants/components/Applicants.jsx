import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  employerApproveApplicant,
  employerJobListRead,
  employerRejectApplicant,
  employerUndoApplicant,
} from "../../../../../features/employer/actionCreator";

const Applicants = ({ data, appliedAt, jobId, applicantId }) => {
  const dispatch = useDispatch();
  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });
  const handleApproveApplicant = async () => {
    await dispatch(employerApproveApplicant(userUid, jobId, applicantId));
    await dispatch(employerJobListRead(userUid));
  };
  const handleRejectApplicant = async () => {
    await dispatch(employerRejectApplicant(userUid, jobId, applicantId));
    await dispatch(employerJobListRead(userUid));
  };
  const handleUndoActiontApplicant = async () => {
    await dispatch(employerUndoApplicant(userUid, jobId, applicantId));
    await dispatch(employerJobListRead(userUid));
  };
  const { candidate } = data;
  const styles = {
    display: "inline",
    padding: "0.2em 0.6em 0.3em",
    fontSize: "75%",
    fontWeight: "bold",
    lineHeight: "1",
    color: "#fff",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: "0.25em",
    marginLeft: "10px",
  };
  const getBackgroundColor = (status) => {
    if (status === "approved") {
      return "#79b530"; // Green for approve
    } else if (status === "rejected") {
      return "#d93025"; // Red for reject
    } else if (status === "pending") {
      return "#27ceb4"; // Blue for pending
    } else {
      return "#000"; // Default color
    }
  };
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
            <div className="name">
              <Link href={`/candidates-single/${data?.id}`}>
                {candidate?.profile?.firstname} {candidate?.profile?.lastname}
              </Link>
              <span
                style={{
                  ...styles,
                  backgroundColor: getBackgroundColor(data?.status),
                }}
              >
                {data?.status &&
                  data.status.charAt(0).toUpperCase() + data.status.slice(1)}
              </span>
            </div>

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
              {(data?.status === "pending" || data?.status === "approved") && (
                <li>
                  <a
                    href={candidate?.resume?.cvUrl}
                    download="Your_CV.pdf"
                    target="_blank"
                  >
                    <button data-text="View Cv">
                      <span className="la la-file"></span>
                    </button>
                  </a>
                </li>
              )}
              {data?.status !== "approved" && data?.status !== "rejected" && (
                <li>
                  <button
                    data-text="Approve Aplication"
                    onClick={handleApproveApplicant}
                  >
                    <span className="la la-check"></span>
                  </button>
                </li>
              )}
              {data?.status !== "rejected" && data?.status !== "approved" && (
                <li>
                  <button
                    data-text="Reject Application"
                    onClick={handleRejectApplicant}
                  >
                    <span className="la la-times-circle"></span>
                  </button>
                </li>
              )}

              {data?.status === "rejected" && (
                <li>
                  <button
                    data-text="Undo reject"
                    onClick={handleUndoActiontApplicant}
                  >
                    <span className="la la-undo-alt"></span>
                  </button>
                </li>
              )}

              {data?.status === "approved" && (
                <li>
                  <button
                    data-text="Undo approve"
                    onClick={handleUndoActiontApplicant}
                  >
                    <span className="la la-undo-alt"></span>
                  </button>
                </li>
              )}
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

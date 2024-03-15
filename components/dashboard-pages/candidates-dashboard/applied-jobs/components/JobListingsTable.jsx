import Link from "next/link.js";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import {
  candidateDeleteAppliedJob,
  candidateGetJobApplied,
} from "../../../../../features/candidates/actionCreator";
import { useEffect } from "react";
import Swal from "sweetalert2";

const JobListingsTable = () => {
  const jobAppliedData = useSelector((state) => {
    return state.candidateSingle.applieJob;
  });
  const loading = useSelector((state) => {
    return state.candidateSingle.applieJobLoading;
  });
  const dispatch = useDispatch();
  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });
  useEffect(() => {
    dispatch(candidateGetJobApplied(userUid));
  }, [dispatch, userUid]);
  const handleDelete = async (jobId, applicantId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await dispatch(candidateDeleteAppliedJob(jobId, applicantId, userUid));
      await dispatch(candidateGetJobApplied(userUid));
    }
  };
  console.log(jobAppliedData);
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      <div style={{ display: "inline-block" }}>
                        <ReactLoading
                          type="spin"
                          color="#1967d2"
                          height={55}
                          width={55}
                        />
                      </div>
                    </td>
                  </tr>
                ) : jobAppliedData.length > 0 ? (
                  jobAppliedData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {/* <!-- Job Block --> */}
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                <img src={item.jobLogo} alt="logo" />
                              </span>
                              <h4>
                                <Link href={`/job-single/${item.jobId}`}>
                                  {item.title}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  {item.company}
                                </li>
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {item.location}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {item?.appliedAt && (
                          <>
                            {new Date(
                              item.appliedAt.seconds * 1000 +
                                item.appliedAt.nanoseconds / 1000000
                            ).toLocaleDateString("en-GB")}
                            <br />
                          </>
                        )}
                      </td>
                      <td className={`${item?.status}`}>
                        {item?.status &&
                          item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                      </td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Aplication">
                                <span className="la la-eye"></span>
                              </button>
                            </li>
                            <li>
                              <button
                                data-text="Delete Aplication"
                                onClick={() =>
                                  handleDelete(item?.jobId, item?.id)
                                }
                              >
                                <span className="la la-trash"></span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;

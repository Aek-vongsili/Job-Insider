import Link from "next/link";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  employerJobDelete,
  employerJobListRead,
  employersProfileData,
} from "../../../../../features/employer/actionCreator.js";
import Swal from "sweetalert2";

const JobListingsTable = () => {
  const dispatch = useDispatch();
  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });
  const jobsData = useSelector((state) => {
    return state.employerSingle.jobData;
  });
  const loading = useSelector((state) => {
    return state.employerSingle.jobLoading;
  });
  const company_profile = useSelector((state) => {
    return state.employerSingle.data?.profile;
  });
  useEffect(() => {
    dispatch(employerJobListRead(userUid));
  }, [userUid, dispatch]);
  useEffect(() => {
    dispatch(employersProfileData(userUid));
  }, [dispatch, userUid]);

  const handleDeleteJob = (jobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this job!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await dispatch(employerJobDelete(jobId, userUid));
        if (success) {
          Swal.fire("Deleted!", "Your job has been deleted.", "success");
          dispatch(employerJobListRead(userUid));
        } else {
          Swal.fire("Error!", "Failed to delete job.", "error");
        }
      }
    });
  };
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>

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
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Applications</th>
                <th>Created & Expired</th>
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
                        height={75}
                        width={75}
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                jobsData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {/* <!-- Job Block --> */}
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <img
                                src={company_profile?.logoImage}
                                alt="logo"
                              />
                            </span>
                            <h4>
                              <Link href={`/job-single/${item.id}`}>
                                {item.jobTitle}
                              </Link>
                            </h4>
                            {/* <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                Segment
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                London, UK
                              </li>
                            </ul> */}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="applied">
                      <a href="#">3+ Applied</a>
                    </td>
                    <td>
                      <div style={{ marginBottom: "20px" }}>
                        <span style={{ fontWeight: "bold" }}>Created : </span>{" "}
                        {item?.createdAt && (
                          <>
                            {new Date(
                              item.createdAt.seconds * 1000 +
                                item.createdAt.nanoseconds / 1000000
                            ).toLocaleDateString("en-GB")}
                            <br />
                          </>
                        )}
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>
                          Expiry date :{" "}
                        </span>{" "}
                        {item?.deadlineDate && (
                          <span style={{ color: "red" }}>
                            {new Date(
                              item.deadlineDate.seconds * 1000 +
                                item.deadlineDate.nanoseconds / 1000000
                            ).toLocaleDateString("en-GB")}
                            <br />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="status">
                      {" "}
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
                            <Link
                              data-text="Edit"
                              href={{
                                pathname: "manage-jobs/edit/[id]",
                                query: { id: item?.id },
                              }}
                            >
                              <span className="la la-pencil"></span>
                            </Link>
                          </li>
                          <li>
                            <button
                              data-text="Delete"
                              onClick={() => handleDeleteJob(item?.id)}
                            >
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;

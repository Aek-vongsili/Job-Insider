import Link from "next/link.js";
import jobs from "../../../../../data/job-featured.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router.js";
import {
  getFavouriteJob,
  removeFavouriteJob,
} from "../../../../../features/jobs/actionCreator.js";

const JobFavouriteTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });
  const jobData = useSelector((state) => {
    return state.jobs.jobFavData;
  });
  const loading = useSelector((state) => {
    return state.jobs.jobFavLoading;
  });
  const convertDateTime = (datetime) => {
    const date = new Date(
      datetime.seconds * 1000 + datetime.nanoseconds / 1000000
    );

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  };
  const handleDelete = async (favId) => {
    await dispatch(removeFavouriteJob(userUid, favId));
    await dispatch(getFavouriteJob(userUid));
  };
  useEffect(() => {
    dispatch(getFavouriteJob(userUid));
  }, [userUid, dispatch]);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Favorite Jobs</h4>

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
                  <th>Date Added</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        position: "relative",
                      }}
                    >
                      Loading...
                    </td>
                  </tr>
                ) : (
                  jobData?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {/* <!-- Job Block --> */}
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                <img src={item?.logoImage} alt="logo" />
                              </span>
                              <h4>
                                <Link href={`/job-single/${item?.jobId}`}>
                                  {item?.jobTitle}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  {item?.company_name}
                                </li>
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {item?.address}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{convertDateTime(item?.createdAt)}</td>
                      <td className="status">Active</td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button
                                data-text="View Aplication"
                                onClick={() =>
                                  router.push(`/job-single/${item?.jobId}`)
                                }
                              >
                                <span className="la la-eye"></span>
                              </button>
                            </li>
                            <li>
                              <button
                                data-text="Delete Aplication"
                                onClick={() => handleDelete(item?.jobId)}
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
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobFavouriteTable;

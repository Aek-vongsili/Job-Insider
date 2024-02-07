import Link from "next/link.js";
import jobs from "../../../../../data/job-featured.js";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
// import { db } from "../../../../../firebase/clientApp.js";
import { useSelector } from "react-redux";
import { useRouter } from "next/router.js";

const JobFavouriteTable = () => {
  const router = useRouter();
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const useruid = useSelector((state) => state.user.user?.uid);
  console.log(jobData);
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
    // await deleteDoc(doc(db, `users/${useruid}/favoriteJob`, favId));
    getFavoriteJobData();
  };
  const getFavoriteJobData = async () => {
    // const dateRef = collection(db, `users/${useruid}/favoriteJob`);

    // const querySnapshot = await getDocs(dateRef);
    // console.log(querySnapshot);
    // const jobDataArray = [];

    // await Promise.all(
    //   querySnapshot.docs.map(async (docSnap) => {
    //     const getJobData = await getDoc(
    //       doc(db, "job_features", docSnap.data()?.jobId)
    //     );
    //     if (getJobData.exists()) {
    //       const getCompany = await getDoc(
    //         doc(db, "employers", getJobData.data()?.company)
    //       );
    //       if (getCompany.exists()) {
    //         jobDataArray.push({
    //           ...getJobData.data(),
    //           ...getCompany.data()?.profile,
    //           jobid: getJobData.id,
    //           favJobId: docSnap.id,
    //           createdAt: docSnap.data()?.createdAt,
    //         });
    //       }
    //     }
    //   })
    // );

    // setJobData(jobDataArray);
    // setLoading(false);
  };
  useEffect(() => {
    getFavoriteJobData();
  }, []);

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
                    <td>Loading...</td>
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
                                <img
                                  src={item?.company_info?.logoImage}
                                  alt="logo"
                                />
                              </span>
                              <h4>
                                <Link href={`/job-single/${item?.jobid}`}>
                                  {item.jobTitle}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  {item?.company_info?.company_name}
                                </li>
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {item?.location?.address}
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
                                  router.push(`/job-single/${item?.jobid}`)
                                }
                              >
                                <span className="la la-eye"></span>
                              </button>
                            </li>
                            <li>
                              <button
                                data-text="Delete Aplication"
                                onClick={() => handleDelete(item?.favJobId)}
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

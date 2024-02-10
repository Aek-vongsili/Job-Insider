import Link from "next/link";
import jobs from "../../../data/job-featured";
import Pagination from "../components/Pagination";
import JobSelect from "../components/JobSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDatePosted,
  addExperienceSelect,
  addJobTypeSelect,
  addKeyword,
  addLocation,
  addPerPage,
  addSalary,
  addSort,
} from "../../../features/filter/filterSlice";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
// import { db } from "../../../firebase/clientApp";
import { useRouter } from "next/router";
import { setLoading } from "../../../features/user/userSlice";
import { jobReadData } from "../../../features/jobs/actionCreator";
// import Loading from "../../Loading/Loading";
const Loading = () => {
  return (
    <div class="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
const BookmarkIcon = ({ jobId }) => {
  const useruid = useSelector((state) => state.user.user?.uid);
  // const newFavoriteJobRef = doc(collection(db, `users/${useruid}/favoriteJob`));
  const [like, setLike] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      // try {
      //   const dateRef = query(
      //     collection(db, `users/${useruid}/favoriteJob`),
      //     where("jobId", "==", jobId)
      //   );
      //   const snapshot = await getDocs(dateRef);
      //   if (!snapshot.empty) {
      //     setLike(true);
      //   }
      // } catch (error) {
      //   console.error("Error checking if liked:", error);
      // }
    };
    if (useruid) {
      checkIfLiked();
    }
  }, [useruid, jobId, setLoading]);
  const saveShow = async () => {
    if (!useruid) {
      return alert("not login");
    }
    // try {
    //   if (like) {
    //     const dateRef = query(
    //       collection(db, `users/${useruid}/favoriteJob`),
    //       where("jobId", "==", jobId)
    //     );
    //     const snapshot = await getDocs(dateRef);
    //     snapshot.forEach(async (docSnap) => {
    //       await deleteDoc(doc(db, `users/${useruid}/favoriteJob`, docSnap.id));
    //       setLike(false);
    //     });
    //   } else {
    //     await setDoc(newFavoriteJobRef, {
    //       jobId: jobId,
    //       createdAt: new Date(),
    //     });
    //     setLike(true);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <button className="bookmark-btn" onClick={saveShow}>
      <span
        className="flaticon-bookmark"
        style={{ color: like ? "gold" : "" }}
      ></span>
    </button>
  );
};
const FilterJobBox = () => {
  const router = useRouter();
  const { jobList, jobSort } = useSelector((state) => state.filter);
  const jobData = useSelector((state) => {
    return state.jobs.data;
  });
  const loading = useSelector((state) => {
    return state.jobs.loading;
  });
  const {
    keyword,
    location,
    destination,
    category,
    datePosted,
    jobTypeSelect,
    experienceSelect,
    salary,
  } = jobList || {};

  const { sort, perPage } = jobSort;
  const role = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(jobReadData());
    if (role === "Employer") {
      router.push("/");
    }
  }, [role, router]);

  // keyword filter on title
  const keywordFilter = (item) =>
    keyword !== ""
      ? item.jobTitle.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      : item;

  // location filter
  const locationFilter = (item) =>
    location !== ""
      ? item?.location
          ?.toLocaleLowerCase()
          .includes(location?.toLocaleLowerCase())
      : item;

  // location filter
  const destinationFilter = (item) =>
    item?.destination?.min >= destination?.min &&
    item?.destination?.max <= destination?.max;

  // category filter
  const categoryFilter = (item) =>
    category !== ""
      ? item?.category?.toLocaleLowerCase() === category?.toLocaleLowerCase()
      : item;

  // job-type filter
  const jobTypeFilter = (item) =>
    item.jobType !== undefined && jobTypeSelect !== ""
      ? item?.jobType.toLocaleLowerCase().split(" ").join("-") ===
          jobTypeSelect && item
      : item;

  // date-posted filter
  const datePostedFilter = (item) =>
    datePosted !== "all" && datePosted !== ""
      ? calculateTimeDistanceFromNow(item?.createdAt?.seconds)
          ?.toLocaleLowerCase()
          .split(" ")
          .join("-")
          .includes(datePosted)
      : item;

  // experience level filter
  const experienceFilter = (item) =>
    experienceSelect !== ""
      ? item?.experience?.split(" ").join("-").toLocaleLowerCase() ===
          experienceSelect && item
      : item;

  // salary filter
  const salaryFilter = (item) =>
    item?.totalSalary?.min >= salary?.min &&
    item?.totalSalary?.max <= salary?.max;

  // sort filter
  const sortFilter = (a, b) =>
    sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1;
  const calculateTimeDistanceFromNow = (timestampInSeconds) => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const timeDifferenceInSeconds = currentTimeInSeconds - timestampInSeconds;

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 365 * secondsInDay;

    if (timeDifferenceInSeconds < secondsInMinute) {
      return `${timeDifferenceInSeconds} seconds ago`;
    } else if (timeDifferenceInSeconds < secondsInHour) {
      const minutes = Math.floor(timeDifferenceInSeconds / secondsInMinute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifferenceInSeconds < secondsInDay) {
      const hours = Math.floor(timeDifferenceInSeconds / secondsInHour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifferenceInSeconds < secondsInMonth) {
      const days = Math.floor(timeDifferenceInSeconds / secondsInDay);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDifferenceInSeconds < secondsInYear) {
      const months = Math.floor(timeDifferenceInSeconds / secondsInMonth);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(timeDifferenceInSeconds / secondsInYear);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };
  const styleClass = (jobType) => {
    switch (jobType) {
      case "Full-Time":
      case "Part-Time":
      case "Contract/Freelance":
        return "time";
      case "Temporary":
      case "Internship":
        return "privacy";
      case "Remote/Telecommute":
        return "required";
    }
  };

  let content = jobData
    ?.filter(keywordFilter)
    // ?.filter(locationFilter)
    // ?.filter(destinationFilter)
    // ?.filter(categoryFilter)
    ?.filter(jobTypeFilter)
    ?.filter(datePostedFilter)
    // ?.filter(experienceFilter)
    // ?.filter(salaryFilter)
    // ?.sort(sortFilter)
    // .slice(perPage.start, perPage.end !== 0 ? perPage.end : 16)
    ?.map((item, index) => (
      <div className="job-block col-lg-6 col-md-12 col-sm-12" key={index}>
        <div className="inner-box">
          <div className="content">
            <span className="company-logo">
              <img src={item?.profile?.logoImage} alt="item brand" />
            </span>
            <h4>
              <Link
                href={{
                  pathname: "/job-single/[id]",
                  query: { id: item?.id },
                }}
              >
                {item?.jobTitle}
              </Link>
            </h4>

            <ul className="job-info">
              <li>
                <span className="icon flaticon-briefcase"></span>
                {item?.profile?.company_name}
              </li>
              {/* compnay info */}
              <li>
                <span className="icon flaticon-map-locator"></span>
                {item?.location?.address}
              </li>
              {/* location info */}
              <li>
                <span className="icon flaticon-clock-3"></span>
                {calculateTimeDistanceFromNow(item?.createdAt?.seconds)}
              </li>
              {/* time info */}
              <li>
                <span className="icon flaticon-money"></span> {item?.salary}
              </li>
              {/* salary info */}
            </ul>
            {/* End .job-info */}

            <ul className="job-other-info">
              <li className={`${styleClass(item.jobType)}`}>{item.jobType}</li>
            </ul>
            {/* End .job-other-info */}
            <BookmarkIcon jobId={item?.id} setLoading={setLoading} />
          </div>
        </div>
      </div>
      // End all jobs
    ));

  // sort handler
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  // per page handler
  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    dispatch(addPerPage(pageData));
  };

  // clear all filters
  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addCategory(""));
    dispatch(addJobTypeSelect(""));
    dispatch(addDatePosted(""));
    dispatch(addExperienceSelect(""));
    dispatch(addSalary({ min: 0, max: 20000 }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
  };
  return (
    <>
      <div className="ls-switcher">
        <JobSelect />
        {/* End .showing-result */}

        <div className="sort-by">
          {keyword !== "" ||
          location !== "" ||
          category !== "" ||
          jobTypeSelect !== "" ||
          datePosted !== "" ||
          experienceSelect !== "" ||
          salary?.min !== 0 ||
          salary?.max !== 20000 ||
          sort !== "" ||
          perPage.start !== 0 ||
          perPage.end !== 0 ? (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
            >
              Clear All
            </button>
          ) : undefined}

          <select
            value={sort}
            className="chosen-single form-select"
            onChange={sortHandler}
          >
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>
          {/* End select */}

          <select
            onChange={perPageHandler}
            className="chosen-single form-select ms-3 "
            value={JSON.stringify(perPage)}
          >
            <option
              value={JSON.stringify({
                start: 0,
                end: 0,
              })}
            >
              All
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 10,
              })}
            >
              10 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 20,
              })}
            >
              20 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 30,
              })}
            >
              30 per page
            </option>
          </select>
          {/* End select */}
        </div>
        {/* End sort by filter */}
      </div>
      {/* <!-- ls Switcher --> */}

      <div className="row">
        {/* {!!loading && <Loading />} */}

        {!!loading ? <Loading /> : content}
      </div>
      {/* End .row with jobs */}

      <Pagination />
      {/* <!-- End Pagination --> */}
    </>
  );
};

export default FilterJobBox;

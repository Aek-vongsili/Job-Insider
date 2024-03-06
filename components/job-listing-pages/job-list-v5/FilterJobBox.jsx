import Link from "next/link";
import jobs from "../../../data/job-featured";
import Pagination from "../components/Pagination";
import JobSelect from "../components/JobSelect";
import ReactLoading from "react-loading";
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
import { useRouter } from "next/router";
import { setLoading } from "../../../features/user/userSlice";
import {
  favouriteJobAdd,
  getFavouriteJob,
  jobReadData,
  removeFavouriteJob,
} from "../../../features/jobs/actionCreator";
import Swal from "sweetalert2";

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
  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });
  const dispatch = useDispatch();
  // const newFavoriteJobRef = doc(collection(db, `users/${useruid}/favoriteJob`));
  const [like, setLike] = useState(false);

  const favJobData = useSelector((state) => {
    return state.jobs.jobFavData;
  });
  useEffect(() => {
    dispatch(getFavouriteJob(userUid));
  }, [userUid, like]);
  useEffect(() => {
    const isJobFavorited = favJobData.some((job) => job.jobId === jobId);
    if (isJobFavorited) {
      setLike(true); // Set like to true if the job is favorited
    } else {
      setLike(false); // Set like to false if the job is not favorited
    }
  }, [jobId, favJobData]);
  const saveShow = async () => {
    if (!userUid) {
      alert("not login");
      return;
    } else {
      const isJobAlreadySaved = favJobData.some((job) => job.jobId === jobId);

      if (isJobAlreadySaved) {
        // If the job is already saved, remove it from favorites
        await dispatch(removeFavouriteJob(userUid, jobId));
        setLike(false); // Update the like state to false
      } else {
        // If the job is not saved, add it to favorites
        await dispatch(favouriteJobAdd(userUid, jobId));
        setLike(true); // Update the like state to true
      }
    }
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(jobReadData());
  }, [router]);

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
              {/* <li>
                <span className="icon flaticon-money"></span> {item?.salary}
              </li> */}
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

        {!!loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <ReactLoading type="bars" color="#1967d2" height={75} width={75} />
          </div>
        ) : (
          content
        )}
      </div>
      {/* End .row with jobs */}

      <Pagination />
      {/* <!-- End Pagination --> */}
    </>
  );
};

export default FilterJobBox;

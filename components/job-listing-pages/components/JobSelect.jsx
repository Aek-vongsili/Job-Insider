import { useDispatch, useSelector } from "react-redux";
import {
  addDatePosted,
  addEducationSelect,
  addExperienceSelect,
  addJobTypeSelect,
  addSalary,
} from "../../../features/filter/filterSlice";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { createUrl } from "../../../utils/createUrl";
import { useEffect } from "react";
export default function JobSelect() {
  const { jobList } = useSelector((state) => state.filter);
  const { jobTypeList, datePost, experienceLavel, educationList } = useSelector(
    (state) => state.job
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobType = searchParams.get("jobType");
  const education = searchParams.get("education");

  const createUrlSearchParam = (name, value) => {
    const filterSearchParams = new URLSearchParams(searchParams.toString());
    filterSearchParams.set(name, value);
    const newUrl = createUrl(pathname, filterSearchParams);
    return newUrl;
  };
  useEffect(() => {
    if (jobType) {
      dispatch(addJobTypeSelect(jobType));
    }
    if (education) {
      dispatch(addEducationSelect(education));
    }
  }, [jobType, education]);
  // job type handler
  const jobTypeHandler = (e) => {
    router.push(createUrlSearchParam("jobType", e.target.value), undefined, {
      scroll: false,
    });

    dispatch(addJobTypeSelect(e.target.value));
  };

  // date post handler
  const datePostHandler = (e) => {
    router.push(createUrlSearchParam("datePost", e.target.value), undefined, {
      scroll: false,
    });
    dispatch(addDatePosted(e.target.value));
  };

  // experience handler
  const experienceHandler = (e) => {
    dispatch(addExperienceSelect(e.target.value));
  };

  // salary handler
  const salaryHandler = (e) => {
    const data = JSON.parse(e.target.value);
    router.push(createUrlSearchParam("datePost", data), undefined, {
      scroll: false,
    });
    dispatch(addSalary(data));
  };
  const educationHandler = (e) => {
    router.push(createUrlSearchParam("education", e.target.value), undefined, {
      scroll: false,
    });

    dispatch(addEducationSelect(e.target.value));
  };
  return (
    <>
      <div className="showing-result">
        <div className="top-filters">
          <div className="form-group">
            <select
              onChange={jobTypeHandler}
              className="chosen-single form-select"
              value={jobList?.jobTypeSelect}
            >
              <option value="">Job Type</option>
              {jobTypeList?.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* End job type filter */}

          <div className="form-group">
            <select
              onChange={educationHandler}
              className="chosen-single form-select"
              value={jobList?.educationSelect}
            >
              <option value="">Education</option>
              {educationList?.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* End date posted filter */}

          <div className="form-group">
            <select
              onChange={experienceHandler}
              className="chosen-single form-select"
              value={jobList?.experienceSelect}
            >
              <option>Experience Level</option>
              {experienceLavel?.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* End ecperience level filter */}

          <div className="form-group">
            <select
              onChange={salaryHandler}
              className="chosen-single form-select"
              value={JSON.stringify(jobList.salary)}
            >
              <option
                value={JSON.stringify({
                  min: 0,
                  max: 20000,
                })}
              >
                Salary estimate
              </option>
              <option
                value={JSON.stringify({
                  min: 0,
                  max: 5000,
                })}
              >
                0 - 5000
              </option>
              <option
                value={JSON.stringify({
                  min: 5000,
                  max: 10000,
                })}
              >
                5000 - 10000
              </option>
              <option
                value={JSON.stringify({
                  min: 10000,
                  max: 15000,
                })}
              >
                10000 - 15000
              </option>
              <option
                value={JSON.stringify({
                  min: 15000,
                  max: 20000,
                })}
              >
                15000 - 20000
              </option>
            </select>
          </div>
          {/* End salary estimate filter */}
        </div>
      </div>
    </>
  );
}

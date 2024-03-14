import candidatesData from "../../../../../data/candidates";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Applicants from "./Applicants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { employerJobListRead } from "../../../../../features/employer/actionCreator";
import ReactLoading from "react-loading";
const WidgetContentBox = () => {
  const dispatch = useDispatch();
  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });
  const jobsData = useSelector((state) => {
    return state.employerSingle.jobData;
  });
  const jobLoading = useSelector((state) => {
    return state.employerSingle.jobLoading;
  });
  console.log(jobsData);
  useEffect(() => {
    dispatch(employerJobListRead(userUid));
  }, [userUid, dispatch]);
  return (
    <div className="widget-content">
      {jobLoading ? (
        <div
          style={{
            width: "100%",
            height: 250,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading type="bars" color="#1967d2" height={65} width={65} />
        </div>
      ) : (
        <div className="tabs-box">
          {jobsData?.map((item, index) => (
            <Tabs key={index}>
              <div className="aplicants-upper-bar">
                <h6>{item?.jobTitle}</h6>

                <TabList className="aplicantion-status tab-buttons clearfix">
                  <Tab className="tab-btn totals">
                    {" "}
                    Total(s) : {item?.applicants?.length}
                  </Tab>
                  <Tab className="tab-btn approved"> Approved: 2</Tab>
                  <Tab className="tab-btn rejected"> Rejected(s): 4</Tab>
                </TabList>
              </div>

              <div className="tabs-content">
                <TabPanel>
                  <div className="row">
                    {item?.applicants?.map((data, index) => (
                      <Applicants
                        data={data}
                        key={index}
                        appliedAt={data?.appliedAt}
                        jobId={item?.id}
                        applicantId={data?.id}
                      />
                    ))}
                  </div>
                </TabPanel>
                {/* End total applicants */}

                {/* End rejected applicants */}
              </div>
            </Tabs>
          ))}
        </div>
      )}
    </div>
  );
};

export default WidgetContentBox;

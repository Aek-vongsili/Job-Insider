import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import PostJobSteps from "./components/PostJobSteps";
import PostBoxForm from "./components/PostBoxForm";
import MenuToggler from "../../MenuToggler";
import { useFirebase } from "react-redux-firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

const index = () => {
  const [showPostBoxForm, setShowPostBoxForm] = useState(false);
  const firebase = useFirebase();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(""); // Default to 'basic'
  const [selectedPackageData, setSelectedPackageData] = useState(null); // State to hold selected package data
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });
  const handleContinueUsingQuota = (e) => {
    e.preventDefault();
    if (!selectedPackage) {
      setError("Please select a package before continuing.");
      return;
    }
    setShowPostBoxForm(true);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handlePackageChange = (event) => {
    setError("");
    const selectedPackage = event.target.value;

    setSelectedPackage(selectedPackage);

    // Find and set the data for the selected package
    const pkgData = data.find(
      (pkg) => pkg.package.toLowerCase() === selectedPackage
    );

    setSelectedPackageData(pkgData);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const firestore = firebase.firestore();
        const snapshot = await firestore
          .collection("employers")
          .doc(userUid)
          .get();
        if (snapshot.exists) {
          const fetchedData = [...snapshot.data()?.postQuotas];

          setData(fetchedData);
        } else {
          console.error("No such document!");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    if (userUid) {
      fetchData();
    }
  }, [firebase, userUid]);
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      {/* <DashboardHeader /> */}
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Post a New Job!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Post Job</h4>
                  </div>

                  <div className="widget-content">
                    {/* <PostJobSteps /> */}
                    {showPostBoxForm ? (
                      <PostBoxForm pkgData={selectedPackageData} />
                    ) : (
                      <form className="default-form">
                        <h5>Your Packages</h5>

                        <div className="row" style={{ marginTop: 40 }}>
                          {isLoading ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "200px",
                              }}
                            >
                              <ReactLoading
                                type="spin"
                                color="#1967d2"
                                height={50}
                                width={50}
                              />
                            </div>
                          ) : data?.length ? (
                            data.map((pkg, index) => (
                              <div
                                key={index}
                                className="form-group col-lg-12 col-md-12"
                              >
                                <label
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="package"
                                    value={pkg.package.toLowerCase()}
                                    style={{ marginRight: 10 }}
                                    onChange={handlePackageChange}
                                  />
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      marginRight: 10,
                                    }}
                                  >
                                    {capitalizeFirstLetter(pkg.package)}
                                  </span>
                                  <span>{`${pkg.postedJobs} jobs posted out of ${pkg.totalJobs}, listed for ${pkg.durationDays} days`}</span>
                                </label>
                              </div>
                            ))
                          ) : (
                            <div style={{ marginBottom: 50, fontSize: 18 }}>
                              Quota not found!
                            </div>
                          )}
                          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                          {/* Display error message */}
                          <div className="form-group col-lg-12 col-md-12">
                            <button
                              className="theme-btn btn-style-one"
                              onClick={handleContinueUsingQuota}
                            >
                              Continue using quota
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {/* End job steps form */}

                    {/* End post box form */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;

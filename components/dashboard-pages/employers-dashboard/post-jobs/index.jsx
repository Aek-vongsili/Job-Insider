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

  // Check if user is out of jobs for selected package
  const isOutOfJobs = (packageData) => {
    if (!packageData) return false;
    return packageData.postedJobs >= packageData.totalJobs;
  };

  // Get remaining jobs count
  const getRemainingJobs = (packageData) => {
    if (!packageData) return 0;
    return Math.max(0, packageData.totalJobs - packageData.postedJobs);
  };

  // Check if package has expired (optional - based on your business logic)
  const isPackageExpired = (packageData) => {
    if (!packageData || !packageData.createdAt) return false;
    const createdDate = new Date(packageData.createdAt.seconds * 1000);
    const expiryDate = new Date(createdDate.getTime() + (packageData.durationDays * 24 * 60 * 60 * 1000));
    return new Date() > expiryDate;
  };

  const handleContinueUsingQuota = (e) => {
    e.preventDefault();
    if (!selectedPackage) {
      setError("Please select a package before continuing.");
      return;
    }

    if (!selectedPackageData) {
      setError("Package data not found. Please try again.");
      return;
    }

    // Check if package has expired
    if (isPackageExpired(selectedPackageData)) {
      setError("This package has expired. Please purchase a new package or contact support.");
      return;
    }

    // Check if user is out of jobs
    if (isOutOfJobs(selectedPackageData)) {
      setError(`You have reached your job posting limit for the ${selectedPackageData.package} package (${selectedPackageData.postedJobs}/${selectedPackageData.totalJobs} jobs used). Please upgrade your package or wait for quota renewal.`);
      return;
    }

    console.log(selectedPackageData);
    console.log(`Remaining jobs: ${getRemainingJobs(selectedPackageData)}`);
    
    // Clear any previous errors and continue
    setError("");
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

  // Get status color based on quota usage
  const getQuotaStatusColor = (pkg) => {
    const usagePercentage = (pkg.postedJobs / pkg.totalJobs) * 100;
    if (usagePercentage >= 100) return "#e74c3c"; // Red for exhausted
    if (usagePercentage >= 80) return "#f39c12"; // Orange for almost exhausted
    return "#27ae60"; // Green for available
  };

  // Get status text
  const getQuotaStatusText = (pkg) => {
    if (isPackageExpired(pkg)) return "EXPIRED";
    if (isOutOfJobs(pkg)) return "QUOTA EXHAUSTED";
    const remaining = getRemainingJobs(pkg);
    return `${remaining} JOBS REMAINING`;
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

          // Auto-select first available package (not exhausted)
          if (fetchedData.length > 0) {
            const availablePackage = fetchedData.find(pkg => !isOutOfJobs(pkg) && !isPackageExpired(pkg));
            if (availablePackage) {
              setSelectedPackage(availablePackage.package.toLowerCase());
              setSelectedPackageData(availablePackage);
            }
          }
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
                                style={{
                                  border: `2px solid ${getQuotaStatusColor(pkg)}`,
                                  borderRadius: "8px",
                                  padding: "15px",
                                  marginBottom: "15px",
                                  backgroundColor: isOutOfJobs(pkg) || isPackageExpired(pkg) ? "#f8f9fa" : "transparent",
                                  opacity: isOutOfJobs(pkg) || isPackageExpired(pkg) ? 0.7 : 1
                                }}
                              >
                                <label
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: isOutOfJobs(pkg) || isPackageExpired(pkg) ? "not-allowed" : "pointer"
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="package"
                                    value={pkg.package.toLowerCase()}
                                    style={{ marginRight: 10 }}
                                    onChange={handlePackageChange}
                                    disabled={isOutOfJobs(pkg) || isPackageExpired(pkg)}
                                    checked={selectedPackage === pkg.package.toLowerCase()}
                                  />
                                  <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "16px",
                                          color: "#2c3e50"
                                        }}
                                      >
                                        {capitalizeFirstLetter(pkg.package)} Package
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "bold",
                                          color: getQuotaStatusColor(pkg),
                                          backgroundColor: `${getQuotaStatusColor(pkg)}20`,
                                          padding: "4px 8px",
                                          borderRadius: "4px"
                                        }}
                                      >
                                        {getQuotaStatusText(pkg)}
                                      </span>
                                    </div>
                                    <div style={{ marginTop: "8px", color: "#7f8c8d" }}>
                                      <span>{`${pkg.postedJobs} jobs posted out of ${pkg.totalJobs} • Listed for ${pkg.durationDays} days`}</span>
                                    </div>
                                    {/* Progress bar */}
                                    <div style={{ marginTop: "8px" }}>
                                      <div style={{
                                        width: "100%",
                                        height: "6px",
                                        backgroundColor: "#ecf0f1",
                                        borderRadius: "3px",
                                        overflow: "hidden"
                                      }}>
                                        <div style={{
                                          width: `${Math.min((pkg.postedJobs / pkg.totalJobs) * 100, 100)}%`,
                                          height: "100%",
                                          backgroundColor: getQuotaStatusColor(pkg),
                                          transition: "width 0.3s ease"
                                        }} />
                                      </div>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            ))
                          ) : (
                            <div style={{ marginBottom: 50, fontSize: 18 }}>
                              Quota not found!
                            </div>
                          )}
                          
                          {error && (
                            <div className="col-lg-12">
                              <div style={{ 
                                color: "#e74c3c", 
                                backgroundColor: "#ffeaea",
                                border: "1px solid #e74c3c",
                                borderRadius: "4px",
                                padding: "12px",
                                marginBottom: "20px"
                              }}>
                                <strong>⚠️ {error}</strong>
                              </div>
                            </div>
                          )}

                          {/* Show selected package summary */}
                          {selectedPackageData && !error && (
                            <div className="col-lg-12">
                              <div style={{
                                backgroundColor: "#e8f5e8",
                                border: "1px solid #27ae60",
                                borderRadius: "4px",
                                padding: "12px",
                                marginBottom: "20px"
                              }}>
                                <strong>✓ Selected: {capitalizeFirstLetter(selectedPackageData.package)} Package</strong>
                                <br />
                                <span style={{ color: "#27ae60" }}>
                                  You have {getRemainingJobs(selectedPackageData)} job posting(s) remaining.
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="form-group col-lg-12 col-md-12">
                            <button
                              className="theme-btn btn-style-one"
                              onClick={handleContinueUsingQuota}
                              disabled={!selectedPackage || isLoading}
                              style={{
                                opacity: (!selectedPackage || isLoading) ? 0.6 : 1,
                                cursor: (!selectedPackage || isLoading) ? "not-allowed" : "pointer"
                              }}
                            >
                              {isLoading ? "Loading..." : "Continue using quota"}
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
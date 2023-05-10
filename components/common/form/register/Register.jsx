import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoginWithSocial from "./LoginWithSocial";
import Form from "./FormContent";
import { useState } from "react";
import Link from "next/link";

const Register = () => {
  const [userType,setUserType] = useState("Candidate")
  return (
    <div className="form-inner">
      <h3>Create a Job Insider Account</h3>

      <Tabs defaultIndex={0} onSelect={(index) =>(index===0?setUserType("Candidate"):setUserType("Employer"))}>
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Candidate
              </button>
            </Tab>

            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-briefcase"></i> Employer
              </button>
            </Tab>
          </TabList>
        </div>
        {/* End .form-group */}

        <TabPanel>
          <Form userType={userType}/>
        </TabPanel>
        {/* End cadidates Form */}

        <TabPanel>
          <Form userType={userType}/>
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}
      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link
            href="/login"
            // className="call-modal signup"
            // data-bs-dismiss="modal"
            // data-bs-target="#registerModal"
            // data-bs-toggle="modal"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="bottom-box">
        <div className="divider">
          <span>or</span>
        </div>
        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default Register;

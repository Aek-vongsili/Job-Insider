import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import Image from "next/image";
import Link from "next/link";
import ReactLoading from "react-loading";
const VerifyEmail = ({ actionCode }) => {
  const firebase = useFirebase();
  const [isVerified, setIsVerified] = useState(false); // State to track verification status
  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await firebase.auth().applyActionCode(actionCode);
        setIsVerified(true); // Set verification status to true
      } catch (error) {
        console.error("Error verifying email:", error.message);
        setIsVerified(false); // Set verification status to false
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    if (actionCode) {
      verifyEmail();
    }
  }, [actionCode, firebase]);

  return (
    <div
      className="error-page-wrapper"
      style={{ backgroundImage: `url(/images/404.jpg)` }}
    >
      <div className="content">
        <div className="logo">
          <Link href="/">
            <Image
              src="/images/HUBJOB_LOGO_BLUE.svg"
              alt="brand"
              width={150}
              height={150}
            />
          </Link>
        </div>
        {/* End logo */}
        <section className="order-confirmation">
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <ReactLoading
                type="bars"
                color="#1967d2"
                height={100}
                width={100}
              />
            </div>
          ) : isVerified ? (
            <div className="auto-container">
              <div className="upper-box">
                <span className="icon fa fa-check"></span>
                <h4>Your Email has been verified!</h4>
                <div className="text">You can now login</div>
              </div>
              <Link
                className="theme-btn btn-style-three call-modal"
                href="/login"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="auto-container">
              <div className="upper-box">
                <span className="icon fa fa-times"></span>
                <h4>Error verifying email. Please try again.</h4>
              </div>
              <Link className="theme-btn btn-style-three call-modal" href="/">
                BACK TO HOME
              </Link>
            </div>
          )}
        </section>
      </div>
      {/* End .content */}
    </div>
  );
};

export default VerifyEmail;

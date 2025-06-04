import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
const ResetPassword = ({ actionCode }) => {
  const firebase = useFirebase();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const verifyResetCode = async () => {
      try {
        const email = await firebase.auth().verifyPasswordResetCode(actionCode);
        setIsLoading(false);
        setIsVerified(true); // Update state to indicate verification success
      } catch (error) {
        console.error("Error verifying reset code:", error);
        setIsLoading(false);
        // Handle error or set state to false if verification fails
        setIsVerified(false);
      }
    };

    verifyResetCode(); // Call the verification function on component mount
  }, [actionCode]);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === confirmPassword) {
        if (newPassword.length < 8) {
          setErrorMessage("Password must be at least 8 characters");
        } else {
          await firebase.auth().confirmPasswordReset(actionCode, newPassword);
          Swal.fire({
            icon: 'success',
            title: 'Password Reset Successful',
            text: 'Your password has been successfully reset.',
            confirmButtonText: 'OK',
          });

        }
      } else {
        setErrorMessage("Passwords do not match");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle error if password reset fails
    }
  };
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ReactLoading type="bars" color="#1967d2" height={100} width={100} />
      </div>
    );
  }
  return (
    <div
      className="error-page-wrapper"
      style={{ backgroundImage: `url(/images/404.jpg)` }}
    >
      <div className="content">
        <div className="logo">
          <Link href="/">
            <Image
              src="/images/HUBJOB LOGO_BLUE.svg"
              alt="brand"
              width={150}
              height={150}
              priority
            />
          </Link>
        </div>
        {/* End logo */}
        {!isVerified ? (
          <section className="order-confirmation">
            {" "}
            <div className="auto-container">
              <div className="upper-box">
                <span className="icon fa fa-times"></span>
                <h4>Somethings went wrong or reset password link is expired</h4>
              </div>
              <Link className="theme-btn btn-style-three call-modal" href="/">
                BACK TO HOME
              </Link>
            </div>
          </section>
        ) : (
          <div className="outer-box" style={{ width: "450px",padding:50 }}>
            {/* <!-- Login Form --> */}
            <div className="login-form default-form">
              <div className="form-inner">
                <form action="" onSubmit={handleChangePassword}>
                  <div className="form-group">
                    <label style={{ display: "flex", padding: "10px" }}>
                      New password
                    </label>
                    <input
                      type="text"
                      name="new_password"
                      placeholder="New password"
                      required
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: "flex", padding: "10px" }}>
                      Confirm new password
                    </label>
                    <input
                      type="text"
                      name="confirm_password"
                      placeholder="Confirm new password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                     {errorMessage && <p className="err-message">{errorMessage}</p>}
                  </div>
                  <div className="form-group">
                    <button
                      className="theme-btn btn-style-one"
                      type="submit"
                      name="log-in"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <!--End Login Form --> */}
          </div>
        )}

        {/* {isLoading ? (
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
          )} */}
      </div>
      {/* End .content */}
    </div>
  );
};

export default ResetPassword;

import ForgotPasswordForm from "../../common/form/login/ForgotPasswordForm";

import LoginPopup from "../../common/form/login/LoginPopup";
import MobileMenu from "../../header/MobileMenu";
import Header from "./Header";

const ForgotPassword = () => {
  return (
    <>
      <Header />
      {/* <!--End Main Header -->  */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <MobileMenu />
      {/* End MobileMenu */}

      <div className="login-section">
        <div
          className="image-layer"
          style={{ backgroundImage: "url(images/background/12.jpg)" }}
        ></div>
        <div className="outer-box">
          {/* <!-- Login Form --> */}
          <div className="login-form default-form">
            <ForgotPasswordForm />
          </div>
          {/* <!--End Login Form --> */}
        </div>
      </div>
      {/* <!-- End Info Section --> */}
    </>
  );
};

export default ForgotPassword;

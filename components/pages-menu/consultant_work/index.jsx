import React from "react";
import MobileMenu from "../../header/MobileMenu";
import LoginPopup from "../../common/form/login/LoginPopup";
import Breadcrumb from "../../common/Breadcrumb";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      {/* <DefaulHeader /> */}
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="Consultant work" meta="Consultant" />
      {/* <!--End Page Title--> */}

      {/* <!-- End Pricing Section --> */}

      {/* <FooterDefault footerStyle="alternate5" /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;

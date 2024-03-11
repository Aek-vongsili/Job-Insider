import Breadcrumb from "../../common/Breadcrumb";
import LoginPopup from "../../common/form/login/LoginPopup";
import MobileMenu from "../../header/MobileMenu";
import Customprice from "../../pricing/Customprice";
import Pricing from "../../pricing/Pricing";
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

      <Breadcrumb title="Pricing" meta="Pricing" />
      {/* <!--End Page Title--> */}
      <section className="pricing-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Job posting</h2>
            <div className="text">
            </div>
          </div>
          {/* End title */}
          <Customprice />
          {/* End .{/* <!--Pricing Tabs--> */}
        </div>
      </section>

      <section className="pricing-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Price Package</h2>
            <div className="text">
            </div>
          </div>
          {/* End title */}
          <Pricing />
          {/* End .{/* <!--Pricing Tabs--> */}
        </div>
      </section>
      {/* <!-- End Pricing Section --> */}

      {/* <FooterDefault footerStyle="alternate5" /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;

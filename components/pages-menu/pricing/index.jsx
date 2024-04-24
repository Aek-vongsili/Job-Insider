import { useLayoutEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import LoginPopup from "../../common/form/login/LoginPopup";
import MobileMenu from "../../header/MobileMenu";
import Customprice from "../../pricing/Customprice";
import Pricing from "../../pricing/Pricing";
const index = () => {
  const [tabId, setTabId] = useState(1);
  const [sticky, setSticky] = useState(false);
  const [tabs, setTab] = useState([
    { id: 1, name: "Job posting", isActive: true },
    { id: 2, name: "Banner", isActive: false },
    { id: 3, name: "Facebook", isActive: false },
  ]);
  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 190) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const tabHandler = (id) => {
    // Update active tab state
    setTab((oldTabs) =>
      oldTabs.map((tab) => ({
        ...tab,
        isActive: tab.id === id, // Set isActive to true for the clicked tab
      }))
    );

    // Scroll to the corresponding section
    const section = document.getElementById(id); // Use id directly since it matches the section id
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    // Set the id of the clicked tab
    setTabId(id);
  };
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
      <div style={{ marginTop: 40 }} className={`tab-buttons-wrap`}>
        <ul className="tab-buttons -pills-condensed -blue">
          {tabs?.map((tab) => (
            <li
              onClick={() => tabHandler(tab.id)}
              key={tab.id}
              className={`${tab.isActive ? "active-btn" : ""} tab-btn`}
              style={{ cursor: "pointer" }}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

      <section className="pricing-section" id="1">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Job posting</h2>
            <div className="text"></div>
          </div>
          {/* End title */}
          <Customprice />
          {/* End .{/* <!--Pricing Tabs--> */}
        </div>
      </section>
      <section className="pricing-section" id="2">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Banner</h2>
            <div className="text"></div>
          </div>
          {/* End title */}
          <Customprice />
          {/* End .{/* <!--Pricing Tabs--> */}
        </div>
      </section>

      <section className="pricing-section" id="3">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Job post / member</h2>
            <div className="text"></div>
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

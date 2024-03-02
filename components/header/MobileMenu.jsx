import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import { useSelector } from "react-redux";

const MobileMenu = () => {
  const isLogin = useSelector((state) => state.user.isLoggedIn);
  const role = useSelector(state =>state.user.role)
  const RolePath = ()=>{
    switch(role){
      case "Employer":
        return "/employers-dashboard/dashboard"
      case "Candidate":
        return "/candidates-dashboard/dashboard"
      default:
        return "/"
    }
  }
  return (
    // <!-- Main Header-->
    <header className="main-header main-header-mobile">
      <div className="auto-container" style={{height:100,display:"grid"}}>
        {/* <!-- Main box --> */}
        <div className="inner-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <img src="/images/Artboard 6.svg" alt="brand" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <MobileSidebar />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div className="login-box">
              {isLogin ? (
                <Link
                  href={RolePath()}
                  className="call-modal"
                //   data-bs-toggle="modal"
                //   data-bs-target="#loginPopupModal"
                >
                  <span className="icon icon-user"></span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="theme-btn btn-style-three call-modal login-btn"
                  // data-bs-toggle="modal"
                  // data-bs-target="#loginPopupModal"
                >
                  Login / Register
                </Link>
              )}
            </div>
            {/* login popup end */}

            <a
              href="#"
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span className="flaticon-menu-1"></span>
            </a>
            {/* right humberger menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;

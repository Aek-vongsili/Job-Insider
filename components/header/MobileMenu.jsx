import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import { useSelector } from "react-redux";
import candidatesMenuData from "../../data/candidatesMenuData";
import employerMenuData from "../../data/employerMenuData";
import { useMemo } from "react";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useRouter } from "next/router";

const MobileMenu = () => {
  const router = useRouter();
  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });
  const role = useSelector((state) => state.auth.role);
  const RolePath = () => {
    switch (role) {
      case "Employer":
        return "/employers-dashboard/dashboard";
      case "Candidate":
        return "/candidates-dashboard/dashboard";
      default:
        return "/";
    }
  };
  const checkRole = (role) => {
    switch (role) {
      case "Candidate":
        return candidatesMenuData;
      case "Employer":
        return employerMenuData;
      default:
        return candidatesMenuData;
    }
  };
  const menuData = useMemo(() => checkRole(role), [role]);
  return (
    // <!-- Main Header-->
    <header className="main-header main-header-mobile">
      <div className="auto-container" style={{ height: 100, display: "grid" }}>
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
              {userUid ? (
                <div className="dropdown dashboard-option">
                  <a
                    className="icon icon-user"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></a>

                  <ul className="dropdown-menu slideDown">
                    {menuData?.map((item) => (
                      <li
                        className={`${
                          isActiveLink(item.routePath, router.asPath)
                            ? "active"
                            : ""
                        } mb-1`}
                        key={item.id}
                      >
                        <Link href={item.routePath}>
                          <i className={`la ${item.icon}`}></i> {item.name}
                        </Link>
                      </li>
                    ))}
                    {/* <li
                      className={`${
                        isActiveLink("", router.asPath) ? "active" : ""
                      } mb-1`}
                    >
                      <a onClick={Logout}>
                        <i className={`la la-sign-out`}></i> Log out
                      </a>
                    </li> */}
                  </ul>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="theme-btn btn-style-three call-modal login-btn"
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

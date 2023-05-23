import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import HeaderNavContent from "../header/HeaderNavContent";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUser } from "../../features/user/userSlice";
import axios from "axios";
import Cookies from "js-cookie";
const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();
  const isLogin = useSelector((state) => state.user.isLoggedIn);
  const coo = Cookies.get()
  console.log(coo)
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const dispatch = useDispatch();
  const Logout = async () => {
    try {
      await signOut(auth);
      console.log("You are Log out");
      await axios.get("/api/logout");
      router.push("/");
    } catch (err) {
      console.log(err);
    }

    // const rs = await axios.get("/api/logout");
    // console.log(rs);
  };
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setLogout());
      }
    });
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-style-four -type-16 ${
        router.pathname === "/"
          ? navbar
            ? "fixed-header animated slideInDown"
            : ""
          : navbar
          ? "fixed-header animated slideInDown"
          : "fixed-header"
      }`}
    >
      <div className="container-fluid">
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <img
                    src="/images/Job_Insider_JI3.png"
                    alt="brand"
                    style={{ width: "10rem" }}
                  />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            {/* <!-- Login/Register --> */}
            {isLogin ? (
              <div
                className="dropdown dashboard-option"
                style={{ width: "200px" }}
              >
                <a
                  className="dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Image
                    alt="avatar"
                    className="thumb"
                    src="/images/resource/company-6.png"
                    width={50}
                    height={50}
                  />
                  <span className="name" style={{ color: "white" }}>
                    My Account
                  </span>
                </a>

                <ul className="dropdown-menu">
                  {employerMenuData.map((item) => (
                    <li
                      className={`${
                        isActiveLink(item.routePath, router.asPath)
                          ? "active"
                          : ""
                      } mb-1`}
                      key={item.id}
                    >
                      {item.id === 11 ? (
                        <a onClick={Logout}>
                          <i className={`la ${item.icon}`}></i> {item.name}
                        </a>
                      ) : (
                        <Link href={item.routePath}>
                          <i className={`la ${item.icon}`}></i> {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="btn-box">
                <Link
                  href="/login"
                  className="theme-btn btn-style-six call-modal"
                  // data-bs-toggle="modal"
                  // data-bs-target="#loginPopupModal"
                >
                  Login / Register
                </Link>
                <Link
                  href="/employers-dashboard/post-jobs"
                  className="theme-btn btn-style-five"
                >
                  Job Post
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* <!-- Main box --> */}
      </div>
    </header>
  );
};

export default Header;

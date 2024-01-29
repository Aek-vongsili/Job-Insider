import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import candidatesMenuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import HeaderNavContent from "../header/HeaderNavContent";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/clientApp";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUser, setRole } from "../../features/user/userSlice";

import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import {
  setCompanyData,
  setCompanySignOut,
} from "../../features/employer/employerProfile";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();
  const isLogin = useSelector((state) => state.user.isLoggedIn);
  const role = useSelector((state) => state.user.role);
  const userUid = useSelector((state) => state.user?.user?.uid);
  const employerImg = useSelector(
    (state) => state.employerProfile?.company_info
  );
  const userImage = () => {
    switch (role) {
      case "Employer":
        return employerImg?.logoImage;
    }
  };
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const dispatch = useDispatch();
  // const ssrDispatch =  useAppDispatch()
  const Logout = async () => {
    try {
      await signOut(auth);
      await axios.get("/api/logout");
      router.push("/");
    } catch (err) {
      console.log(err);
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
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        user
          .getIdToken(true)
          .then((token) => {
            axios
              .post("/api/jwt", { token: token })
              .then((rs) => {
                console.log(rs);
              })
              .catch((err) => {
                alert(err);
              });
          })
          .catch(async (err) => {
            console.log(err);
            await Logout();
          });
        // let {stsTokenManager,accessToken,auth,...newUser} = user
        // delete user.stsTokenManager
        let newUser = { ...user };
        delete newUser.stsTokenManager;
        delete newUser.auth;
        delete newUser.accessToken;

        dispatch(setUser(newUser));
      } else {
        dispatch(setLogout());
        dispatch(setCompanySignOut());
      }
    });
    return () => unsubscribe();
  }, [router]);
  useEffect(() => {
    const companyProfile = async () => {
      try {
        if (userUid) {
          const collectionRef = doc(db, "employers", userUid);
          const docSnap = await getDoc(collectionRef);
          if (docSnap.exists()) {
            if (docSnap.data().profile) {
              dispatch(setCompanyData(docSnap.data().profile));
            }
          }
        }
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    };
    companyProfile();
  }, [router]);
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
                    src="/images/Artboard 6 white.svg"
                    alt="brand"
                    style={{ width: "9rem" }}
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
                  <div className="thumb">
                    <Image
                      alt="avatar"
                      src={userImage() || "/images/resource/company-6.png"}
                      width={50}
                      height={50}
                    />
                  </div>

                  <span className="name" style={{ color: "white" }}>
                    My Account
                  </span>
                </a>

                <ul className="dropdown-menu">
                  {checkRole(role)?.map((item) => (
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
                  <li
                    className={`${
                      isActiveLink("", router.asPath) ? "active" : ""
                    } mb-1`}
                  >
                    <a onClick={Logout}>
                      <i className={`la la-sign-out`}></i> Log out
                    </a>
                  </li>
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

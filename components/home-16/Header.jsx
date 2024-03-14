import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import candidatesMenuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import HeaderNavContent from "../header/HeaderNavContent";
import { useDispatch, useSelector } from "react-redux";
import { fbAuthLogout, fbLoginCheck } from "../../features/auth/actionCreator";
import { candidateProfileData } from "../../features//candidates/actionCreator";
import { employersProfileData } from "../../features/employer/actionCreator";
import { useFirebase } from "react-redux-firebase";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const [image, setImage] = useState(undefined);
  const candidateData = useSelector((state) => {
    return state.candidateSingle.data;
  });
  const employerSingle = useSelector((state) => {
    return state.employerSingle.data;
  });
  const role = useSelector((state) => {
    return state.auth.role;
  });
  const isLogin = useSelector((state) => {
    return state.auth.login;
  });
  const userUid = useSelector((state) => {
    return state.firebase.auth.uid;
  });

  useEffect(() => {
    const db = firebase.firestore();
    const usersRef = db.collection("candidates");

    const updateUserImage = () => {
      switch (role) {
        case "Employer":
          setImage(employerSingle?.profile?.logoImage);
          break;
        case "Candidate":
          setImage(candidateData?.profile?.profileImage);
          break;
        default:
          setImage(undefined);
      }
    };

    const unsubscribe = usersRef.onSnapshot((snapshot) => {
      // Update image based on role
      updateUserImage();
    });

    return () => {
      // Unsubscribe from Firestore changes when component unmounts or dependencies change
      unsubscribe();
    };
  }, [role, employerSingle, candidateData, dispatch]);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(fbLoginCheck());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  const fetchProfileData = useCallback(() => {
    if (role === "Candidate") {
      dispatch(candidateProfileData(userUid));
    } else if (role === "Employer") {
      dispatch(employersProfileData(userUid));
    }
  }, [dispatch, role, userUid]);

  useEffect(() => {
    fetchProfileData(); // Call the memoized function
  }, [fetchProfileData]);

  const Logout = async () => {
    try {
      await dispatch(fbAuthLogout(() => router.push("/")));
    } catch (error) {
      // Handle any errors here
      console.error("Logout error:", error);
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
    <header className="main-header header-style-four -type-16 fixed-header">
      <div className="container-fluid">
        <div className="main-box" style={{ height: "100px" }}>
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <img
                    src="/images/HUBJOB_LOGO_WHITE.svg"
                    alt="brand"
                    style={{ width: "6.5rem" }}
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
            {!!isLogin ? (
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
                      className="fill-image"
                      src={image || "/images/resource/company-6.png"}
                      width={50}
                      height={50}
                      quality={100}
                    />
                  </div>

                  <span className="name" style={{ color: "white" }}>
                    My Account
                  </span>
                </a>

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

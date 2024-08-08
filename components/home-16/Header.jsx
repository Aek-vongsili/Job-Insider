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
  const userImage = (role) => {
    switch (role) {
      case "Employer":
        return employerSingle?.profile?.logoImage;
      case "Candidate":
        return candidateData?.profile?.profileImage;
      default:
        // Handle default case or return early if necessary
        return "/images/resource/company-6.png";
    }
  };
  // useEffect(() => {
  //   if (!role || !userUid) {
  //     return; // If role or currentUser is not available, return early
  //   }
  //   const db = firebase.firestore();
  //   let userDocRef;

  //   // Get the correct document reference based on the user's role
  //   switch (role) {
  //     case "Employer":
  //       userDocRef = db.collection("employers").doc(userUid);
  //       break;
  //     case "Candidate":
  //       userDocRef = db.collection("candidates").doc(userUid);
  //       break;
  //     default:
  //       // Handle default case or return early if necessary
  //       return;
  //   }

  //   // Subscribe to the user document snapshot
  //   const unsubscribe = userDocRef.onSnapshot((doc) => {
  //     // Update image based on role
  //     setImage(
  //       doc.data()?.profile?.logoImage ||
  //         doc.data()?.profile?.profileImage ||
  //         undefined
  //     );
  //   });

  //   return () => {
  //     // Unsubscribe from Firestore changes when component unmounts or dependencies change
  //     unsubscribe();
  //   };
  // }, [role, userUid]);
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
              <div className="logo" style={{ width: "13rem" }}>
                <Link href="/">
                  <img
                    src="/images/HUBJOB LOGO_WHITE.svg"
                    alt="brand"
                    
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
                      src={userImage(role) || "/images/resource/company-6.png"}
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
                <Link href="/login" className="theme-btn btn-style-five">
                  Login / Register
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

import Link from "next/link";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
// import { auth } from "../../firebase/clientApp";
import axios from "axios";
import { signOut } from "firebase/auth";

const DashboardEmployerSidebar = () => {
  const router = useRouter();
  const { menu } = useSelector((state) => state.toggle);

  const dispatch = useDispatch();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };
  const handleLogout = async () => {
    // try {
    //   await signOut(auth);
    //   await axios.get("/api/logout");

    //   router.push("/");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {employerMenuData.map((item) => (
            <li
              className={`${
                isActiveLink(item.routePath, router.asPath) ? "active" : ""
              } mb-1`}
              key={item.id}
              onClick={menuToggleHandler}
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
            onClick={handleLogout}
          >
            <Link href="" onClick={handleLogout}>
              <i className="la la-sign-out"></i> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;

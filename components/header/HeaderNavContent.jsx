import Link from "next/link";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import menuData from "../../data/menuData";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const HeaderNavContent = () => {
  const router = useRouter();
  const role = useSelector((state) => {
    return state.auth.role;
  });
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}

          {menuData
            .filter((item) => {
              if (role === "Candidate" && item.label === "Candidates") {
                return false; // Exclude "Candidates" tab for candidates
              } else if (role === "Employer" && item.label === "Employers") {
                return false; // Exclude "Employers" tab for employers
              } else {
                return true; // Include all other menu items
              }
            })
            .map((item) => (
              <li key={item.id}>
                <Link href={item.routePath}>
                  {" "}
                  <span
                    className={`${
                      isActiveLink(item.routePath, router.asPath)
                        ? "current"
                        : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;

import Link from "next/link";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { useRouter } from "next/router";

const HeaderNavContent = () => {
  const router = useRouter();

  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li>
            <Link href={"/"}>
              <span style={router.pathname === "/" ? { color: "#1967d2" } : {}}>
                Home
              </span>
            </Link>
            {/* <div className="mega-menu">
                            <div className="mega-menu-bar row pt-0">
                                {homeItems.map((item) => (
                                    <div
                                        className="column col-lg-3 col-md-3 col-sm-12"
                                        key={item.id}
                                    >
                                        <ul>
                                            {item.items.map((menu, i) => (
                                                <li
                                                    className={
                                                        isActiveLink(
                                                            menu.routePath,
                                                            router.asPath
                                                        )
                                                            ? "current"
                                                            : ""
                                                    }
                                                    key={i}
                                                >
                                                    <Link href={menu.routePath}>
                                                        {menu.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div> */}
          </li>
          {/* End homepage menu items */}

          <li
            className={`${
              isActiveParent(findJobItems, router.asPath) ? "current" : ""
            }`}
            id="has-mega-menu"
          >
            <Link href={"/job-list"}>
              <span
                style={
                  router.pathname === "/job-list" ? { color: "#1967d2" } : {}
                }
              >
                Find Jobs
              </span>
            </Link>

            {/* <div className="mega-menu">
              <div className="mega-menu-bar row">
                {findJobItems.map((item) => (
                  <div
                    className="column col-lg-3 col-md-3 col-sm-12"
                    key={item.id}
                  >
                    <h3>{item.title}</h3>
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, router.asPath)
                              ? "current"
                              : ""
                          }
                          key={i}
                        >
                          <Link href={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div> */}
          </li>
          {/* End findjobs menu items */}

          <li>
            <Link href="/employers-list">
              <span
                style={
                  router.pathname === "/employers-list"
                    ? { color: "#1967d2" }
                    : {}
                }
              >
                Employers
              </span>
            </Link>
          </li>
          {/* End Employers menu items */}

          <li
            className={
              isActiveParent(candidateItems, router.asPath) ||
              router.asPath === "/candidates-dashboard/dashboard"
                ? "current"
                : ""
            }
          >
            <Link href="/candidates-list">
              <span style={
                  router.pathname === "/candidates-list"
                    ? { color: "#1967d2" }
                    : {}
                }>Candidates</span>
            </Link>
            
            {/* <ul>
              {candidateItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, router.asPath)
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, router.asPath)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link href={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li
                className={
                  router.asPath === "/candidates-dashboard/dashboard"
                    ? "current"
                    : ""
                }
              >
                <Link href="/candidates-dashboard/dashboard">
                  Candidates Dashboard
                </Link>
              </li>
            </ul> */}
          </li>
          {/* End Candidates menu items */}

          {/* <li
            className={`${
              isActiveParentChaild(blogItems, router.asPath) ? "current" : ""
            } dropdown`}
          >
            <span>Blog</span>
            <ul>
              {blogItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, router.asPath) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> */}
          {/* End Blog menu items */}

          {/* <li
            className={`${
              isActiveParentChaild(pageItems, router.asPath) ||
              isActiveParentChaild(shopItems[0].items, router.asPath)
                ? "current "
                : ""
            } dropdown`}
          >
            <span>Pages</span>
            <ul>
              {shopItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={`${
                      isActiveParentChaild(shopItems[0].items, router.asPath)
                        ? "current "
                        : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, router.asPath)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link href={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              {pageItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, router.asPath) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> */}
          <li>
            <Link href={"/about"}>
              <span
                className={
                  isActiveLink(pageItems[0].routePath, router.asPath)
                    ? "current"
                    : ""
                }
              >
                About
              </span>
            </Link>
          </li>
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;

"use client";
import Link from "next/link";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import mobileMenuData from "../../../data/mobileMenuData";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveLink,
  isActiveParentChaild,
} from "../../../utils/linkActiveChecker";
import { useRouter } from "next/router";
import mobileMenuData2 from "../../../data/mobileMenuData2";
// import { auth } from "../../../firebase/clientApp";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const Index = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    // await axios.get("/api/logout");
    // auth
    //   .signOut()
    //   .then((rs) => {
    //     window.location.reload();
    //     router.push("/");
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };
  const isLogin = useSelector((state) => state.user.isLoggedIn);

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}

      <ProSidebarProvider>
        <Sidebar>
          <Menu>
            {mobileMenuData2.map((item) => (
              <MenuItem
                className={
                  isActiveLink(item.routePath, router.asPath)
                    ? "menu-active"
                    : ""
                }
                key={item.id}
                routerLink={<Link href={item.routePath} />}
              >
                {item.label}
              </MenuItem>
            ))}
            {isLogin && <MenuItem onClick={handleSignOut}>Log out</MenuItem>}
          </Menu>
        </Sidebar>
      </ProSidebarProvider>

      <SidebarFooter />
    </div>
  );
};

export default Index;

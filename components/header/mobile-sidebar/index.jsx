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

const Index = () => {
    const router = useRouter();

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
                                    isActiveLink(
                                        item.routePath,
                                        router.asPath
                                    )
                                        ? "menu-active"
                                        : ""
                                }
                                
                                key={item.id}
                                routerLink={
                                    <Link href={item.routePath} />
                                }
                            >
                                {item.label}
                                {/* {item.items.map((menuItem, i) => (
                                    <MenuItem
                                        className={
                                            isActiveLink(
                                                menuItem.routePath,
                                                router.asPath
                                            )
                                                ? "menu-active-link"
                                                : ""
                                        }
                                        key={i}
                                        routerLink={
                                            <Link href={menuItem.routePath} />
                                        }
                                    >
                                        {menuItem.name}
                                    </MenuItem>
                                ))} */}
                            </MenuItem>
                        ))}
                    </Menu>
                </Sidebar>
            </ProSidebarProvider>

            <SidebarFooter />
        </div>
    );
};

export default Index;

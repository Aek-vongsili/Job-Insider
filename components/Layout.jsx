import React from "react";
import Footer from "./home-16/Footer";
import Header from "./home-16/Header";
import { useRouter } from "next/router";

const Layout = ({ children,authPage = false }) => {
  const router = useRouter()
  return (
    <div>
      <Header />
        {children}
      {!authPage && <Footer />}
    </div>
  );
};

export default Layout;

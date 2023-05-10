import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProtectRoute = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();
    const user = useSelector((state) => state.user.user);
    const [loading,setLoading] = useState(true)
    useEffect(() => {
      if(user) {
        router.replace("/");
      }
    },[user]);
    // if(loading){
    //     return <h1>Loading...</h1>
    // }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default ProtectRoute;

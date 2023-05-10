import { signInWithEmailAndPassword } from "firebase/auth";
import Register from "../register/Register";
import FormContent from "./FormContent";
import { auth } from "../../../../firebase/clientApp";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginPopup = () => {
  const router = useRouter()
  const [isLoginSuccess,setIsLoginSuccess] = useState(true)
  const handleSignIn = (email,password)=>{
    try{
      signInWithEmailAndPassword(auth,email,password)
      .then(result=>{
        setIsLoginSuccess((prevLoggedIn) => !prevLoggedIn)
        console.log(result);
        router.push("/")
      })
     
      
    }catch(err){
      console.log(err);
      setIsLoginSuccess(false)
    }
  }
  return (
    <>
      <div className="modal fade" id="loginPopupModal">
        <div className="modal-dialog modal-lg modal-dialog-centered login-modal modal-dialog-scrollable">
          <div className="modal-content">
            <button
              type="button"
              className="closed-modal"
              data-bs-dismiss="modal"
            ></button>
            {/* End close modal btn */}

            <div className="modal-body">
              {/* <!-- Login modal --> */}
              <div id="login-modal">
                {/* <!-- Login Form --> */}
                <div className="login-form default-form">
                  <FormContent handleSignIn={handleSignIn} isLoginSuccess={isLoginSuccess}/>
                </div>
                {/* <!--End Login Form --> */}
              </div>
              {/* <!-- End Login Module --> */}
            </div>
            {/* En modal-body */}
          </div>
          {/* End modal-content */}
        </div>
      </div>
      {/* <!-- Login Popup Modal --> */}

      <div className="modal fade" id="registerModal">
        <div className="modal-dialog modal-lg modal-dialog-centered login-modal modal-dialog-scrollable">
          <div className="modal-content">
            <button
              type="button"
              className="closed-modal"
              data-bs-dismiss="modal"
            ></button>
            {/* End close modal btn */}

            <div className="modal-body">
              {/* <!-- Login modal --> */}
              <div id="login-modal">
                {/* <!-- Login Form --> */}
                <div className="login-form default-form">
                  <Register />
                </div>
                {/* <!--End Login Form --> */}
              </div>
              {/* <!-- End Login Module --> */}
            </div>
            {/* En modal-body */}
          </div>
          {/* End modal-content */}
        </div>
      </div>
      {/* <!-- Login Popup Modal --> */}
    </>
  );
};

export default LoginPopup;

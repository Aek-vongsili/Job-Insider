import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Loading/Loading";
import axios from "axios";
import Cookies from "js-cookie";
import { fbAuthLogin } from "../../../../features/auth/actionCreator";

const FormContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const isLoading = useSelector((state) => {
    return state.firebaseAuth.loading;
  });
  const [showpass, setShowPass] = useState(false);
  const error = useSelector((state) => {
    return state.firebaseAuth.error;
  });

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fbAuthLogin({ email, password }, () => router.push("/")));
    // router.push("/");
  };
  return (
    <div className="form-inner">
      <h3>Login to HubJob</h3>

      {/* <!--Login Form--> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* name */}

        <div className="form-group">
          <label>Password</label>
          <div className="password-input-wrapper">
            <input
              type={showpass ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showpass ? (
              <i
                className="fa fa-eye eye-open"
                aria-hidden="true"
                onClick={() => setShowPass((prev) => !prev)}
              ></i>
            ) : (
              <i
                className="fa fa-eye-slash eye-close"
                aria-hidden="true"
                onClick={() => setShowPass((prev) => !prev)}
              ></i>
            )}
          </div>
          {error && <p className="err-message">{error.message}</p>}
        </div>

        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
            disabled={!!isLoading}
          >
            {isLoading ? <Loading /> : "Log in"}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            // className="call-modal signup"
            // data-bs-dismiss="modal"
            // data-bs-target="#registerModal"
            // data-bs-toggle="modal"
          >
            Signup
          </Link>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;

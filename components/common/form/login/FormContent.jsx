import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/clientApp";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Loading/Loading";
import { setLoading, setUser } from "../../../../features/user/userSlice";
import axios from "axios";
import Cookies from "js-cookie";


const FormContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {user} =await signInWithEmailAndPassword(auth,email,password)
      
      if (user) {
        const token = await user.getIdToken()
        console.log(token);
        // const in30Minutes = 1/48;
        // Cookies.set('token',token,{
        //   expires: in30Minutes
        // })
        await axios.post('api/jwt',{token:token})
        router.push("/");
       
        // setLoading(false)
      }
    } catch (err) {
      console.log(err);
      setErr(err.message);
      setLoading(false);
    }
  };
  return (
    <div className="form-inner">
      <h3>Login to Job Insider</h3>

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
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>{err ? err : ""}</p>
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
          >
            {loading ? <Loading /> : "Log in"}
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

import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { auth, db } from "../../../../firebase/clientApp";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Loading from "../../../Loading/Loading";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { fbAuthSignUp } from "../../../../features/auth/actionCreator";

const FormContent = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [showpass, setShowPass] = useState(false);
  const isLoading = useSelector((state) => {
    return state.firebaseAuth.isSignUpLoading;
  });
  const error = useSelector((state) => {
    return state.firebaseAuth.isSignUpError;
  });
  const router = useRouter();
  const createAccount = async (type, colName) => {
    dispatch(
      fbAuthSignUp({ email, password }, type, colName, () => router.push("/"))
    );
    // try {
    //   // Step 1: Create user
    //   const result = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   console.log(result);
    //   // Step 2: Set user document
    //   const userData = {
    //     user: {
    //       displayName:
    //         result.user.displayName === null
    //           ? result.user.email.substring(0, result.user.email.indexOf("@"))
    //           : result.user.displayName,
    //       role: type,
    //       email: result.user.email,
    //       createAt: serverTimestamp(),
    //     },
    //   };
    //   const userDocRef = doc(db, colName, result.user.uid);
    //   await setDoc(userDocRef, userData);
    //   // Step 3: Get ID token
    //   const idToken = await result.user.getIdToken();
    //   // Step 4: Call API to set custom claims
    //   await axios.post("/api/customClaims", {
    //     idToken: idToken,
    //     role: type,
    //   });
    //   Swal.fire({
    //     title: "Success",
    //     text: "Register Success",
    //     icon: "success",
    //     confirmButtonText: "Accept",
    //     timer: 2000,
    //     timerProgressBar: true,
    //   }).then(() => {
    //     router.push("/login");
    //   });
    //   // Step 5: Call API to get JWT
    //   // const jwtResponse = await axios.post("/api/jwt", { token: idToken });
    //   // Step 6: Redirect to home page
    // } catch (error) {
    //   setLoading(false);
    //   setErr(error.message);
    //   console.error("An error occurred:", error);
    //   // Handle errors here
    // }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (userType) {
      case "Candidate":
        createAccount("Candidate", "candidates");
        break;
      case "Employer":
        createAccount("Employer", "employers");
        break;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="username"
          placeholder="Email Address"
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
        <button
          className="theme-btn btn-style-one"
          type="submit"
          disabled={!!isLoading}
        >
          {isLoading ? <Loading /> : "Register"}
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent;

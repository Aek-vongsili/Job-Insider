import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../../../firebase/clientApp";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Loading from "../../../Loading/Loading";
import { useRouter } from "next/router";
import axios from "axios";

const FormContent = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showpass, setShowPass] = useState(false);

  const router = useRouter();
  const createAccount = async (type, colName) => {
    try {
      // Step 1: Create user
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);

      // Step 2: Set user document
      const userData = {
        user: {
          displayName:
            result.user.displayName === null
              ? result.user.email.substring(0, result.user.email.indexOf("@"))
              : result.user.displayName,
          role: type,
          email: result.user.email,
          createAt: serverTimestamp(),
        },
      };
      const userDocRef = doc(db, colName, result.user.uid);
      await setDoc(userDocRef, userData);

      // Step 3: Get ID token
      const idToken = await result.user.getIdToken();

      // Step 4: Call API to set custom claims
      const customClaimsResponse = await axios.post("/api/customClaims", {
        idToken: idToken,
        role: type,
      });
      console.log(customClaimsResponse);

      // Step 5: Call API to get JWT
      const jwtResponse = await axios.post("/api/jwt", { token: idToken });

      // Step 6: Redirect to home page
      router.push("/");
    } catch (error) {
      setLoading(false);
      setErr(error.message);
      console.error("An error occurred:", error);
      // Handle errors here
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    switch (userType) {
      case "Candidate":
        createAccount("Candidate", "users");
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
        <input
          type={showpass ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {showpass ? (
          <i
            class="fa fa-eye eye-open"
            aria-hidden="true"
            onClick={() => setShowPass((prev) => !prev)}
          ></i>
        ) : (
          <i
            class="fa fa-eye-slash eye-close"
            aria-hidden="true"
            onClick={() => setShowPass((prev) => !prev)}
          ></i>
        )}
        <p className="err-message">{err ? err : ""}</p>
      </div>
      {/* password */}

      <div className="form-group">
        <button
          className="theme-btn btn-style-one"
          type="submit"
          disabled={!!loading}
        >
          {loading ? <Loading /> : "Register"}
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent;

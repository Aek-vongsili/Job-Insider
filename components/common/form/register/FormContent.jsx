import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../../../firebase/clientApp";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Loading from "../../../Loading/Loading";
import { useRouter } from "next/router";

const FormContent = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err,setErr] = useState("")
  const [showpass, setShowPass] = useState(false);

  const router = useRouter();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setDoc(doc(db, "users", result.user.uid), {
          user: {
            displayName:
              result.user.displayName === null
                ? result.user.email.substring(0, result.user.email.indexOf("@"))
                : result.user.displayName,
            role: userType,
            email: result.user.email,
            createAt: serverTimestamp(),
          },
        });     
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErr(err.message)
      });
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
        <button className="theme-btn btn-style-one" type="submit">
          {loading ? <Loading /> : "Register"}
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent;

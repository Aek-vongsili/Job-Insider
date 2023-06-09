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
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setDoc(doc(db, "users", result.user.email), {
          user: {
            displayName:
              result.user.displayName === null
                ? result.user.email.substring(0, result.user.email.indexOf("@"))
                : result.user.displayName,
            role: userType,
            createAt:serverTimestamp()
          },
        });
        router.push("/")
      })
      .catch((err) => {
        console.log(err);
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
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* password */}

      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit">
        { loading?<Loading/>: "Register"}
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent;

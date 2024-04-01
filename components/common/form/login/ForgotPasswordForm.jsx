import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const firebase = useFirebase();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password reset email sent. If you registered, please check your inbox.",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect to the login page after the user clicks "OK"
        router.push("/login"); // Adjust the route as needed
      });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error sending password reset email. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="form-inner">
      <h3>Forgot Password</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

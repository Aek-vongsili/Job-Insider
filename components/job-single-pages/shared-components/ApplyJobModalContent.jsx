import Link from "next/link";
import {
  checkIfUserApplied,
  jobApplyApplication,
} from "../../../features/jobs/actionCreator";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";

const ApplyJobModalContent = ({ id, userUid }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const loading = useSelector((state) => {
    return state.jobSingle.jobApplyLoading;
  });
  const dispatch = useDispatch();
  const handleApplyJob = async (e) => {
    e.preventDefault();
    if (!userUid) {
      alert("not login");
      return;
    } else {
      await dispatch(jobApplyApplication(userUid, id));
      Swal.fire({
        title: "Success",
        text: "You have successfully applied for the job.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(async () => {
        await dispatch(checkIfUserApplied(userUid, id));
      });
    }
  };
  return (
    <form className="default-form job-apply-form" onSubmit={handleApplyJob}>
      <div className="row">
        {/* End .col */}

        {/* <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <textarea
            className="darma"
            name="message"
            placeholder="Message"
            required
          ></textarea>
        </div> */}
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="input-group checkboxes square">
            <input
              type="checkbox"
              name="remember-me"
              id="rememberMe"
              value={isSubscribed}
              onChange={() => setIsSubscribed((current) => !current)}
            />
            <label htmlFor="rememberMe" className="remember">
              <span className="custom-checkbox"></span> You accept our{" "}
              <span data-bs-dismiss="modal">
                <Link href="/terms">
                  Terms and Conditions and Privacy Policy
                </Link>
              </span>
            </label>
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className={`theme-btn btn-style-one w-100 ${
              !isSubscribed ? "disabled-btn" : ""
            }`}
            type="submit"
            name="submit-form"
            disabled={!isSubscribed}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <ReactLoading type="bars" color="#fff" width={30} height={30} />
            ) : (
              "Apply Job"
            )}
          </button>
          <style jsx>{`
            .disabled-btn {
              background-color: gray; // Change this to the desired background color
              cursor: not-allowed;
            }
          `}</style>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default ApplyJobModalContent;

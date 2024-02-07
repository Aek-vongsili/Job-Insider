import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
// import { db } from "../../../../../firebase/clientApp";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Loading from "../../../../Loading/Loading";
import { useRouter } from "next/router";
const SocialNetworkBox = () => {
  const userUid = useSelector((state) => state.user?.user?.uid);
  const [loading, setLoading] = useState(false);
  const [socialData, setSocialData] = useState(new FormData());
  const router = useRouter();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setSocialData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const social_info = useSelector((state) => state.employerProfile?.social);
  useEffect(() => {
    if (social_info) {
      setSocialData(social_info);
    }
  }, [social_info]);

  const handleSaveData = async (e) => {
    e.preventDefault();
    // const userRef = doc(db, "employers", userUid);
    // setLoading(true);
    // setDoc(
    //   userRef,
    //   {
    //     profile: {
    //       social: socialData,
    //     },
    //   },
    //   { merge: true }
    // ).then((rs) => {
    //   setLoading(false);
    //   Swal.fire({
    //     title: "Update Success",
    //     text: "Update Your Social Information Success",
    //     icon: "success",
    //     confirmButtonText: "Accept",
    //     timer: 3500,
    //     timerProgressBar: true,
    //   }).then((rs) => {
    //     if (rs.isConfirmed) {
    //       router.reload();
    //     } else if (rs.isDismissed) {
    //       router.reload();
    //     }
    //   });
    // });
  };
  return (
    <form className="default-form" onSubmit={handleSaveData}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            name="facebook"
            placeholder="Facebook"
            onChange={handleInput}
            value={socialData.facebook || ""}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Twitter</label>
          <input
            type="text"
            name="twitter"
            placeholder="Twitter"
            onChange={handleInput}
            value={socialData.twitter || ""}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Linkedin</label>
          <input
            type="text"
            name="linkedin"
            placeholder="Linkedin"
            onChange={handleInput}
            value={socialData.linkedin || ""}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Tiktok</label>
          <input
            type="text"
            name="tiktok"
            placeholder="Tiktok"
            onChange={handleInput}
            value={socialData.tiktok || ""}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button
            type="submit"
            className="theme-btn btn-style-one"
            disabled={!!loading}
          >
            {loading ? <Loading /> : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SocialNetworkBox;

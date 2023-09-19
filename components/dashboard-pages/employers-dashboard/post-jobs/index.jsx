import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import PostJobSteps from "./components/PostJobSteps";
import PostBoxForm from "./components/PostBoxForm";
import MenuToggler from "../../MenuToggler";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { setLoading } from "../../../../features/user/userSlice";

const index = () => {
  const userUid = useSelector((state) => state.user?.user?.uid);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const companyProfile = async () => {
      try {
        if (userUid) {
          const collectionRef = doc(db, "employers", userUid);
          const docSnap = await getDoc(collectionRef);
          if (docSnap.exists()) {
            const profile = docSnap.data()?.profile;

            if (
              profile?.company_info === undefined ||
              profile?.location === undefined ||
              profile?.social === undefined ||
              profile?.company_info === null ||
              profile?.location === null ||
              profile?.social === null
            ) {
              Swal.fire({
                icon: "warning",
                title: "Can't access this page",
                text: "Fill infomation in Company profile!",
                footer: '<a href="">Why do I have this issue?</a>',
                confirmButtonText: "Access",
                timerProgressBar: true,
                timer: 2000,
              }).then(() => {
                router.back();
              });
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    companyProfile();
  }, [userUid, router]);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      {/* <DashboardHeader /> */}
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Post a New Job!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Post Job</h4>
                  </div>

                  <div className="widget-content">
                    <PostJobSteps />
                    {/* End job steps form */}
                    <PostBoxForm />
                    {/* End post box form */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;

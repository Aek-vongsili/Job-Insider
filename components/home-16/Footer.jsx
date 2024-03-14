import Link from "next/link";
import CopyrightFooter from "../footer/common-footer/CopyrightFooter";
import FooterApps2 from "../footer/FooterApps2";
import FooterContent3 from "../footer/FooterContent3";
import Image from 'next/image'
const Footer = () => {
  return (
    <footer className="main-footer style-five">
      <div className="auto-container">
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-4 col-lg-6 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <Link href="/">
                    <Image src="/images/HUBJOB_LOGO_BLUE.svg" alt="brand" width={110} height={110}/>
                  </Link>
                </div>
                <p className="phone-num">
                  <span>Call us </span>
                  <a href="thebeehost@support.com">+856 20 55969965</a>
                </p>
                <p className="address">
                  Phaxay, Sixattanak, Vientiane, Laos
                <br />
                  <a href="mailto:kettakoun8899@gmail.com" className="email">
                   Hubjob@gmail.com
                  </a>
                </p>
              </div>
            </div>
            {/* End footer address left widget */}

            <div className="big-column col-xl-8 col-lg-9 col-md-12">
              <div className="row">
                <FooterContent3 />

                {/* <div className="footer-column col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget">
                    <h4 className="widget-title">Mobile Apps</h4>
                    <FooterApps2 />
                  </div>
                </div> */}
              </div>
              {/* End .row */}
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
        {/* <!--Widgets Section--> */}
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      {/* <!--Bottom--> */}
    </footer>
  );
};

export default Footer;

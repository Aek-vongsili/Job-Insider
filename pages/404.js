import dynamic from "next/dynamic";
import Link from "next/link";
import Seo from "../components/common/Seo";
import Image from "next/image";

const index = () => {
  return (
    <>
      <Seo pageTitle="Page Not Found" />
      <div
        className="error-page-wrapper "
        style={{
          backgroundImage: `url(/images/404.jpg)`,
        }}
        data-aos="fade"
      >
        <div className="content">
          <div className="logo">
            <Link href="/">
              <Image src="/images/Artboard 6.svg" alt="brand" width={200} height={200}/>
            </Link>
          </div>
          {/* End logo */}

          <h1>404!</h1>
          <p>The page you are looking for could not be found.</p>

          <Link className="theme-btn btn-style-three call-modal" href="/">
            BACK TO HOME
          </Link>
        </div>
        {/* End .content */}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

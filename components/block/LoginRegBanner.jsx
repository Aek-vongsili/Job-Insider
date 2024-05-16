const LoginRegBanner = () => {
  return (
    <section
      className="cta -type-2"
      style={{
        backgroundImage: "url(images/index-16/header/bg2.jpeg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="auto-container">
        <div className="row grid-base justify-content-between">
          <div className="col-lg-5 col-md-6">
            <div className="cta-item">
              <div className="icon-wrap">
                <div className="icon icon-case"></div>
              </div>
              {/* End icon-wrap */}

              <div className="content">
                <div className="title">I&apos;m an Employer</div>
                <div className="text" style={{ wordBreak: "break-word" }}>
                 I tend to be looking for candidates who can
                  handle multitasking, including flexibility, always being
                  active, and effective contribution .
                </div>
              </div>
              {/* End content */}
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-5 col-md-6">
            <div className="cta-item -blue">
              <div className="content">
                <div className="title">I&apos;m a Candidate</div>
                <div className="text" style={{ wordBreak: "break-word" }}>
                 I seek opportunities or companies where I can independently
                  apply and share my ideas at work sometimes .
                </div>
              </div>
              {/* End .content */}

              <div className="icon-wrap">
                <div className="icon icon-contact"></div>
              </div>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default LoginRegBanner;

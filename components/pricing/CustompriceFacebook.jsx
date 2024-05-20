import Link from "next/link";

const CustompriceFacebook = () => {
  const pricingCotent = [
    {
      id: 1,
      packageType: "Basic",
      price: "250.000",
      title: "1 PICTURE",
      image: "/images/fb-post1.png",
      bgClass: "basic",
    },
    {
      id: 2,
      packageType: "Standard",
      price: "550.000",
      title: "3 PICTURES",
      image: "/images/fb-post2.png",
      bgClass: "standard",
    },
    {
      id: 3,
      packageType: "Pro",
      price: "850.000",
      title: "6 PICTURES",
      image: "/images/fb-post3.png",
      bgClass: "pro",
    },
  ];

  return (
    <div
      className="pricing-tabs-facebook tabs-box wow fadeInUp"
      data-aos="fade-up"
    >
      {/* <!--Tabs Container--> */}
      <div className="row">
        {pricingCotent.map((item) => (
          <div
            className={`pricing-table-facebook col-lg-4 col-md-6 col-sm-12 ${item.tag}`}
            key={item.id}
          >
            <div className="inner-box ">
              <div className={`title ${item.bgClass}`}>{item.packageType}</div>

              <div className={`price ${item.bgClass}`}>
                {` ${item.price}`} <span className="duration"></span>
              </div>
              <div className={`post-container ${item.bgClass}`}>
                <div className="picture-text">
                  {item.title}
                  <div className="underline"></div>
                </div>
                <div className="table-content">
                  <img src={item.image} alt="image" style={{ width: "80%" }} />
                </div>
                <div className="table-footer">
                  <button
                    className={`theme-btn btn-style-five ${item.bgClass}`}
                  >
                    SELECT PLAN
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustompriceFacebook;

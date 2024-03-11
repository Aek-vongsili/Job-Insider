import Link from "next/link";

const Pricing = () => {
  const pricingCotent = [
    {
      id: 1,
      packageType: "Weekly",
      price: "200.000",
      tag: "",
      features: [
        "30 job posting",
        "3 featured job",
        "Job displayed for 15 days",
        "Premium Support 24/7",
      ],
    },
    {
      id: 2,
      packageType: "Monthly",
      price: "800.000",
      tag: "tagged",
      features: [
        "40 job posting",
        "5 featured job",
        "Job displayed for 20 days",
        "Premium Support 24/7",
      ],
    },
    {
      id: 3,
      packageType: "Yearly",
      price: "8.000.000",
      tag: "",
      features: [
        "50 job posting",
        "10 featured job",
        "Job displayed for 60 days",
        "Premium Support 24/7",
      ],
    },
  ];

  return (
    <div className="pricing-tabs tabs-box wow fadeInUp" data-aos="fade-up">
      {/* <!--Tabs Container--> */}
      <div className="row">
        {pricingCotent.map((item) => (
          <div
            className={`pricing-table col-lg-4 col-md-6 col-sm-12 ${item.tag}`}
            key={item.id}
          >
            <div className="inner-box">
              {item.tag ? (
                <>
                  <span className="tag">Recommended</span>
                </>
              ) : (
                ""
              )}

              <div className="title">{item.packageType}</div>
              <div className="price">
                LAK{` ${item.price}`} <span className="duration"></span>
              </div>
              <div className="table-content">
                <ul>
                  {item.features.map((feature, i) => (
                    <li key={i}>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="table-footer">
                <Link href="/shop/cart" className="theme-btn btn-style-three">
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;

import Slider from "react-slick";
import Link from "next/link"; // Ensure you are using the correct Link component
import React from "react";

const CallToAction10 = () => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    infinite: true,
  };

  const sliderGallery = [
    { id: 1, link: "#", imgNumber: "banner1.jpeg" },
    { id: 2, link: "#", imgNumber: "banner2.jpeg" },
    { id: 3, link: "#", imgNumber: "banner3.jpeg" },
  ];

  return (
    <section
      className="call-to-action-two -type-4"

    >
      <div>
        {/* Slider Section */}

        <Slider {...settings} arrows={false}>
          {sliderGallery.map((item) => (
            <img
              src={`images/bot_banner/${item.imgNumber}`}
              alt={`Partner ${item.id}`}
              style={{objectFit:"cover"}}
            />
          ))}
        </Slider>

      </div>
    </section>
  );
};

export default CallToAction10;

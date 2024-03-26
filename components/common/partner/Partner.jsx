import Slider from "react-slick";
import React, { useRef } from "react";
const Partner = () => {
  const settings = {
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1000,
    infinite: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const sliderGallery = [
    { id: 1, link: "#", imgNumber: "64BIT_LOGO" },
    { id: 2, link: "#", imgNumber: "POST64-LOGO-03" },
    { id: 3, link: "#", imgNumber: "purer" },
    { id: 4, link: "#", imgNumber: "64BIT_LOGO" },
    { id: 5, link: "#", imgNumber: "POST64-LOGO-03" },
    { id: 6, link: "#", imgNumber: "purer" },
    { id: 7, link: "#", imgNumber: "64BIT_LOGO" },
    { id: 8, link: "#", imgNumber: "POST64-LOGO-03" },
    { id: 9, link: "#", imgNumber: "purer" },
    { id: 10, link: "#", imgNumber: "64BIT_LOGO" },
    { id: 11, link: "#", imgNumber: "POST64-LOGO-03" },
    { id: 12, link: "#", imgNumber: "purer" },
  ];

  return (
    <>
      <Slider {...settings} arrows={false}>
        {sliderGallery.map((item) => (
          <li className="slide-item" key={item.id}>
            <figure className="image-box">
              <a href={item.link}>
                <img src={`images/clients/${item.imgNumber}.png`} alt="brand" />
              </a>
            </figure>
          </li>
        ))}
      </Slider>
    </>
  );
};

export default Partner;

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
    { id: 1, link: "#", imgNumber: "64bit.jpeg" },
    { id: 2, link: "#", imgNumber: "post64.jpeg" },
    { id: 3, link: "#", imgNumber: "purer.jpeg" },
    { id: 4, link: "#", imgNumber: "FoodPanda.jpeg" },
    { id: 5, link: "#", imgNumber: "GpsLao.jpeg" },
    { id: 6, link: "#", imgNumber: "KxBroker.jpeg" },
    { id: 7, link: "#", imgNumber: "Systory.jpeg" },
    { id: 8, link: "#", imgNumber: "WallStreet.jpeg" },
    { id: 9, link: "#", imgNumber: "WWFLao.jpeg" },
    { id: 10, link: "#", imgNumber: "ZCom.jpeg" },
  ];

  return (
    <>
      <Slider {...settings} arrows={false}>
        {sliderGallery.map((item) => (
          <li className="slide-item" key={item.id}>
            <figure className="image-box">
              <a href={item.link}>
                <img src={`images/clients/${item.imgNumber}`} alt="brand" />
              </a>
            </figure>
          </li>
        ))}
      </Slider>
    </>
  );
};

export default Partner;

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
const index = () => {
  const imagePath = [
    { id: 2, path: "/images/index-16/header/bg4.png" },
    { id: 3, path: "/images/index-16/header/bg5.png" },
    { id: 4, path: "/images/index-16/header/bg6.jpeg" },
  ];

  return (
    <section className="-type-16" style={{ marginTop: 100 }}>
      {/* <Carousel
        data-bs-theme="dark"
        style={{ width: "100%" }}
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        touch={true}
        bsPrefix="carousel"
      >
        {imagePath.map((i, index) => (
          <Carousel.Item key={i.id}>
            <Image
              className="d-block w-100"
              src={i.path}
              alt="First slide"
              width={1500}
              height={1500}
              quality={100}
              priority
            />
          </Carousel.Item>
        ))}
      </Carousel> */}
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {imagePath.map((i, index) => (
          <SwiperSlide key={i.id}>
            <Image
              className="d-block w-100 h-100"
              src={i.path}
              alt="First slide"
              width={1500}
              height={1500}
              quality={100}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    // <!-- End Banner Section-->
  );
};

export default index;

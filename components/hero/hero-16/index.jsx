import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";

const index = () => {
  const [index, setIndex] = useState(0);
  const imagePath = [
    { id: 1, path: "images/index-16/header/bg4.png" },
    { id: 2, path: "images/index-16/header/bg4.png" },
    { id: 3, path: "images/index-16/header/bg4.png" },
  ];
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === imagePath.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [imagePath.length]);
  return (
    <section
      className="banner-section-four -type-16"
      style={{ paddingTop: 100 }}
    >
      <Carousel
        data-bs-theme="dark"
        style={{ width: "100%" }}
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
      >
        {imagePath.map((i, index) => (
          <Carousel.Item key={i.id}>
            <img className="d-block w-100" src={i.path} alt="First slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
    // <!-- End Banner Section-->
  );
};

export default index;

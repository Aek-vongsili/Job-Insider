import Image from "next/image";

const ImgBox = () => {
  const imgContent = [
    {
      id: 1,
      block: [{ img: "ab4.jpeg" }],
    },
    {
      id: 2,
      block: [{ img: "ab2.jpeg" }, { img: "ab6.jpg" }, { img: "ab7.jpg" }],
    },
    {
      id: 3,
      block: [{ img: "ab2.jpeg" }, { img: "ab3.jpeg" }, { img: "ab2.jpeg" }],
    },
    {
      id: 4,
      block: [{ img: "ab1.jpg" }],
    },
  ];

  return (
    <div className="images-box">
      <div className="row">
        {/* First item */}
        <div className="column col-lg-3 col-md-6 col-sm-6">
          <figure className="image">
            <img
              src="/images/about/ab4.jpeg"
              alt="about image"
              style={{ height: 395, objectFit: "cover" }}
            />
          </figure>
        </div>
        {/* Second item */}
        <div className="column col-lg-3 col-md-6 col-sm-6">
          <figure className="image">
            <img
              src="/images/about/ab2.jpeg"
              alt="about image"
              style={{
                height: "125px",

                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </figure>
          <figure className="image">
            <img
              src="/images/about/ab6.jpg"
              alt="about image"
              style={{ height: 125, objectFit: "scale-down" }}
            />
          </figure>
          <figure className="image">
            <img
              src="/images/about/ab7.jpg"
              alt="about image"
              style={{ height: 125, objectFit: "cover" }}
            />
          </figure>
        </div>
        {/* Third item */}
        <div className="column col-lg-3 col-md-6 col-sm-6">
          <figure className="image">
            <img
              src="/images/about/ab8.jpg"
              alt="about image"
              style={{
                height: "125px",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </figure>
          <figure className="image">
            <img
              src="/images/about/ab3.jpeg"
              alt="about image"
              style={{
                height: "125px",

                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </figure>
          <figure className="image">
            <img
              src="/images/about/ab9.jpg"
              alt="about image"
              style={{
                height: "125px",

                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </figure>
        </div>
        <div className="column col-lg-3 col-md-6 col-sm-6">
          <figure className="image">
            <img
              src="/images/about/ab1.jpg"
              alt="about image"
              style={{ height: 395, objectFit: "cover" }}
            />
          </figure>
        </div>
        {/* Repeat for other items if needed */}
      </div>
    </div>
  );
};

export default ImgBox;

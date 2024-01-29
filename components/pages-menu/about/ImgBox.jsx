import Image from "next/image";

const ImgBox = () => {
  const imgContent = [
    {
      id: 1,
      block: [{ img: "ab4.jpeg" }],
    },
    {
      id: 2,
      block: [{ img: "ab2.jpeg" }, { img: "ab3.jpeg" },{ img: "ab2.jpeg" }],
    },
    {
      id: 3,
      block: [{ img: "ab2.jpeg" }, { img: "ab3.jpeg" },{ img: "ab2.jpeg" }],
    },
    {
      id: 4,
      block: [{ img: "ab1.jpg" }],
    },
  ];

  return (
    <div className="images-box">
      <div className="row">
        {imgContent.map((item) => (
          <div className="column col-lg-3 col-md-6 col-sm-6" key={item.id}>
            {item.block.map((itemImg, i) => (
              <figure className="image" key={i}>
                <Image
                  src={`/images/about/${itemImg.img}`}
                  alt="about image"
                  width={300}
                  height={200}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        ))}
        {/* End .col */}
      </div>
    </div>
  );
};

export default ImgBox;

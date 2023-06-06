import SearchForm5 from "../../common/job-search/SearchForm5";
import JobCategorie9 from "../../job-categories/JobCategorie9";

const index = () => {
  return (
    <section
      className="banner-section-four -type-16"
      // style={{ backgroundImage: "url(images/index-16/header/bg.png)" }}
    >
      <div
        id="carouselExampleIndicators"
        class="carousel slide image-slide"
        data-bs-ride="true"
      >
        <div class="carousel-indicators ">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner img">
          <div class="carousel-item active item" data-bs-interval="5000">
            <img
              src="images/index-16/header/bg.png"
              class="d-block banner"
              alt="..."
            />
          </div>
          <div class="carousel-item item" data-bs-interval="2000">
            <img
              src="images/index-16/header/bg4.png"
              class="d-block banner"
              alt="..."
            />
          </div>
          <div class="carousel-item item">
            <img
              src="images/index-16/header/bg5.png"
              class="d-block banner"
              alt="..."
            />
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      {/* <img src="images/index-16/header/bg.png" alt="" className="image-bg"/> */}
      <div className="auto-container">
        <div className="content-box">
          <div className="title-box" data-wow-delay="500" data-aos="fade-up">
            <h3>Find The Best Job</h3>
            <p>Search from 45.200+ Jobs</p>
          </div>
          {/* End title-box */}

          <div
            className="job-search-form"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <SearchForm5 />
          </div>
          {/* <!-- Job Search Form --> */}

          <div className="features-icons">
            <JobCategorie9 />
          </div>
        </div>
        {/* End content-box */}
      </div>
    </section>
    // <!-- End Banner Section-->
  );
};

export default index;

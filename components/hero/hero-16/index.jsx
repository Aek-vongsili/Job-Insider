import SearchForm5 from "../../common/job-search/SearchForm5";
import JobCategorie9 from "../../job-categories/JobCategorie9";

const index = () => {
  return (
    <section
      className="banner-section-four -type-16"
      style={{ backgroundImage: "url(images/index-16/header/bg4.png)" }}
    >
      {/* <img src="images/index-16/header/bg.png" alt="" className="image-bg"/> */}
      {/* <div className="auto-container">
        <div className="content-box">
          <div className="title-box" data-wow-delay="500" data-aos="fade-up">
            <h3>Find The Best Job</h3>
            <p>Search from 45.200+ Jobs</p>
          </div>
        

          <div
            className="job-search-form"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <SearchForm5 />
          </div>
        

          <div className="features-icons">
            <JobCategorie9 />
          </div>
        </div>
      
      </div> */}
    </section>
    // <!-- End Banner Section-->
  );
};

export default index;

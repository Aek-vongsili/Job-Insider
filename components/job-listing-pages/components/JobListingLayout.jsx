const JobListingLayout = ({ 
  children, 
  viewMode = "list", // "list" or "grid"
  className = "",
  isLoading = false 
}) => {
  const getLayoutClasses = () => {
    if (viewMode === "grid") {
      return "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4";
    }
    return "row g-4";
  };

  const getItemClasses = () => {
    if (viewMode === "grid") {
      return "col";
    }
    return "col-12";
  };

  return (
    <div className={`job-listing-layout ${className}`}>
      <div className={getLayoutClasses()}>
        {isLoading ? (
          <div className="col-12">
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-spinner">
                  <i className="fas fa-spinner fa-spin fa-2x"></i>
                </div>
                <p className="loading-text">Loading amazing opportunities...</p>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default JobListingLayout; 
import { useState, useEffect } from "react";

const ModernPagination = ({ 
  currentPage = 1, 
  totalPages = 5, 
  onPageChange = () => {},
  isLoading = false,
  showPageNumbers = true,
  maxPageNumbers = 5 
}) => {
  const [displayPages, setDisplayPages] = useState([]);

  useEffect(() => {
    const calculateDisplayPages = () => {
      const pages = [];
      const start = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
      const end = Math.min(totalPages, start + maxPageNumbers - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      setDisplayPages(pages);
    };

    calculateDisplayPages();
  }, [currentPage, totalPages, maxPageNumbers]);

  const handlePageClick = (page, e) => {
    e.preventDefault();
    if (page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="ls-pagination" aria-label="Pagination Navigation">
      <ul>
        {/* Previous Button */}
        <li className="prev">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1 || isLoading}
            aria-label="Go to previous page"
            className={currentPage === 1 || isLoading ? 'disabled' : ''}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        </li>

        {/* First page and ellipsis */}
        {displayPages[0] > 1 && (
          <>
            <li>
              <button
                onClick={(e) => handlePageClick(1, e)}
                disabled={isLoading}
                aria-label="Go to page 1"
              >
                1
              </button>
            </li>
            {displayPages[0] > 2 && (
              <li className="ellipsis">
                <span>...</span>
              </li>
            )}
          </>
        )}

        {/* Page Numbers */}
        {showPageNumbers && displayPages.map((page) => (
          <li key={page}>
            <button
              onClick={(e) => handlePageClick(page, e)}
              disabled={isLoading}
              className={currentPage === page ? 'current-page' : ''}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {isLoading && currentPage === page ? (
                <div className="loading-spinner">
                  <i className="fas fa-spinner fa-spin"></i>
                </div>
              ) : (
                page
              )}
            </button>
          </li>
        ))}

        {/* Last page and ellipsis */}
        {displayPages[displayPages.length - 1] < totalPages && (
          <>
            {displayPages[displayPages.length - 1] < totalPages - 1 && (
              <li className="ellipsis">
                <span>...</span>
              </li>
            )}
            <li>
              <button
                onClick={(e) => handlePageClick(totalPages, e)}
                disabled={isLoading}
                aria-label={`Go to page ${totalPages}`}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Next Button */}
        <li className="next">
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || isLoading}
            aria-label="Go to next page"
            className={currentPage === totalPages || isLoading ? 'disabled' : ''}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>

      {/* Page Info */}
      <div className="pagination-info">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </nav>
  );
};

export default ModernPagination; 
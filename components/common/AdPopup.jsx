import { useState, useEffect } from "react";

const AdPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Check if popup is disabled via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('nopopup') === 'true') {
      return;
    }

    // Check if user has closed the popup today
    const lastClosed = localStorage.getItem('adPopupLastClosed');
    const today = new Date().toDateString();
    
    if (lastClosed === today) {
      // Don't show popup if already closed today
      return;
    }

    // Show popup after a small delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Auto-close after 10 seconds
    const autoCloseTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    // Countdown timer
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(autoCloseTimer);
      clearInterval(countdownTimer);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    // Store today's date to prevent showing again today
    const today = new Date().toDateString();
    localStorage.setItem('adPopupLastClosed', today);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextElementSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="ad-popup-overlay" onClick={handleBackdropClick}>
      <div className="ad-popup-container">
        {/* Close Button */}
        <button 
          className="ad-popup-close" 
          onClick={handleClose}
          aria-label="Close advertisement"
          title="Close"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Countdown Timer */}
        <div className="ad-popup-timer">
          <i className="fas fa-clock"></i> {timeLeft}s
        </div>

        {/* Advertisement Content */}
        <div className="ad-popup-content">
          <img 
            src="/images/advertisePopup.jpeg" 
            alt="Special Advertisement - Don't miss our latest opportunities!" 
            className="ad-popup-image"
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Fallback content if image doesn't load */}
          <div className="ad-popup-fallback" style={{ display: 'none' }}>
            <div className="fallback-content">
              <div className="fallback-icon">
                <i className="fas fa-bullhorn"></i>
              </div>
              <h3>🌟 Special Announcement!</h3>
              <p>Discover amazing job opportunities tailored just for you</p>
              <div className="features">
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Premium Job Listings</span>
                </div>
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Career Growth</span>
                </div>
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Top Companies</span>
                </div>
              </div>
              <button className="cta-button" onClick={handleClose}>
                <i className="fas fa-rocket"></i>
                Explore Now
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="ad-popup-progress">
          <div 
            className="progress-bar" 
            style={{ 
              width: `${((10 - timeLeft) / 10) * 100}%`,
              transition: 'width 1s linear'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AdPopup; 
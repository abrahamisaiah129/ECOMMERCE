import { useState, useEffect } from "react";
import './backtotopbutton.css'; // Optional for styling

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="back-to-top" onClick={scrollToTop} style={styles.button}>
          <i className="fa fa-arrow-up" style={styles.icon}></i>
        </div>
      )}
    </>
  );
}

// Inline styles (you can also use CSS)
const styles = {
  button: {
    position: 'fixed',
    bottom: '50px',
    right: '30px',
    width: '50px',
    height: '50px',
    backgroundColor: '#8e44ad',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: '1000',
  },
  icon: {
    color: '#fff',
    fontSize: '24px',
  }
};

export default BackToTopButton;

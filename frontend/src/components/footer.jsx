import { Link } from "react-router-dom";
import './footer.css';

function Footer() {
  return (
    <footer className="footer bg-gradient-footer text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5 className="gradient-text">About Us</h5>
            <p>
              We are an e-commerce platform dedicated to bringing the best products right to your doorstep. Quality and customer satisfaction are our top priorities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="gradient-text">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none animated-link">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-white text-decoration-none animated-link">Shop</Link>
              </li>
              <li>
                <Link to="/settings" className="text-white text-decoration-none animated-link">Settings</Link>
              </li>
              <li>
                <Link to="/cart" className="text-white text-decoration-none animated-link">Cart</Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="col-md-4 mb-3">
            <h5 className="gradient-text">Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

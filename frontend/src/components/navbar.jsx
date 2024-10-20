import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../pages/context/shop-context";
import { PRODUCTS } from "../pages/product/product-data";
import './navbar.css';

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const { cartItems } = useContext(ShopContext);
  const [noOfItems, setNoOfItems] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Reset dropdown on route change
    setDropdown(false);
  }, [location]);

  useEffect(() => {
    let cartNumber = 0;
    PRODUCTS.forEach((data) => {
      if (cartItems[data.id] !== 0) {
        cartNumber += 1;
      }
    });
    setNoOfItems(cartNumber);
  }, [cartItems]);

  const dropDownButton = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg p-1 bg-gradient-navbar">
        <p className="navbar-brand fw-bold gradient-text">Ecommerce</p>
        <button
          className="navbar-toggler bg-white text-black"
          type="button"
          onClick={dropDownButton}
        >
          <i className="fa fa-bars"></i>
        </button>
        <div className={dropdown ? "" : "collapse navbar-collapse"} id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link animated-link text-white fw-bold" to="/">
              <i className="fa-solid fa-home"></i> Shop
            </Link>
            <Link className="nav-item nav-link animated-link text-white fw-bold" to="/cart">
              <i className="fa-solid fa-cart-shopping"></i> Cart{" "}
              <span className="pill bg-danger p-1 m-1 rounded text-white">
                {noOfItems}
              </span>
            </Link>
            <Link className="nav-item nav-link animated-link text-white fw-bold" to="/settings">
              <i className="fa-solid fa-sun"></i> Settings
            </Link>
            <Link className="nav-item nav-link animated-link text-white fw-bold" to="/register">
              <i className="fa-solid fa-sign-in"></i> Register
            </Link>
            {/* New Track Orders Link */}
            <Link className="nav-item nav-link animated-link text-white fw-bold" to="/track-orders">
              <i className="fa-solid fa-truck"></i> Track Orders
            </Link>
          </div>

          {/* Account Section */}
          <div className="navbar-nav ms-auto">
            <Link to="/profile" className="nav-item nav-link text-white fw-bold">
              <img
                src="https://eu.ui-avatars.com/api/?name=MM+EE&size=250" // Placeholder image or the user's profile image
                alt="Profile"
                className="rounded-circle"
                width="40"
                height="40"
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

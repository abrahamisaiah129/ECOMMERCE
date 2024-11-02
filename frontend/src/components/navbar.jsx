import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../pages/context/shop-context";
import { PRODUCTS } from "../pages/product/product-data";
import './navbar.css';

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const { cartItems, wishlistItems } = useContext(ShopContext);
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const [noOfWishlistItems, setNoOfWishlistItems] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Close dropdown on route change
    setDropdown(false);
  }, [location]);

  // Update cart item count
  useEffect(() => {
    const cartNumber = PRODUCTS.reduce((count, product) => {
      return count + (cartItems[product.id] !== 0 ? 1 : 0);
    }, 0);
    setNoOfCartItems(cartNumber);
  }, [cartItems]);

  // Update wishlist item count
  useEffect(() => {
    const wishlistNumber = PRODUCTS.reduce((count, product) => {
      return count + (wishlistItems[product.id] !== 0 ? 1 : 0);
    }, 0);
    setNoOfWishlistItems(wishlistNumber);
  }, [wishlistItems]);

  const handleDropdownToggle = () => setDropdown((prevState) => !prevState);

  return (
    <nav className="navbar navbar-expand-lg p-1 bg-gradient-navbar">
      <p className="navbar-brand fw-bold new-color">Ecommerce</p>
      <button
        className="navbar-toggler bg-white text-black"
        type="button"
        onClick={handleDropdownToggle}
      >
        <i className="fa fa-bars"></i>
      </button>
      <div className={`navbar-collapse ${dropdown ? "show" : "collapse"}`} id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link animated-link text-white fw-bold" to="/">
            <i className="fa-solid fa-home"></i> Shop
          </Link>
          <Link className="nav-item nav-link animated-link text-white fw-bold" to="/cart">
            <i className="fa-solid fa-cart-shopping"></i> Cart{" "}
            <span className="pill bg-danger p-1 m-1 rounded text-white">{noOfCartItems}</span>
          </Link>
          <Link className="nav-item nav-link animated-link text-white fw-bold" to="/wishlist">
            <i className="fa-solid fa-heart"></i> Wishlist{" "}
            <span className="pill bg-danger p-1 m-1 rounded text-white">{noOfWishlistItems}</span>
          </Link>
          <Link className="nav-item nav-link animated-link text-white fw-bold" to="/settings">
            <i className="fa-solid fa-sun"></i> Settings
          </Link>
          <Link className="nav-item nav-link animated-link text-white fw-bold" to="/auth">
            <i className="fa-solid fa-sign-in"></i> Register
          </Link>
          <Link className="nav-item nav-link animated-link text-white fw-bold" to="/track-orders">
            <i className="fa-solid fa-truck"></i> Track Orders
          </Link>
        </div>

        {/* Account Section */}
        <div className="navbar-nav ms-auto">
          <Link to="/profile" className="nav-item nav-link text-white fw-bold">
            <img
              src="https://eu.ui-avatars.com/api/?name=MM+EE&size=250"
              alt="Profile"
              className="rounded-circle"
              width="40"
              height="40"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

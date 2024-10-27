import { useState, useEffect, useContext } from "react";
import { PRODUCTS } from "../product/product-data.js";
import Product from "../product/product.jsx";
import { ThemeContext } from "../context/theme-context.jsx";
import BackToTopButton from "../../components/backtotopbutton.jsx";
import { useNavigate } from "react-router-dom"; // Change to useNavigate
// import PropTypes from "prop-types"; // Import PropTypes

function Homepage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(PRODUCTS);
  const [categories, setCategories] = useState([]);
  const [activePill, setActivePill] = useState("all");
  const [visibleItemsCount, setVisibleItemsCount] = useState(4); // Initial visible items
  const [sortByPrice, setSortByPrice] = useState(false); // Sort by price toggle
  const { isDarkTheme } = useContext(ThemeContext);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const uniqueCategories = [...new Set(PRODUCTS.map(product => product.category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    const searchFiltered = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(searchFiltered);
  }, [searchTerm]);

  const handlePillClick = (category) => {
    setActivePill(category);
    setVisibleItemsCount(4); // Reset visible items count on category change
    if (category === "all") {
      setFilteredData(PRODUCTS);
    } else {
      const categoryFiltered = PRODUCTS.filter(product => product.category === category);
      setFilteredData(categoryFiltered);
    }
  };

  const handleShowMore = () => {
    setVisibleItemsCount(prevCount => prevCount + 4); // Increase visible items count
  };

  const handleSortByPrice = () => {
    setSortByPrice(prevSort => !prevSort); // Toggle sort
  };

  // Sort the filtered data if sorting is enabled
  const sortedData = [...filteredData].sort((a, b) => {
    return sortByPrice ? a.price - b.price : 0; // Sort by price if sortByPrice is true
  });

  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`); // Navigate to product details page using useNavigate
  };

  return (
    <div className={`p-5 ${isDarkTheme ? "bg-dark" : "bg-light"} my-4`}>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Pills Navigation */}
      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activePill === "all" ? "active" : ""}`}
            onClick={() => handlePillClick("all")}
          >
            All Products
          </button>
        </li>
        {categories.map((category, index) => (
          <li className="nav-item" key={index}>
            <button
              className={`nav-link ${activePill === category ? "active" : ""}`}
              onClick={() => handlePillClick(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {/* Sort by Price Button */}
      <button className="btn btn-outline-primary mb-3" onClick={handleSortByPrice}>
        Sort by Price {sortByPrice ? "Descending" : "Ascending"}
      </button>

      {/* Product Cards */}
      <div className="row">
        {sortedData.slice(0, visibleItemsCount).map((data, index) => (
          <Product
            data={data}
            key={index}
            onClick={() => viewProductDetails(data.id)} // Pass click handler
          />
        ))}
      </div>

      {/* Show More Button */}
      {visibleItemsCount < sortedData.length && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}
      <BackToTopButton />
    </div>
  );
}

// Define PropTypes for the Homepage component
// Homepage.propTypes = {
//   // No props are passed to this component currently
// };

export default Homepage;

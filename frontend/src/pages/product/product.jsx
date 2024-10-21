import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ShopContext } from "../context/shop-context";

function Product({ data }) {
  const [showDescription, setShowDescription] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems, currency } = useContext(ShopContext);
  const [currencyReference, setCurrencyReference] = useState('₦');

  // Check if the product is in the wishlist
  const isInWishlist = wishlistItems[data.id] !== undefined && wishlistItems[data.id] !== 0;

  useEffect(() => {
    if (currency === "naira") {
      setCurrencyReference('₦');
    } else {
      setCurrencyReference('$');
    }
  }, [currency]);

  function toggleDescription() {
    setShowDescription(prevState => !prevState);
  }

  return (
    <div className="col-md-4 mb-4">
      <div className={`card shadow-lg ${currency === 'naira' ? 'bg-light' : 'bg-dark'} rounded-lg position-relative`}>
        <img src={data.images} alt={data.name} className="card-img-top" style={{ borderRadius: '10px' }} />
        
        {/* Wishlist button as a heart icon */}
        <button
          className={`btn position-absolute top-2 end-2 text-light ${isInWishlist ? 'text-danger' : 'text-secondary'}`}
          onClick={() => isInWishlist ? removeFromWishlist(data.id) : addToWishlist(data.id)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <i className={`fa-solid fa-heart fa-lg ${isInWishlist ? 'text-danger' : 'text-secondary'}`}></i>
        </button>

        <div className="card-body text-center">
          <h5 className={`card-title ${currency === 'naira' ? 'text-dark' : 'text-light'}`}>{data.name}</h5>
          <p className={`card-text ${currency === 'naira' ? 'text-dark' : 'text-light'}`}>
            Price: {currencyReference}{data.price}
          </p>
          <p className="card-text text-muted">Category: {data.category}</p>

          {/* Toggle description button */}
          <button
            className="btn btn-sm mx-2 text-light"
            style={{ backgroundColor: "#8e44ad", borderRadius: "20px" }}
            onClick={toggleDescription}
          >
            {showDescription ? "Hide Description" : "Show Description"}
          </button>

          {/* Add to Cart button */}
          <button
            className="btn btn-sm text-light my-2"
            style={{ background: "linear-gradient(45deg, #8e44ad, #6a1b9a)", borderRadius: "20px" }}
            onClick={() => addToCart(data.id)}
          >
            Add to Cart
          </button>

          {/* Description text */}
          {showDescription && <p className={`mt-3 ${currency === 'naira' ? 'text-dark' : 'text-light'}`}>{data.description}</p>}
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired,
};

export default Product;

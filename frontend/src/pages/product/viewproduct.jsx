import  { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "./product-data"; // Ensure the path is correct
import "./viewproduct.css"; // Add some styling

function ViewProduct() {
  const { productId } = useParams(); // Get the product ID from the URL
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems, currency } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [currencyReference, setCurrencyReference] = useState('₦');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Set the currency reference based on the currency from context
    if (currency === "naira") {
      setCurrencyReference('₦');
    } else {
      setCurrencyReference('$');
    }
  }, [currency]);

  useEffect(() => {
    // Find the product based on productId
    const foundProduct = PRODUCTS.find((item) => item.id === parseInt(productId));
    setProduct(foundProduct);
  }, [productId]);

  if (!product) return <p>Loading product...</p>;

  const isInWishlist = wishlistItems[product.id] !== undefined && wishlistItems[product.id] !== 0;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="container view-product-page">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img src={product.images} alt={product.name} className="img-fluid rounded" />
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="text-muted">Category: {product.category}</p>
          <p className="lead">{currencyReference}{product.price}</p>
          <p>{product.description}</p>

          {/* Quantity Selector */}
          <div className="quantity-selector my-3">
            <label htmlFor="quantity" className="form-label">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            className="btn btn-primary my-3"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Wishlist Button */}
          <button
            className={`btn ${isInWishlist ? "btn-danger" : "btn-outline-danger"} mx-2`}
            onClick={handleWishlistToggle}
          >
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;

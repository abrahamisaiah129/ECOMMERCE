import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "./product-data"; // Ensure the path is correct
import CommentForm from './CommentForm'; // Import the CommentForm component
import CommentList from './CommentList'; // Import the CommentList component
import "./viewproduct.css"; // Add some styling

function ViewProduct() {
  const { productId } = useParams(); // Get the product ID from the URL
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems, currency } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [currencyReference, setCurrencyReference] = useState('₦');
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]); // State for storing comments

  useEffect(() => {
    // Set the currency reference based on the currency from context
    setCurrencyReference(currency === "naira" ? '₦' : '$');
  }, [currency]);

  useEffect(() => {
    // Find the product based on productId
    const foundProduct = PRODUCTS.find((item) => item.id === parseInt(productId));
    setProduct(foundProduct);
  }, [productId]);

  useEffect(() => {
    // Fetch comments based on productId (you can replace this with an API call)
    const fetchedComments = []; // Replace with actual fetching logic
    setComments(fetchedComments);
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

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
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

      {/* Comments Section */}
      <div className="comments-section my-4">
        <CommentForm productId={productId} onCommentAdded={handleCommentAdded} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}

export default ViewProduct;

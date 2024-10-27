import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "./product-data"; 
import CommentForm from './CommentForm'; 
import CommentList from './CommentList'; 
import "./viewproduct.css"; 

function ViewProduct() {
  const { productId } = useParams();
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems, currency, comments, addComment } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [currencyReference, setCurrencyReference] = useState('₦');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setCurrencyReference(currency === "naira" ? '₦' : '$');
  }, [currency]);

  useEffect(() => {
    const foundProduct = PRODUCTS.find((item) => item.id === parseInt(productId));
    setProduct(foundProduct);
  }, [productId]);

  if (!product) return <p>Loading product...</p>;

  const isInWishlist = wishlistItems[product.id] !== undefined && wishlistItems[product.id] !== 0;

  const handleAddToCart = () => {
    if (product.stock >= quantity) {
      addToCart(product.id, quantity);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const productComments = comments ? comments.filter(comment => comment.productId === parseInt(productId)) : [];

  const handleCommentAdded = (newComment) => {
    addComment(product.id, newComment);
  };

  return (
    <div className="container view-product-page">
      <div className="row">
        <div className="col-md-6">
          <img src={product.images} alt={product.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="text-muted">Category: {product.category}</p>
          <p className="lead">{currencyReference}{product.price}</p>
          <p>{product.description}</p>
          <p>{product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}</p>
          <div className="quantity-selector my-3">
            <label htmlFor="quantity" className="form-label">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => {
                const value = Math.max(1, Math.min(product.stock, e.target.value));
                setQuantity(value);
              }}
              min="1"
              max={product.stock}
            />
          </div>
          <button
            className="btn btn-primary my-3"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            Add to Cart
          </button>
          <button
            className={`btn ${isInWishlist ? 'btn-danger' : 'btn-outline-secondary'}`}
            onClick={handleWishlistToggle}
          >
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>

      <CommentForm productId={String(product.id)} onCommentAdded={handleCommentAdded} />
      <CommentList comments={productComments} />
    </div>
  );
}

export default ViewProduct;

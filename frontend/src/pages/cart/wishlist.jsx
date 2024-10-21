import  { useContext } from "react";
import { ShopContext } from '../context/shop-context';
import { PRODUCTS } from "../product/product-data.js";
import { Link } from "react-router-dom";
import './wishlist.css'; // Add any necessary styling here

const Wishlist = () => {
  const { wishlistItems, addToCart, removeFromWishlist } = useContext(ShopContext);

  return (
    <div className="container mt-5">
      <h2 className="text-white fw-bold">My Wishlist</h2>
      {Object.keys(wishlistItems).length === 0 ? (
        <p className="text-white">Your wishlist is empty.</p>
      ) : (
        <div className="row">
          {PRODUCTS.map((product) => {
            if (wishlistItems[product.id] !== 0) {
              return (
                <div key={product.id} className="col-md-4 mb-3">
                  <div className="card h-100">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price}</p>
                      <Link to={`/product/${product.id}`} className="btn btn-primary">
                        View Product
                      </Link>
                      <button
                        className="btn btn-danger m-2"
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        Remove from Wishlist
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => addToCart(product.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

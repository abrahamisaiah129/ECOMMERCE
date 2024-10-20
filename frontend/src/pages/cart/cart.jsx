import {
  useContext,
  useEffect,
  useState
} from "react";
import { ShopContext } from "../context/shop-context.jsx";
import { PRODUCTS } from "../product/product-data.js";
import CartItem from "./cart-items.jsx";
import { ThemeContext } from "../context/theme-context.jsx";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0); 
  const { cartItems, currency } = useContext(ShopContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const [currencyReference, setCurrencyReference] = useState('₦');

  useEffect(() => {
    if (currency === "naira") {
      setCurrencyReference('₦');
    } else {
      setCurrencyReference('$');
    }
  }, [currency]);

  useEffect(() => {
    const funcSetTotalPrice = () => {
      let currentPrice = 0;
      PRODUCTS.forEach((product) => {
        if (cartItems[product.id] > 0) {
          currentPrice += product.price * cartItems[product.id];
        }
      });
      setTotalPrice(currentPrice);
    };
    
    funcSetTotalPrice();
  }, [cartItems]);

  const handleCheckout = () => {
    // Implement checkout logic here
    toast.success("Checkout successful!"); // Show success message
  };

  return (
    <div className={`p-5 ${isDarkTheme ? "bg-dark" : "bg-light"}`}>
      <h1 className="text-success">Your Cart Items</h1>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] > 0) {
            return (
              <CartItem
                dataValue={product}
                pieceNumber={cartItems[product.id]}
                key={product.id}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="text-primary fw-bold col-lg-1 col-md-3 col-sm-3 col-xs-30 card d-flex justify-content-center align-items-center p-1 m-2">
        {'Price :'} {currencyReference} {totalPrice}
      </div>
      <button 
        className={`btn btn-${isDarkTheme ? 'light' : 'dark'} mb-2`}
        onClick={handleCheckout}
      >
        Checkout
      </button>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default Cart;

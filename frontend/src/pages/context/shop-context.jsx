import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types"; 
import { PRODUCTS } from "../product/product-data";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i <= PRODUCTS.length; i++) {
        cart[i] = 0;
    }
    return cart;
};

const getDefaultWishList = () => {
    let wishList = {};
    for (let i = 1; i <= PRODUCTS.length; i++) {
        wishList[i] = 0;
    }
    return wishList;
};

export const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [wishlistItems, setWishlistItems] = useState(getDefaultWishList());
    const [currency, setCurrency] = useState('naira');
    const [comments, setComments] = useState([]);
    
    const MAX_QUANTITY = 99; // Set a maximum quantity limit

    const changeCurrency = useCallback((newCurrency) => {
        if (newCurrency !== currency) {
            setCurrency(newCurrency);
            const symbol = newCurrency === 'naira' ? '₦' : '$';
            toast.success(`Currency changed to ${symbol}`);
        }
    }, [currency]);

    const deleteFromCart = useCallback((id) => {
        setCartItems((prev) => {
            toast.info(`Removed item with id ${id} from cart`);
            return { ...prev, [id]: 0 };
        });
    }, []);

    const inputNumberFunc = useCallback((value, id) => {
        const quantity = Number(value);
        if (quantity < 0 || quantity > MAX_QUANTITY) {
            toast.error(`Quantity must be between 0 and ${MAX_QUANTITY}`);
            return;
        }
        setCartItems((prev) => {
            toast.info(`Quantity for item with id ${id} updated to ${quantity}`);
            return { ...prev, [id]: quantity };
        });
    }, []);

    const addToCart = useCallback((itemId) => {
        setCartItems((prev) => {
            const newCount = prev[itemId] + 1;
            toast.success(`Added item with id ${itemId} to cart`);
            return { ...prev, [itemId]: newCount };
        });
    }, []);

    const removeFromCart = useCallback((itemId) => {
        setCartItems((prev) => {
            const newCount = prev[itemId] - 1;
            const count = newCount > 0 ? newCount : 0;
            if (newCount <= 0) {
                toast.warn(`Item with id ${itemId} removed from cart`);
            }
            return { ...prev, [itemId]: count };
        });
    }, []);

    const addToWishlist = useCallback((itemId) => {
        setWishlistItems((prev) => {
            if (prev[itemId] > 0) {
                toast.warn(`Item with id ${itemId} is already in the wishlist`);
                return prev; // Item already in wishlist, return unchanged
            }
            const newCount = prev[itemId] + 1;
            toast.success(`Added item with id ${itemId} to wishlist`);
            return { ...prev, [itemId]: newCount };
        });
    }, []);

    const removeFromWishlist = useCallback((itemId) => {
        setWishlistItems((prev) => {
            const newCount = prev[itemId] - 1;
            const count = newCount > 0 ? newCount : 0;
            if (newCount <= 0) {
                toast.warn(`Item with id ${itemId} removed from wishlist`);
            }
            return { ...prev, [itemId]: count };
        });
    }, []);

  // Define the addComment function
  const addComment = (productId, comment) => {
    setComments((prevComments) => [
      ...prevComments,
      { productId, ...comment }, // Adjust this based on your comment structure
    ]);
  };
    const contextValue = {
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        inputNumberFunc,
        deleteFromCart,
        changeCurrency,
        currency,
        removeFromWishlist,
        addToWishlist,
        addComment,
        comments
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

// Define PropTypes for the component
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

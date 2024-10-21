import { createContext, useState } from "react";
import PropTypes from "prop-types"; 
import { PRODUCTS } from "../product/product-data";
import { toast } from "react-toastify"; // Import toast

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i <= PRODUCTS.length; i++) {
        cart[i] = 0; // Initialize cart with 0 quantity for each product
    }
    return cart;
}

const getDefaultWishList = () => {
    let wishList = {};
    for (let i = 1; i <= PRODUCTS.length; i++) {
        wishList[i] = 0; // Initialize cart with 0 quantity for each product
    }
    return wishList;
}

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [wishlistItems, setwishlistItems] = useState(getDefaultWishList());
    const [currency, setChangeCurrency] = useState('naira');

    const changeCurrency = (newCurrency) => {
        if (newCurrency !== currency) { 
            setChangeCurrency(newCurrency);
            const symbol = newCurrency === 'naira' ? '₦' : '$';
            toast.success(`Currency changed to ${symbol}`); // Show success notification
        }
    }

    const deleteFromCart = (id) => {
        setCartItems((prev) => {
            toast.info(`Removed item with id ${id} from cart`); // Show info notification
            return { ...prev, [id]: 0 }; // Reset the quantity to 0 for the item
        });
    }

    const inputNumberFunc = (value, id) => {
        const quantity = Number(value);
        if (quantity < 0) return; // Prevent setting negative values
        setCartItems((prev) => {
            toast.info(`Quantity for item with id ${id} updated to ${quantity}`); // Show info notification
            return { ...prev, [id]: quantity }; // Update the quantity
        });
    }

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const newCount = prev[itemId] + 1;
            toast.success(`Added item with id ${itemId} to cart`); // Show success notification
            return { ...prev, [itemId]: newCount }; // Increment the quantity
        });
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCount = prev[itemId] - 1;
            const count = newCount > 0 ? newCount : 0; // Ensure quantity doesn't go below 0
            if (newCount <= 0) {
                toast.warn(`Item with id ${itemId} removed from cart`); // Show warning notification
            }
            return { ...prev, [itemId]: count }; // Update the quantity
        });
    }

    const addToWishlist = (itemId) => {
        setwishlistItems((prev) => {
            const newCount = prev[itemId] + 1;
            toast.success(`Added item with id ${itemId} to wishlist`); // Show success notification
            return { ...prev, [itemId]: newCount }; // Increment the quantity
        });
    }

    const removeFromWishlist = (itemId) => {
        setwishlistItems((prev) => {
            const newCount = prev[itemId] - 1;
            const count = newCount > 0 ? newCount : 0; // Ensure quantity doesn't go below 0
            if (newCount <= 0) {
                toast.warn(`Item with id ${itemId} removed from wishlist`); // Show warning notification
            }
            return { ...prev, [itemId]: count }; // Update the quantity
        });
    }

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
        addToWishlist
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

// Define PropTypes for the component
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

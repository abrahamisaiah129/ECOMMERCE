import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from '../context/shop-context';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function CartItem(props) {
    const { removeFromCart, addToCart, inputNumberFunc, deleteFromCart } = useContext(ShopContext);
    const { name, imageUrl, price, discount, id } = props.dataValue;
    const piece = props.pieceNumber;

    const [input, setInput] = useState(piece); // Initialize with the current piece number

    useEffect(() => {
        setInput(piece); // Update input when piece changes
    }, [piece]);

    const setValueFunc = (e) => {
        const value = Math.max(1, parseInt(e.target.value)); // Ensure minimum value is 1
        setInput(value);
        inputNumberFunc(value, id); // Pass the id and new value to update quantity
    };

    return (
        <div className="col-sm-4 col-xs-8 col-lg-3 col-md-3 m-2 card p-3 shadow-sm" style={{ fontSize: "1rem", borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
            <div id={id} className="d-flex flex-column justify-content-center align-items-center">
                <img 
                    src={imageUrl} 
                    alt="Product" 
                    className="img-fluid mb-3" 
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }} 
                />
                
                {/* Wrap the product name with a Link to the product detail page */}
                <Link to={`/product/${id}`} className="text-center fw-bold" style={{ fontSize: "1.2rem", textDecoration: 'none', color: '#333' }}>
                    {name}
                </Link>

                <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                    <div className="fw-bold" style={{ color: "#333" }}>N{price}</div>
                    {discount > 0 && (
                        <div className="text-muted" style={{ fontSize: "0.9rem", textDecoration: "line-through" }}>
                            -N{discount}
                        </div>
                    )}
                </div>

                <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                    <div>{piece > 1 ? `${piece} pieces` : '1 piece'}</div>
                </div>

                <div className="d-flex align-items-center justify-content-between w-100 mt-3">
                    {/* Decrease Quantity Button */}
                    <button 
                        className="btn btn-sm btn-outline-danger d-flex justify-content-center align-items-center" 
                        style={{ width: "35px", height: "35px" }} 
                        onClick={() => removeFromCart(id)}
                    >
                        <i className="fa fa-minus"></i>
                    </button>

                    {/* Quantity Input */}
                    <input 
                        className="form-control text-center mx-2" 
                        style={{ width: '60px', borderRadius: '10px' }} 
                        type="number" 
                        onChange={setValueFunc} 
                        value={input} 
                        min="1"
                    />

                    {/* Increase Quantity Button */}
                    <button 
                        className="btn btn-sm btn-outline-success d-flex justify-content-center align-items-center" 
                        style={{ width: "35px", height: "35px" }} 
                        onClick={() => addToCart(id)}
                    >
                        <i className="fa fa-plus"></i>
                    </button>

                    {/* Delete Button */}
                    <button 
                        className="btn btn-sm btn-outline-danger d-flex justify-content-center align-items-center" 
                        style={{ width: "35px", height: "35px" }} 
                        onClick={() => deleteFromCart(id)}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    dataValue: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
    pieceNumber: PropTypes.number.isRequired, // Updated for a single numeric prop
};

export default CartItem;

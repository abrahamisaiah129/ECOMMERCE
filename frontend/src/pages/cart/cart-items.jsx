import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { ShopContext } from '../context/shop-context';

function CartItem(props) {
    const { removeFromCart, addToCart, inputNumberFunc, deleteFromCart } = useContext(ShopContext);
    const { name, images, price, discount, id } = props.dataValue;
    const piece = props.pieceNumber;

    const [input, setInput] = useState(''); // Set it blank to avoid errors

    const setValueFunc = (e) => {
        const value = e.target.value;
        setInput(value);
        inputNumberFunc(value, id); // Pass the id and new value to update quantity
    };

    return (
        <div className="col-sm-4 col-xs-8 col-lg-3 col-md-3 m-2 card p-3 shadow-sm" style={{ fontSize: "1rem", borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
            <div id={id} className="d-flex flex-column justify-content-center align-items-center">
                <img 
                    src={images} 
                    alt="Product" 
                    className="img-fluid mb-3" 
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }} 
                />
                
                <div className="text-center fw-bold" style={{ fontSize: "1.2rem" }}>{name}</div>

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
        images: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
    pieceNumber: PropTypes.number.isRequired, // Updated for a single numeric prop
};

export default CartItem;

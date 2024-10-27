import PropTypes from 'prop-types'; // Import PropTypes

const Product = ({ data, onClick }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card" onClick={onClick} style={{ cursor: "pointer" }}>
        <img src={data.imageUrl} className="card-img-top" alt={data.name} />
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text">Price: ₦{data.price}</p>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the Product component
Product.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Product;

import './ordertracking.css'; // Create a CSS file for styling
import { useContext } from 'react';
import { ThemeContext } from "../context/theme-context.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const OrderTracking = () => {
  const { isDarkTheme } = useContext(ThemeContext); // Assuming you have a ThemeContext that provides dark mode state

  const orderDetails = {
    orderId: '123456',
    customerName: 'John Doe',
    orderStatus: 'In Transit', // Example statuses: 'Pending', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'
    trackingUpdates: [
      { date: '2024-10-18', status: 'Order Placed', completed: true },
      { date: '2024-10-19', status: 'Shipped', completed: true },
      { date: '2024-10-20', status: 'Out for Delivery', completed: false },
      { date: '2024-10-21', status: 'Delivered', completed: false },
    ],
  };

  return (
    <div className={`order-tracking p-4 ${isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <h2 className="gradient-text">Order Tracking</h2>
      <h4>Order ID: {orderDetails.orderId}</h4>
      <h5>Customer Name: {orderDetails.customerName}</h5>
      <h5>Status: <span className={orderDetails.orderStatus === 'Delivered' ? 'text-success' : 'text-warning'}>{orderDetails.orderStatus}</span></h5>
      <h6>Tracking Updates:</h6>
      <ul className="tracking-list">
        {orderDetails.trackingUpdates.map((update, index) => (
          <li key={index} className={`tracking-item ${update.completed ? 'completed' : ''}`}>
            <FontAwesomeIcon icon={faCheckCircle} className={`me-2 ${update.completed ? 'text-success' : 'text-muted'}`} />
            <strong>{update.date}:</strong> {update.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderTracking;

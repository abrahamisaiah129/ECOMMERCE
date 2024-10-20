import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './form.css'; 
import { useState } from 'react';

const UserProfileForm = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St",
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  // Validate card details
  const validateCardDetails = () => {
    const { cardNumber, expirationDate, cvv } = editedData;
    const isValidCardNumber = /^[0-9]{16}$/.test(cardNumber);
    const isValidExpirationDate = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate);
    const isValidCvv = /^[0-9]{3}$/.test(cvv);
    
    return isValidCardNumber && isValidExpirationDate && isValidCvv;
  };

  // Save edited data
 const handleSave = () => {
  try {
    if (validateCardDetails()) {
      setUserData(editedData);
      setIsEditing(false);
      toast.success('Profile updated successfully!', {
        position: 'top-center', // Use string directly if POSITION is undefined
        className: 'custom-toast',
      });
    } else {
      toast.error('Please enter valid card details!', {
        position: 'top-center',
        className: 'custom-toast',
      });
    }
  } catch (error) {
    console.error('Toast error:', error);
  }
};

  return (
    <div className="user-profile">
      <h3 className="gradient-text">User Profile</h3>
      
      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Cardholder Name:</strong> {userData.cardholderName || 'N/A'}</p>
          <p><strong>Card Number:</strong> {userData.cardNumber ? '**** **** **** ' + userData.cardNumber.slice(-4) : 'N/A'}</p>
          <p><strong>Expiration Date:</strong> {userData.expirationDate || 'N/A'}</p>
          <p><strong>CVV:</strong> {userData.cvv ? '***' : 'N/A'}</p>
          <button className="btn edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      ) : (
        <div className="edit-form">
          <label>Name: </label>
          <input 
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
          />
          <label>Email: </label>
          <input 
            type="email"
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
          />
          <label>Address: </label>
          <input 
            type="text"
            name="address"
            value={editedData.address}
            onChange={handleInputChange}
          />
          <label>Cardholder Name: </label>
          <input 
            type="text"
            name="cardholderName"
            value={editedData.cardholderName}
            onChange={handleInputChange}
          />
          <label>Card Number: </label>
          <input 
            type="text"
            name="cardNumber"
            value={editedData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
          />
          <label>Expiration Date: </label>
          <input 
            type="text"
            name="expirationDate"
            value={editedData.expirationDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
          />
          <label>CVV: </label>
          <input 
            type="text"
            name="cvv"
            value={editedData.cvv}
            onChange={handleInputChange}
            placeholder="123"
          />
          <label>Billing Address (optional): </label>
          <input 
            type="text"
            name="billingAddress"
            value={editedData.billingAddress}
            onChange={handleInputChange}
          />
          <button className="btn save-btn" onClick={handleSave}>Save</button>
        </div>
      )}

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
};

export default UserProfileForm;

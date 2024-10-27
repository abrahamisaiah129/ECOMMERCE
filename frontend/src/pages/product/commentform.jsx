import  { useState } from 'react';
import PropTypes from 'prop-types';
import './CommentForm.css'; // Add your custom CSS for styling the stars

const CommentForm = ({ productId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); // Initialize rating to 0
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { text: comment, rating, productId, userName };
    
    // Call the parent function to add the comment
    onCommentAdded(newComment);
    
    // Clear the input fields
    setComment('');
    setRating(0);
    setUserName('');
  };

  const handleStarClick = (index) => {
    setRating(index + 1); // Set rating based on clicked star
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          id="userName"
          className="form-control"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
<p className='text-primary'>give your rating</p>
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? 'filled' : ''}`}
            onClick={() => handleStarClick(index)}
          >
            ★
          </span>
        ))}
      </div>

      <button type="submit" className="btn btn-primary">Submit Comment</button>
    </form>
  );
};

// Prop validation
CommentForm.propTypes = {
  productId: PropTypes.string.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
};

export default CommentForm;

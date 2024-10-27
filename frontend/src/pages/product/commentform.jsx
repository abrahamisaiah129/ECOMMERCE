import { useState } from 'react';
import PropTypes from 'prop-types';

function CommentForm({ productId, onCommentAdded }) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Include productId in the newComment object
    const newComment = {
      productId: productId, // Assign productId here
      text: commentText,
    };

    onCommentAdded(newComment); // Pass newComment to the parent component
    setCommentText(""); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

// Prop validation
CommentForm.propTypes = {
  productId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number // Accept both string and number
  ]).isRequired,
  onCommentAdded: PropTypes.func.isRequired
};

export default CommentForm;

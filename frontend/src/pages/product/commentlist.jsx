import PropTypes from 'prop-types';

const CommentList = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <div key={index} className="comment">
            <p><strong>{comment.userName}</strong>:</p>
            <p>{comment.text}</p>
            <div className="rating-display">
              {Array.from({ length: comment.rating }, (_, i) => (
                <span key={i} className="star filled">★</span>
              ))}
              {Array.from({ length: 5 - comment.rating }, (_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Prop validation
CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      productId: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CommentList;

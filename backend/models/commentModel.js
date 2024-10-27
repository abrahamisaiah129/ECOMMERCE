import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 }, // Optional: If rating is also provided in comments
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
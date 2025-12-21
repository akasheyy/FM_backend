import mongoose from 'mongoose';
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  image: {
    url: String,
    public_id: String
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  available: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);

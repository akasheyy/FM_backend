import mongoose from 'mongoose';
const testimonialSchema = new mongoose.Schema({
  author: String,
  content: String,
  rating: { type: Number, min: 1, max: 5 },
  photo: {
    url: String,
    public_id: String
  },
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);

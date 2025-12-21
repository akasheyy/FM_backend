import mongoose from 'mongoose';
const gallerySchema = new mongoose.Schema({
  url: String,
  public_id: String,
  caption: String
}, { timestamps: true });

export default mongoose.model('GalleryImage', gallerySchema);

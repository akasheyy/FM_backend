import GalleryImage from '../models/GalleryImage.js';
import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file' });
  const img = await GalleryImage.create({
    url: req.file.path,
    public_id: req.file.filename || req.file.public_id,
    caption: req.body.caption || ''
  });
  res.status(201).json(img);
};

export const listImages = async (req, res) => {
  const limit = parseInt(req.query.limit) || 0; // 0 → no limit
  const imgs = await GalleryImage.find()
    .sort({ createdAt: -1 })
    .limit(limit);

  res.json(imgs);
};


export const deleteImage = async (req, res) => {
  const img = await GalleryImage.findById(req.params.id);
  if (!img) return res.status(404).json({ message: 'Not found' });

  // Delete from Cloudinary
  if (img.public_id) {
    await cloudinary.uploader.destroy(img.public_id).catch(console.error);
  }

  // Delete from MongoDB
  await img.deleteOne();

  res.json({ message: 'Deleted' });
};


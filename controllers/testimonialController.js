import Testimonial from '../models/Testimonial.js';
import cloudinary from '../config/cloudinary.js';

export const createTestimonial = async (req, res) => {
  let photo = null;
  if (req.file) {
    photo = { url: req.file.path, public_id: req.file.filename || req.file.public_id };
  }
  const t = await Testimonial.create({ author: req.body.author, content: req.body.content, rating: req.body.rating, photo });
  res.status(201).json(t);
};

export const listTestimonials = async (req, res) => {
  const items = await Testimonial.find({ published: true }).sort({ createdAt: -1 });
  res.json(items);
};

export const deleteTestimonial = async (req, res) => {
  const t = await Testimonial.findById(req.params.id);
  if (!t) return res.status(404).json({ message: 'Not found' });
  if (t.photo?.public_id) await cloudinary.uploader.destroy(t.photo.public_id).catch(console.error);
  await t.remove();
  res.json({ message: 'Deleted' });
};

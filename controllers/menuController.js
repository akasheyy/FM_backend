import MenuItem from '../models/MenuItem.js';
import Category from '../models/Category.js';
import cloudinary from '../config/cloudinary.js';

export const createCategory = async (req, res) => {
  const cat = await Category.create(req.body);
  res.status(201).json(cat);
};

export const listCategories = async (req, res) => {
  const cats = await Category.find().sort({ order: 1 });
  res.json(cats);
};

export const createMenuItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  let image = null;
  if (req.file) {
    // multer-storage-cloudinary will set req.file.path = cloudinary url and req.file.filename maybe public_id
    image = { url: req.file.path, public_id: req.file.filename || req.file.public_id };
  }
  const item = await MenuItem.create({ name, description, price, category, image });
  res.status(201).json(item);
};

export const listMenuItems = async (req, res) => {
  const items = await MenuItem.find().populate('category').sort({ createdAt: -1 });
  res.json(items);
};

export const updateMenuItem = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });

  // if new file uploaded, delete old from cloudinary
  if (req.file && item.image?.public_id) {
    await cloudinary.uploader.destroy(item.image.public_id).catch(console.error);
    item.image = { url: req.file.path, public_id: req.file.filename || req.file.public_id };
  }

  Object.assign(item, req.body);
  await item.save();
  res.json(item);
};

export const deleteMenuItem = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  if (item.image?.public_id) await cloudinary.uploader.destroy(item.image.public_id).catch(console.error);
  await item.remove();
  res.json({ message: 'Deleted' });
};

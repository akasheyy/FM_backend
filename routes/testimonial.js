import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { protect } from '../middleware/auth.js';
import * as tCtrl from '../controllers/testimonialController.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'catering/testimonials' }
});
const upload = multer({ storage });

const router = express.Router();
router.post('/', protect, upload.single('photo'), tCtrl.createTestimonial);
router.get('/', tCtrl.listTestimonials);
router.delete('/:id', protect, tCtrl.deleteTestimonial);

export default router;

import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { protect } from '../middleware/auth.js';
import * as galleryCtrl from '../controllers/galleryController.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'catering/gallery',
  },
});
const upload = multer({ storage });

const router = express.Router();
router.post('/', protect, upload.single('image'), galleryCtrl.uploadImage);
router.get('/', galleryCtrl.listImages);
router.delete('/:id', protect, galleryCtrl.deleteImage);

export default router;

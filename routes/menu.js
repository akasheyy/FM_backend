import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { protect } from '../middleware/auth.js';
import * as menuCtrl from '../controllers/menuController.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'catering/menu',
    allowed_formats: ['jpg','png','jpeg','webp'],
  },
});
const upload = multer({ storage });

const router = express.Router();
router.post('/categories', protect, menuCtrl.createCategory);
router.get('/categories', menuCtrl.listCategories);

router.post('/', protect, upload.single('image'), menuCtrl.createMenuItem);
router.get('/', menuCtrl.listMenuItems);
router.put('/:id', protect, upload.single('image'), menuCtrl.updateMenuItem);
router.delete('/:id', protect, menuCtrl.deleteMenuItem);

export default router;

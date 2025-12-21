import express from 'express';
import { login, register } from '../controllers/authController.js';
const router = express.Router();

router.post('/login', login);

// register is optional — remove or protect in production
router.post('/register', register);

export default router;

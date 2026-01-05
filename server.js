import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'express-async-errors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import menuRoutes from './routes/menu.js';
import galleryRoutes from './routes/gallery.js';
import testimonialRoutes from './routes/testimonial.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();

// middlewares
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3003",
  "http://localhost:5173/",
  "http://10.0.0.0/16",
  "http://192.168.1.0/24",
  "http://127.0.0.1",
  "https://fm-admin-panal.vercel.app/",
  "https://fm-frontend-lyart.vercel.app/"
];

app.use(cors({
  origin: "*",
  credentials: true
}));



app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// connect db
connectDB();

// routesy
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);

// health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// error handling
app.use(errorHandler);

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

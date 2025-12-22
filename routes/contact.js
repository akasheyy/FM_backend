import express from "express";
import {
  createContact,
  listContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC — user submits booking
router.post("/", createContact);

// ADMIN — list all bookings
router.get("/", protect, listContacts);

// ADMIN — view single booking
router.get("/:id", protect, getContact);

// ADMIN — update booking (responded / notes)
router.put("/:id", protect, updateContact);

// ADMIN — delete booking
router.delete("/:id", protect, deleteContact);

export default router;

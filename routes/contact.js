import express from "express";
import {
  createContact,
  listContacts,
  getContact,
  updateContact
} from "../controllers/contactController.js";

const router = express.Router();

// User submits contact form
router.post("/", createContact);

// Admin — list all bookings
router.get("/", listContacts);

// Admin — view single booking
router.get("/:id", getContact);

// Admin — update booking status
router.put("/:id", updateContact);

export default router;

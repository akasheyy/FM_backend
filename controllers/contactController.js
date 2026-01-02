import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/sendEmail.js";

/* ===============================
   CREATE CONTACT (BOOKING)
================================ */
export const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      place,
      eventType,
      date,
      guests,
      message,
    } = req.body;

    // ✅ Basic validation
    if (
      !name ||
      !email ||
      !phone ||
      !place ||
      !eventType ||
      !date ||
      !guests ||
      !message
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ Save booking to DB
    const newEntry = await Contact.create({
      name,
      email,
      phone,
      place,
      eventType,
      date,
      guests,
      message,
    });

    // ✅ Email HTML
    const messageHtml = `
      <h2>📩 New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Place:</strong> ${place}</p>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Guests:</strong> ${guests}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // ✅ Try sending email (DO NOT BLOCK BOOKING)
    try {
      await sendEmail("New Booking Request", messageHtml);
    } catch (emailError) {
      console.error("⚠️ Email failed, booking saved:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Booking submitted successfully",
      data: newEntry,
    });
  } catch (error) {
    console.error("❌ CREATE CONTACT ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ===============================
   LIST ALL BOOKINGS (ADMIN)
================================ */
export const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("❌ LIST CONTACTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

/* ===============================
   GET SINGLE BOOKING
================================ */
export const getContact = async (req, res) => {
  try {
    const item = await Contact.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("❌ GET CONTACT ERROR:", error);
    res.status(500).json({ message: "Failed to fetch booking" });
  }
};

/* ===============================
   UPDATE BOOKING (OPTIONAL)
================================ */
export const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("❌ UPDATE CONTACT ERROR:", error);
    res.status(500).json({ message: "Failed to update booking" });
  }
};

/* ===============================
   DELETE BOOKING
================================ */
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await contact.deleteOne();

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE CONTACT ERROR:", error);
    res.status(500).json({ message: "Failed to delete booking" });
  }
};

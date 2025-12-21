import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/sendEmail.js";

// CREATE (user submits form)
export const createContact = async (req, res) => {
  try {
    const newEntry = await Contact.create(req.body);

    const messageHtml = `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${req.body.name}</p>
      <p><strong>Email:</strong> ${req.body.email}</p>
      <p><strong>Phone:</strong> ${req.body.phone}</p>
      <p><strong>Place:</strong> ${req.body.place}</p>
      <p><strong>Event Type:</strong> ${req.body.eventType}</p>
      <p><strong>Date:</strong> ${req.body.date}</p>
      <p><strong>Guests:</strong> ${req.body.guests}</p>
      <p><strong>Message:</strong> ${req.body.message}</p>
    `;

    await sendEmail("New Booking Request", messageHtml);

    res.json({ success: true, message: "Booking submitted & email sent!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LIST ALL
export const listContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

// GET ONE
export const getContact = async (req, res) => {
  const item = await Contact.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

// UPDATE STATUS (optional)
export const updateContact = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

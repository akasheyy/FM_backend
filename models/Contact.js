import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    place: { type: String, required: true },
    eventType: { type: String, required: true },
    date: { type: String, required: true },

    guests: { type: Number, required: true },
    message: { type: String, required: true },

    // 🔔 NEW BOOKING FLAG (IMPORTANT)
    isNew: {
      type: Boolean,
      default: true,
    },

    // Optional (future use)
    responded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);

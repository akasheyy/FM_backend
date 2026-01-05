import GalleryImage from "../models/GalleryImage.js";
import cloudinary from "../config/cloudinary.js";

/* ===============================
   UPLOAD IMAGE
================================ */
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = await GalleryImage.create({
      url: req.file.path,
      public_id: req.file.public_id, // ✅ FIXED
      caption: req.body.caption || "Untitled",
    });

    res.status(201).json(image);
  } catch (error) {
    console.error("Upload image error:", error);
    res.status(500).json({
      message: "Failed to upload image",
    });
  }
};

/* ===============================
   LIST IMAGES
================================ */
export const listImages = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;

    const images = await GalleryImage.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json(images);
  } catch (error) {
    console.error("Fetch gallery error:", error);
    res.status(500).json({
      message: "Failed to fetch gallery images",
    });
  }
};

/* ===============================
   DELETE IMAGE
================================ */
export const deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // ✅ Delete from Cloudinary
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // ✅ Delete from MongoDB
    await image.deleteOne();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete image error:", error);
    res.status(500).json({
      message: "Failed to delete image",
    });
  }
};

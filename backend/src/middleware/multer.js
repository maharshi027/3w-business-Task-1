import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.utils.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    resource_type: "auto", // Automatically detects if it's an image or raw file
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Use underscores for recent versions
    transformation: [{ width: 1000, height: 1000, crop: "limit" }], // Optional: auto-resize to save space
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check both mimetype and extension for better security
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

export default upload;
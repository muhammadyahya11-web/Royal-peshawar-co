import multer from "multer";

// Multer memory storage for direct Cloudinary upload
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) =>
  file.mimetype.startsWith("image") ? cb(null, true) : cb(new Error("Only images allowed"), false);

const upload = multer({
  storage,
  limits: { files: 4, fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

export default upload;

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../../frontend/src/assets/books");

    // Ensure the directory exists or create it if not
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Destination folder for uploads
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using timestamp and original file extension
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName); // Use the generated filename for the uploaded file
  },
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // File is valid
  } else {
    cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed"), false);
  }
};

// Create multer instance with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // Apply file filter for validation
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;

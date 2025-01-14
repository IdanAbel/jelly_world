import express from "express";
import { uploadImage } from "../controllers/uploadController";
import multer from "multer";
import * as path from "path";
import { dirname, join } from "path";

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, join(__dirname, "../assets"));
    },
    filename: (req, file, cb) => {
      const uniqueFilename = `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`;
      cb(null, uniqueFilename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG, and GIF images are allowed."
        )
      );
    }
  },
});

router.post("/", upload.single("image"), uploadImage);

export default router;

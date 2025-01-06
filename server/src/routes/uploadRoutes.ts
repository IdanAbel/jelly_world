import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import multer, { DiskStorageOptions, FileFilterCallback } from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => any) => {
    console.log(file);
    cb(null, join(__dirname, '../../assets')); 
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => any) => {
    const uniqueFilename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    console.log(uniqueFilename);
    cb(null, uniqueFilename);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): any => {
    console.log(file);
  const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF images are allowed.')); 
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post('/', upload.single('image'), (req: Request, res: Response, next: NextFunction): any => {
  try {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    console.log('Uploaded image:', uploadedFile);

    const filePath = uploadedFile.path;
    const resultSlice = filePath.slice(filePath.indexOf('/assets/'));

    res.status(200).send(resultSlice);
  } catch (error) {
    next(error);
  }
});

export default router;

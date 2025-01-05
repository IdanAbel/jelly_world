import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import multer, { FileFilterCallback } from 'multer';

const router = express.Router();

const uploadsDirectory = join(__dirname, '../../uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueFilename);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
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

router.post('/', upload.single('image'), (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded.');
        }

        const uploadedFile = req.file;
        console.log('Uploaded file details:', uploadedFile);

        const relativePath = uploadedFile.path.replace(/\\/g, '/').split('/uploads/')[1];
        res.status(200).send(`/uploads/${relativePath}`);
    } catch (error) {
        next(error);
    }
});

export default router;

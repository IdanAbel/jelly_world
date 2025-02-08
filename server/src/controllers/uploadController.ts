import { Response } from "express";
import { customAsyncHandler } from "../common/customTypes";

const uploadImage = customAsyncHandler(async (req: any, res: Response) => {
  console.log("ssssssssssssssss");

  try {
    const uploadedFile = req.file;
    console.log("Uploaded image:", uploadedFile);
    if (!uploadedFile) {
      res.status(400).json({ message: "No file uploaded." });
      return
    }
    const filePath = uploadedFile.path;
    const resultSlice = filePath.slice(filePath.indexOf("/assets/"));

    res.status(200).send(filePath);
  } catch (error) {
    console.log(error);
  }
});

export { uploadImage };

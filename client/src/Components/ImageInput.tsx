import React, { useState, useEffect } from "react";
import { TextField, Typography, Box } from "@mui/material";

interface ImageInputProps {
  onChange: (file: File | null) => void;
  initialImage?: string | File | null;
}

const ImageInput: React.FC<ImageInputProps> = ({ onChange, initialImage = null }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage instanceof File) {
      setPreview(URL.createObjectURL(initialImage));
    } else if (typeof initialImage === "string") {
      setPreview(initialImage);
    } else {
      setPreview(null);
    }
  }, [initialImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && file.type.startsWith("image/")) {
      onChange(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
      onChange(null);
      setPreview(null);
    }
  };

  return (
    <Box>
      {preview && (
        <Box mb={2}>
          <img src={preview} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }} />
        </Box>
      )}
      <TextField
        fullWidth
        label="Upload Candy Image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
};

export default ImageInput;

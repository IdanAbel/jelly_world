import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

interface ImageInputProps {
    onChange: (file: File | null) => void;
    initialImage?: string | null;
}

const ImageInput: React.FC<ImageInputProps> = ({ onChange, initialImage = null }) => {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onChange(file);
        } else {
            alert('Please select a valid image file.');
            onChange(null);
        }
    };

    return (
        <Box>
            {!initialImage ? (
                <TextField
                    fullWidth
                    label="Upload Candy Image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    InputLabelProps={{ shrink: true }}
                />
            ) : (
                <Typography variant="caption" color="textSecondary">
                    Selected Image: {initialImage}
                </Typography>
            )}
        </Box>
    );
};

export default ImageInput;
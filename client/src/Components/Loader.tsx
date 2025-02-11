import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoaderProps {
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...' }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                gap: '10px',
                textAlign: 'center',
            }}
        >
            <CircularProgress
                sx={{
                    color: 'success.main',
                    size: 60,
                    thickness: 4,
                }}
            />
            <Typography
                sx={{
                    color: 'text.secondary',
                    fontSize: '1rem',
                }}
            >
                {message}
            </Typography>
        </Box>
    );
};

export default Loader;

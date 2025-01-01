import React from 'react';
import { Box, Divider } from '@mui/material';
import RegisterForm from './components/RegisterForm.tsx';

const Register: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
            }}
        >
            <RegisterForm />
            <Divider sx={{ width: '100%' }} />
        </Box>
    );
};

export default Register;

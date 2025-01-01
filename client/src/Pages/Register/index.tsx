import React from 'react';
import { Box, Divider } from '@mui/material';
import SelfRegister from './components/Register';

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
            <SelfRegister />
            <Divider sx={{ width: '100%' }} />
        </Box>
    );
};

export default Register;

import { Typography, Box } from '@mui/material';
import CandyList from "./components/CandyList.tsx";
import React from 'react';

const Home = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to Candy World
            </Typography>
            <CandyList />
        </Box>
    );
};

export default Home;
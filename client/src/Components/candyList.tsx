import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box, Typography, Checkbox, FormControlLabel, Stack } from '@mui/material';
import { listCandies } from '../Services/candyServices.tsx';
import CandyFilter from './candyFilter.tsx';
import { RootState } from '../store.ts';
import React from 'react';


const CandyList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMinecandies, setIsMinecandies] = useState(false);

    const dispatch = useDispatch();
    const { loading, candies, error } = useSelector((state: RootState) => state.candyList);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Fetch candies on component mount
    useEffect(() => {
        dispatch(listCandies(''));
    }, [dispatch]);

    const filtercandies = () => {
        return candies
            ?.filter((candy) =>
                candy.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            ?.filter((candy) => (isMinecandies ? candy.createdBy === userInfo?.id : true));
    };

    const handleFilterChange = (term: string) => {
        setSearchTerm(term);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMinecandies(event.target.checked);
    };

    const filteredcandies = filtercandies();

    return (
        <Box>
            <Stack direction="row" spacing={2} justifyContent="center">
                <CandyFilter onFilterChange={handleFilterChange} />
                {userInfo && (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isMinecandies}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="My candies"
                    />
                )}
            </Stack>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Box>
                    {filteredcandies?.length > 0 ? (
                        filteredcandies.map((candy) => (
                            <Typography key={candy.id} variant="h6">
                                {candy.name}
                            </Typography>
                        ))
                    ) : (
                        <Typography>No candies found</Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default CandyList;

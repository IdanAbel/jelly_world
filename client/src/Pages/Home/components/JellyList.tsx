import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box, Typography, Checkbox, FormControlLabel, Stack } from '@mui/material';
import { listJellies } from './JellyActions';
import JellyFilter from './JellyFilter';
import { RootState } from '../../../store';

interface JellyListProps {
    userInfo: { id: string | null } | null;
}

const JellyList: React.FC<JellyListProps> = ({ userInfo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMineJellies, setIsMineJellies] = useState(false);

    const dispatch = useDispatch();
    const { loading, jellies, error } = useSelector((state: RootState) => state.jellyList);

    // Fetch jellies on component mount
    useEffect(() => {
        dispatch(listJellies());
    }, [dispatch]);

    const filterJellies = () => {
        return jellies
            ?.filter((jelly) =>
                jelly.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            ?.filter((jelly) => (isMineJellies ? jelly.createdBy === userInfo?.id : true));
    };

    const handleFilterChange = (term: string) => {
        setSearchTerm(term);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMineJellies(event.target.checked);
    };

    const filteredJellies = filterJellies();

    return (
        <Box>
            <Stack direction="row" spacing={2} justifyContent="center">
                <JellyFilter onFilterChange={handleFilterChange} />
                {userInfo && (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isMineJellies}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="My Jellies"
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
                    {filteredJellies?.length > 0 ? (
                        filteredJellies.map((jelly) => (
                            <Typography key={jelly.id} variant="h6">
                                {jelly.name}
                            </Typography>
                        ))
                    ) : (
                        <Typography>No jellies found</Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default JellyList;

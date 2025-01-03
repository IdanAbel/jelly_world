import { useEffect, useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface JellyFilterProps {
    onFilterChange: (searchTerm: string) => void;
}

const JellyFilter: React.FC<JellyFilterProps> = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            onFilterChange(searchTerm);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm, onFilterChange]);

    return (
        <TextField
            placeholder="Search Jellies"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
        />
    );
};

export default JellyFilter;

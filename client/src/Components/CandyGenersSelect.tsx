import React from 'react';
import { TextField, MenuItem } from '@mui/material';

interface GenresSelectProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CandyTypeGroups = {
    FRUITY: 'Fruity',
    CHOCOLATE: 'Chocolate',
    SOUR: 'Sour',
    GUMMY: 'Gummy',
    HARD_CANDY: 'Hard Candy',
    MINT: 'Mint',
    LICORICE: 'Licorice',
    CARAMEL: 'Caramel',
    MARSHMALLOW: 'Marshmallow',
};

const CandyTypeSelect: React.FC<GenresSelectProps> = ({ value, onChange }) => {
    return (
        <TextField
            select
            fullWidth
            label="Candy Group"
            value={value}
            onChange={onChange}
            variant="outlined"
        >
            <MenuItem value="">Not Set Yet</MenuItem>
            {Object.values(CandyTypeGroups)
                .sort()
                .map((group, index) => (
                    <MenuItem key={index} value={group}>
                        {group}
                    </MenuItem>
                ))}
        </TextField>
    );
};

export default CandyTypeSelect;

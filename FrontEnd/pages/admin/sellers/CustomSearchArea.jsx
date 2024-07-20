import React from 'react';
import { TextField } from '@mui/material';

const CustomSearchArea = ({ handleSearch, searchPlaceholder }) => {
    return (
        <TextField
            variant="outlined"
            placeholder={searchPlaceholder}
            onChange={(e) => handleSearch(e.target.value)}
            fullWidth
            InputProps={{startAdornment: null, }}
        />
    );
};

export default CustomSearchArea;
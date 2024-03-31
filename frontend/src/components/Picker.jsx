import React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Picker = ({ label, value, onChange }) => {
    return (
        <DatePicker
            label={label}
            views={['year', 'month']}
            value={value}
            onChange={onChange}
        />
    );
}

export default Picker;
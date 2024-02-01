import React from 'react';
import TextField from '@mui/material/TextField';

const CustomInput = ({ type, placeholder, onChange}) => {
    return (
        <TextField
            style={{
                width: '100%',
                marginBottom: '20px',
            }}
            type={type}
            label={placeholder}
            onChange={onChange}
            variant="standard"
            size = "small"
            InputProps={{
                disableUnderline: true,
                style: {
                    borderRadius: '5px',
                    backgroundColor: '#fffc',
                    marginTop: '25px',
                    paddingLeft: '10px',
                },
            }}
            InputLabelProps={{
                shrink: true,
                style: {
                    color: '#fff',
                },
            }}
        />
    );
};

export default CustomInput;
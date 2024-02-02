import React from 'react';
import TextField from '@mui/material/TextField';

const CustomInput = ({ type, label, onChange, error, name }) => {
    return (
        <TextField
            required
            name={name}
            style={{
                width: '100%',
                marginTop: '20px',
            }}
            type={type}
            label={label}
            onChange={onChange} // Aquí pasas el evento completo a la función onChange
            error={error ? true : false}
            helperText={error}
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
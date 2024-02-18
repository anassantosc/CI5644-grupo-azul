import React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const CustomInput = ({ type, label, onChange, error, name, required }) => {
    return (
        <TextField
            required={required}
            name={name}
            style={{
                width: "100%",
                marginTop: "20px",
            }}
            type={type}
            label={label}
            onChange={onChange} // Aquí pasas el evento completo a la función onChange
            error={!!error}
            helperText={error}
            variant="standard"
            size="small"
            InputProps={{
                disableUnderline: true,
                style: {
                    borderRadius: "5px",
                    backgroundColor: "#fffc",
                    marginTop: "25px",
                    paddingLeft: "10px",
                },
            }}
            InputLabelProps={{
                shrink: true,
                style: {
                    color: "#fff",
                },
            }}
        />
    );
};

CustomInput.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    name: PropTypes.string,
};

export default CustomInput;

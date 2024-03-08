import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

const CustomInput = ({ type, label, onChange, error, name, required, options }) => {
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
            onChange={onChange}
            error={!!error}
            helperText={error}
            variant="standard"
            size="small"
            select={type === "select"}
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
        >
            {type === "select" && options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

CustomInput.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
    })),
};

export default CustomInput;
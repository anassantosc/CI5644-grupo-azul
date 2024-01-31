import { faHandPointer } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TextField } from "@mui/material";
import React from "react";

export const SearchBar = () => {
    return (
        <Box component="form" noValidate autoComplete="off">
            <TextField
                label="Buscar..."
                styles={{ backgroundColor: "white" }}
                sx={{ borderRadius: 3 }}
                variant="filled"
                InputProps={{
                    endAdornment: <FontAwesomeIcon icon={faHandPointer} />,
                    style: { color: "white" },
                }}
            />
        </Box>
    );
};

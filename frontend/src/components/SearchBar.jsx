import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TextField } from "@mui/material";
import React from "react";

export const SearchBar = () => {
    return (
        <Box component="form" noValidate autoComplete="off" sx={{width:'100%'}}>
            <TextField
                label="Buscar..."
                styles={{ backgroundColor: "white" }}
                sx={{ borderRadius: 10, width : '100%'}}
                variant="filled"
                InputProps={{
                    endAdornment: <FontAwesomeIcon icon={faMagnifyingGlass} />,
                    style : {backgroundColor : 'white', color: 'red', borderRadius:10},
                    disableUnderline: true
                }}
            />
        </Box>
    );
};

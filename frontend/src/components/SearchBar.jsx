import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TextField } from "@mui/material";
import { IconButton } from '@mui/material';

import React from "react";

export const SearchBar = () => {
    const searchQuery = (query) => {
        console.log("query")
    }
    return (
        <Box component="form" noValidate autoComplete="off" sx={{width:'100%', height : '100px'}}>
            <TextField
                label="Buscar..."
                onInput={(e) => {
                    searchQuery(e.target.value);
                  }}
                styles={{fontFamily:'inherit'}}
                sx={{   borderRadius: 10, width : '100%',
                        "& .MuiFormLabel-root": {
                            color: "#370001"
                        },
                        "& .MuiFormLabel-root.Mui-focused": {
                            color: "#370001"
                        }
                    }}
                variant="filled"
                InputProps={{
                    color : 'red',
                    endAdornment: <IconButton type="submit" aria-label="search" style={{ color:"#370001" }}> <FontAwesomeIcon icon={faMagnifyingGlass} /> </IconButton>,
                    style : {backgroundColor : 'white', color: "#370001", borderRadius:10},
                    disableUnderline: true
                }}
            />
        </Box>
    );
};

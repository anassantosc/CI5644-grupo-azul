import React from "react";
import Layout from "../layout/Layout";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { faHandPointer } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Card } from "../components/Card";
import { Footer } from "../components/Footer";

export default function Home() {
    return (
        <>
            <Layout />
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
            <div> Mi álbum </div>
            <Card
                number={10}
                name={"Lionel Messi"}
                height={"1.70m"}
                weight={"72kg"}
                position={"DC"}
            />
            <Footer />
            <div style={{ height: 1000 }}></div>
        </>
    );
}

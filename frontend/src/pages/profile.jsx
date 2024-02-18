import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import EditModal from "../components/EditModal";
import ProgressCircle from "../components/ProgressCircle";
import { useUser } from "../hooks/useUser";
import { useProgress } from "../hooks/useProgress";
import Layout from "../layout/Layout";

export default function Profile() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { id, username, password, name, email, gender } = useUser() || {};
    const progress = useProgress(id);

    return (
        <Layout>
            <Box
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    margin: "50px",
                    borderRadius: "10px",
                    padding: "20px",
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} container justifyContent="center">
                        <Avatar
                            alt="User Avatar"
                            style={{
                                width: "300px",
                                height: "300px",
                                backgroundColor: "black",
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={8}
                        container
                        direction="column"
                        justifyContent="center"
                    >
                        <Typography
                            style={{
                                fontWeight: "bold",
                                fontSize: "30px",
                                color: "white",
                                margin: "10px",
                                padding: "10px",
                            }}
                        >
                            <BadgeIcon style={{ marginRight: "8px", height: "50px", width: "65px" }} />
                            {name || "Nombre no disponible"}
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: 100,
                                fontStyle: "italic",
                                fontSize: "30px",
                                color: "white",
                                margin: "10px",
                                padding: "10px",
                            }}
                        >
                            <AlternateEmailIcon style={{ marginRight: "8px", height: "50px", width: "50px" }} />
                            {username || "Nombre de Usuario no disponible"}
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: "light",
                                fontSize: "30px",
                                color: "white",
                                margin: "10px",
                                padding: "10px",
                            }}
                        >
                            <EmailIcon style={{ marginRight: "8px", height: "50px", width: "65px" }} />
                            {email || "Correo Electrónico no disponible"}
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: "light",
                                fontSize: "30px",
                                color: "white",
                                margin: "10px",
                                padding: "10px",
                            }}
                        >
                            <WcIcon style={{ marginRight: "8px", height: "65px", width: "50px" }} />
                            {gender || "Género del Usuario no disponible"}
                        </Typography>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={handleShow}
                            style={{
                                backgroundColor: "#731530",
                                color: "white",
                                alignSelf: "flex-end",
                            }}
                        >
                            Editar
                        </Button>
                        <EditModal show={show} onClose={handleClose} />
                    </Grid>
                </Grid>
            </Box>

            <Box
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    margin: "50px",
                    borderRadius: "10px",
                    padding: "20px",
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} container justifyContent="center">
                        <Typography
                            variant="h4"
                            justifyContent="center"
                            style={{
                                fontWeight: "bold",
                                color: "white",
                                margin: "10px",
                                padding: "10px",
                            }}
                        >
                            MI PROGRESO
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={8}
                        container
                        direction="column"
                        justifyContent="center"
                    >
                        {progress && (
                            <ProgressCircle value={progress.toFixed(2)} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

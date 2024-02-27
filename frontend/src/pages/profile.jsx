import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import EditModal from "../components/EditModal";
import ProgressCircle from "../components/ProgressCircle";
import { useProgress } from "../hooks/useProgress";
import Layout from "../layout/Layout";
import { GetUser } from "../utils/fetchs/GetUser";


export default function Profile() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [user, setUser] = useState({
        id: null,
        username: null,
        password: null,
        name: null,
        email: null,
        gender: null,
    });
    const progress = useProgress(user.id);

    useEffect(() => {
        const updateUser = async () => {
            const userData = await GetUser();
            setUser(userData);
        };

        updateUser();
    }, []);

    const handleChange = async () => {
        const userData = await GetUser();
        setUser(userData);
    };

    return (
        <Layout>
            <Box
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    margin: "50px",
                    borderRadius: "10px",
                    padding: "20px",
                    overflow: "hidden",
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} container justifyContent="center">
                        <Avatar
                            alt="User Avatar"
                            style={{
                                width: "150px",
                                height: "150px",
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
                                fontSize: "40px",
                                color: "white",
                                margin: "4px",
                                padding: "4px",
                            }}
                        >
                            <AlternateEmailIcon style={{ marginRight: "8px", height: "30px", width: "50px" }} />
                            {user.username || "Nombre de Usuario no disponible"}
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: 100,
                                fontStyle: "italic",
                                fontSize: "30px",
                                color: "white",
                                margin: "4px",
                                padding: "4px",
                            }}
                        >
                            <BadgeIcon style={{ marginRight: "8px", height: "25px" }} />
                            {user.name || "Nombre no disponible"}
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: "light",
                                fontSize: "30px",
                                color: "white",
                                margin: "4px",
                                padding: "4px",
                            }}
                        >
                            <EmailIcon style={{ marginRight: "8px", height: "25px" }} />
                            {user.email || "Correo Electrónico no disponible"}
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: "light",
                                fontSize: "30px",
                                color: "white",
                                margin: "4px",
                                padding: "4px",
                            }}
                        >
                            <WcIcon style={{ marginRight: "8px", height: "25px" }} />
                            {user.gender || "Género del Usuario no disponible"}
                        </Typography>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={handleShow}
                            style={{
                                backgroundColor: "#731530",
                                color: "white",
                                marginTop: "-50px",
                                alignSelf: "flex-end",
                            }}
                        >
                            Editar
                        </Button>
                        {user.username !== null &&
                            <EditModal show={show} onClose={handleClose} user={user} onChange={handleChange} />}
                    </Grid>
                </Grid>
            </Box>

            <Box
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    margin: "50px",
                    borderRadius: "10px",
                    padding: "20px",
                    overflow: "hidden",
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

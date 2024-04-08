import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import EditModal from "../components/EditModal";
import ProgressCircle from "../components/ProgressCircle";
import { useProgress } from "../hooks/useProgress";
import Layout from "../layout/Layout";
import { GetUserDetails } from "../utils/fetchs/GetUserDetails";
import styles from "../../styles/Profile.module.css";
import CreditCardModal from "../components/CreditCardModal";

export default function Profile() {
    const [show, setShow] = useState(false)
    const [showCreditCard, setShowCreditCard] = useState(false)
    const handleClose = () => setShow(false);
    const handleCloseCreditCard = () => setShowCreditCard(false);
    const handleShow = () => setShow(true);
    const handleShowCreditCard = () => setShowCreditCard(true);
    const [user, setUser] = useState({
        id: null,
        username: null,
        password: null,
        name: null,
        email: null,
        gender: null,
        cardNumber: null,
        expirationDate: null,
        cvv: null,
    });
    const progress = useProgress(user.id);



    useEffect(() => {
        const updateUser = async () => {
            const userData = await GetUserDetails();
            setUser(userData);
        };

        updateUser();
    }, []);

    const handleChange = async () => {
        const userData = await GetUserDetails();
        setUser(userData);
    };

    return (
        <Layout>
            <Box className={styles.profileBox} id="profile-box">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} container justifyContent="center">
                        <Avatar
                            alt="User Avatar"
                            className={styles.userAvatar}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={8}
                        container
                        direction="column"
                        justifyContent="center"
                    >
                        <Typography className={styles.username} id="username-section">
                            <AlternateEmailIcon className={styles.usernameIcon} />
                            {user.username || "Nombre de Usuario no disponible"}
                        </Typography>
                        <Typography className={styles.name} id="name-section">
                            <BadgeIcon className={styles.infoIcon} />
                            {user.name || "Nombre no disponible"}
                        </Typography>
                        <Typography className={styles.userInfo} id="email-section">
                            <EmailIcon className={styles.infoIcon} />
                            {user.email || "Correo Electrónico no disponible"}
                        </Typography>
                        <Typography className={styles.userInfo} id="gender-section">
                            <WcIcon className={styles.infoIcon} />
                            {user.gender || "Género del Usuario no disponible"}
                        </Typography>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={handleShowCreditCard}
                            className={styles.creditCardButton}
                        >
                            <CreditCardIcon className={styles.creditCardIcon} />
                            Editar información de la tarjeta

                        </Button>
                        {user.username !== null && 
                            <CreditCardModal show={showCreditCard} onClose={handleCloseCreditCard} user={user} onChange={handleChange} />}
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={handleShow}
                            className={styles.editButton}
                        >
                            Editar
                        </Button>
                        {user.username !== null &&
                            <EditModal show={show} onClose={handleClose} user={user} onChange={handleChange} />}
                        
                    </Grid>
                </Grid>
            </Box>

            <Box className={styles.progressBox} id="progress-box">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} container justifyContent="center">
                        <Typography
                            variant="h4"
                            justifyContent="center"
                            className={styles.progressTitle}
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
                        {progress !== null && (
                            <ProgressCircle value={progress.toFixed(2)} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

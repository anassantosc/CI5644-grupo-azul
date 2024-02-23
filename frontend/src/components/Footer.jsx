import { Box, Button, Divider, Grid } from '@mui/material';
import styles from "./../../styles/Footer.module.css";
import {
    faFacebook,
    faInstagram,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export const FooterText = ({ first, second }) => {
    return (
        <Box sx={{ textAlign: "left", marginBottom: "7%", fontSize: "20px" }}>
            <Box>
                <Divider sx={{ bgcolor: "white", marginBottom: "2%" }} />
            </Box>
            <Box>{first}</Box>
            <Box>{second}</Box>
        </Box>
    );
};

export const FooterSocial = () => {
    return (
        <Box sx={{ marginBottom: "3%" }}>
            <Box
                fontWeight="bold"
                sx={{ typography: "h4", letterSpacing: "4px" }}
            >
                Marmota{" "}
            </Box>
            <Box sx={{ typography: "h7" }}> Salvaje </Box>
            <Box sx={{ marginTop: "2%" }}>
                <Button sx={{ color: "white" }}>
                    <FontAwesomeIcon icon={faFacebook} />
                </Button>
                <Button sx={{ color: "white" }}>
                    <FontAwesomeIcon icon={faInstagram} />
                </Button>
                <Button sx={{ color: "white" }}>
                    <FontAwesomeIcon icon={faTiktok} />
                </Button>
            </Box>
        </Box>
    );
};

export const Footer = () => {
    return (
        <Box className={styles.container}>
            <Grid
                container
                columnSpacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{
                    flexGrow: 1,
                    flexDirection: "row",
                    bgcolor: "transparent",
                    width: "100%",
                    height: "100%",
                    display: { xs: "block", md: "flex" },
                    color: "white",
                }}
            >
                <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <FooterText first="Copyright 2024 marmotasalvaje.com" second="Derechos reservados" />
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                    <FooterSocial />
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <FooterText first="Acerca de " second="Contáctanos" />
                </Grid>
            </Grid>
        </Box>
    );
};

FooterText.propTypes = {
    first: PropTypes.string,
    second: PropTypes.string,
};

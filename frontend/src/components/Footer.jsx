import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
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
        <Box sx={{ textAlign: "left", marginBottom: "40px", fontSize: "20px" }}>
            <Box>
                <Divider sx={{ bgcolor: "white", marginBottom: "10px" }} />
            </Box>
            <Box>{first}</Box>
            <Box>{second}</Box>
        </Box>
    );
};

export const FooterSocial = () => {
    return (
        <Box sx={{ marginBottom: "15px" }}>
            <Box
                fontWeight="bold"
                sx={{ typography: "h4", letterSpacing: "4px" }}
            >
                Marmota{" "}
            </Box>
            <Box sx={{ typography: "h7" }}> Salvaje </Box>
            <Box sx={{ marginTop: "10px" }}>
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
                <Grid item xs={4}>
                    <FooterText
                        first="Copyright 2024 marmotasalvaje.com"
                        second="Derechos reservados"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FooterSocial />
                </Grid>
                <Grid item xs={4}>
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

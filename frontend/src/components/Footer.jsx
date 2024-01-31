import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import styles from "./../../styles/Footer.module.css";

export const FooterText = ({ first, second }) => {
    return (
        <Box sx={{ textAlign: "left", marginBottom: "40px" }}>
            <Box>
                <Divider sx={{ bgcolor: "white", marginBottom: "10px" }} />
            </Box>
            <Box>{first}</Box>
            <Box>{second}</Box>
        </Box>
    );
};

export const FooterLogo = () => {
    return (
        <Box sx={{ marginBottom: "15px" }}>
            <Box
                fontWeight="bold"
                sx={{ typography: "h4", letterSpacing: "4px" }}
            >
                Marmota{" "}
            </Box>
            <Box sx={{ typography: "h7" }}> Salvaje </Box>
            <Box>
                <Button>FB</Button>
                <Button>IG</Button>
                <Button>TK</Button>
            </Box>
        </Box>
    );
};

export const Footer = () => {
    return (
        <>
            <div className={styles.container}>
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
                        <FooterLogo />
                    </Grid>
                    <Grid item xs={4}>
                        <FooterText first="Acerca de " second="Contáctanos" />
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

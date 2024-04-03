import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import styles from "../../styles/Store.module.css";
import { useAlert } from "../context/AlertContext";


function Store() {
    const [packages, setPackages] = useState(1);
    const [showPayment, setShowPayment] = useState(false);
    const [payment, setPayment] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const showAlert = useAlert();

    const handleBuyBox = (quantity) => {
        setPackages(quantity);
        showAlert('Seleccionaste una caja', 'info');
        setShowPayment(true);
    }
    
    const handleBuyPackage = (quantity) => {
        setPackages(quantity);
        showAlert('Seleccionaste nuevos paquetes de barajitas', 'info');
        setShowPayment(true);
    }
    
    const handlePayment = (bool) => {
        if (bool) {
            showAlert('Compra exitosa', 'success');
            setPaymentSuccess(true);
        } else {
            setShowPayment(false);
            showAlert('Compra cancelada', 'error');
        }
    }
    
    if (showPayment) {
        return (
            <Layout>
                <Box className={styles.storeBox}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6} >
                            <Typography variant="h6" className={styles.subtitle}>
                                Monto a pagar: ${payment}
                            </Typography>
                            <div className={styles.buttonContainer}>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    className={styles.payButton}
                                    onClick={() => handlePayment(true)}
                                >
                                    Pagar
                                </Button>   
                                <Button
                                    variant="contained"
                                    size="medium"
                                    onClick={() => handlePayment(false)} 
                                    className={styles.cancelButton}    
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Layout>
        );
    }

    if (paymentSuccess) {
        return (
            <Layout>
                <Box className={styles.storeBox}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6} >
                            <a href="">Visualizar barajitas nuevas</a>
                        </Grid>
                    </Grid>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box className={styles.storeBox}>
                <Grid container spacing={2} alignItems="center">
                    <Grid 
                        item
                        xs={8}
                        container
                        direction="column"
                        justifyContent="center"
                    >
                        <Typography variant="h4" gutterBottom className={styles.titleStore}>
                            Tienda de Barajitas
                        </Typography>
                    </Grid>
                    <Grid 
                        item 
                        xs={6} 
                        justifyContent="center" 
                        alignItems="center" 
                    >
                        <Typography variant="h6" className={styles.subtitle}>
                            Comprar una caja
                        </Typography>
                        <Button 
                            variant="contained"
                            color="primary"
                            className={styles.saleButton}
                            onClick={() => handleBuyBox('box',100)}
                        >
                            Comprar
                        </Button>        
                    </Grid>
                    <Grid 
                        item
                        xs={6}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography variant="h6" className={styles.subtitle}>
                            Comprar
                        </Typography>
                        <TextField
                            type="number"
                            value={packages}
                            onChange={(e) => setPackages(e.target.value)}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            className={styles.textPackage}
                            inputProps={{ min: 1, max: 99 }}
                        />
                        <Typography variant="h6" className={styles.subtitle}>
                            paquetes
                        </Typography>
                        <Button 
                            variant="contained"
                            color="primary"
                            className={styles.saleButton}
                            onClick={() => handleBuyPackage('package', packages)}
                        >
                            Comprar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

export default Store;

import React, {useState} from "react";
import Layout from "../layout/Layout";
import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import styles from "../../styles/Store.module.css";
import { useAlert } from "../context/AlertContext";
import { FlipCard } from "../components/FlipCard";
import prices from "../utils/constants/prices";
import { alertMessages, alertTypes, statusCodes } from "../utils/constants";
import { GetPurchasedCards } from "../utils/fetchs/GetPurchasedCards";

function Store() {
    const [packages, setPackages] = useState(1);
    const [showPayment, setShowPayment] = useState(false);
    const [payment, setPayment] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [packOpenProgress, setPackOpenProgress] = useState(0);
    const showAlert = useAlert();
    const [boughtCards,setBoughtCards] = useState([[{
        id: null,
        playerName: null,
        country: null,
        shirtNumber: null,
        position: null,
        height: null,
        weight: null,
    }]]);


    const handleBuyBox = () => {
        showAlert('Seleccionaste una caja', 'info');
        setShowPayment(true);
        setPackages(100)
        setPayment(prices.box);
    }

    const handleBuyPackage = (quantity) => {
        showAlert('Seleccionaste nuevos paquetes de barajitas', 'info');
        setShowPayment(true);
        setPackages(quantity);
        setPayment(packages * prices.package);
    }

    const handlePayment = async (paymentDone) => {
    
        if (paymentDone) {
            try {
                const correctQuantity = Number(packages);
                const purchasedCards = await GetPurchasedCards(correctQuantity, showAlert);
                if (purchasedCards.length > 0) {
                    showAlert('Compra exitosa', alertTypes.success);
                    setBoughtCards(purchasedCards);
                    setPaymentSuccess(true);
                }
                
            } catch (error) {
                console.error(error);
                setPaymentSuccess(false);
                setPayment(0);
            }
            
        } else {
            setShowPayment(false);
            setPayment(0);
            showAlert('Compra cancelada', 'error');
        }
        
    }
    

    const handleNextPack = () => {
        setRevealed(false);
        if (packOpenProgress < boughtCards.length - 1) {
            setPackOpenProgress(packOpenProgress + 1);
        }
    }

    if (showPayment && !paymentSuccess) {
        return (
            <Layout>
                <Box className={styles.storeBox}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <Typography variant="h6" className={styles.subtitle}>
                                Monto a pagar: ${payment}
                            </Typography>
                            <div className={styles.buttonContainer}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={styles.payButton}
                                    onClick={() => 
                                        handlePayment(true)
                                    }
                                >
                                    Pagar
                                </Button>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    onClick={() => {
                                        handlePayment(false);
                                    }}
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
                <Box className={styles.boughtCardsBox}>
                    <Typography variant="h3" className={styles.boughtTitle}>
                        ¡Descubre tus nuevas barajitas!
                    </Typography>
                    <Box className={styles.cardsContainer}>
                    {
                        boughtCards[packOpenProgress] && boughtCards[packOpenProgress].map(
                                card => (
                                    <FlipCard
                                        key={card.id}
                                        name={card ? card.playerName : null}
                                        number={card.id}
                                        position={card ? card.position : null}
                                        height={card ? card.height + "m" : "0.0m"}
                                        weight={card && card.weight && !isNaN(parseFloat(card.weight)) ? parseFloat(card.weight).toFixed(1) + "Kg" : "0.0Kg"}
                                        flipped={revealed}
                                    />
                                )
                            )
                        }

                    </Box>

                    <Typography variant="h6" className={styles.boughtLength}>
                        {
                            `${packOpenProgress + 1}/${boughtCards.length} paquetes restantes`
                        }
                    </Typography>
                    <Box className={styles.packButtonGroup}>
                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={() => setRevealed(true)}
                            className={styles.nextPackButton}
                        >
                            Revelar barajitas
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={handleNextPack}
                            className={styles.nextPackButton}
                            disabled={packOpenProgress === boughtCards.length - 1}
                        >
                            Siguiente
                        </Button>
                    </Box>
                    <Link href="/album" className={styles.packLink}>
                        O bien, comprueba tu álbum
                    </Link>
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
                            onClick={() => handleBuyBox()}
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
                            inputProps={{min: 1, max: 99}}
                        />
                        <Typography variant="h6" className={styles.subtitle}>
                            paquete(s)
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className={styles.saleButton}
                            onClick={() => handleBuyPackage(packages)}
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

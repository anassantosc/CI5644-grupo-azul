import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    FormControl,
    Typography,
    TextField
} from "@mui/material";
import Image from "next/image";
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import images from '../utils/constants/images';
import {CreateOffer} from "../utils/fetchs/CreateOffer";
import {CreateCounterOffer} from "../utils/fetchs/CreateCounterOffer";
import {useAlert} from "../context/AlertContext";
import {TableSelector} from "./TableSelector";
import styles from "../../styles/OfferModal.module.css";
import {alertMessages, alertTypes, labels} from "../utils/constants";

const OfferModal = ({show, onClose, offer = null}) => {
    const showAlert = useAlert();
    const [offerData, setOfferData] = useState({cardReceive: null, cardOffer: null})

    const [showReceive, setShowReceive] = useState(false);
    const [showSend, setShowSend] = useState(false);

    const handleCloseReceive = () => setShowReceive(false);
    const handleCloseSend = () => setShowSend(false);

    const handleButtonClick = (type) => () => {
        setShowReceive(type === 'receive' ? !showReceive : false);
        setShowSend(type === 'send' ? !showSend : false);
    };

    const handleFieldChange = (key) => (e) => {
        setOfferData({...offerData, [key]: e});
    };

    const handleConfirm = async () => {
        if (!offerData.cardReceive || !offerData.cardOffer) {
            showAlert(alertMessages.fill_fields, alertTypes.warning);
            return
        }

        try {
            const offerWithId = {
                ...offerData,
                offerId: offer?.id
            };

            offer?.id == null ?
                await CreateOffer(offerData, showAlert) :
                await CreateCounterOffer(offerWithId, showAlert);

        } catch (error) {
            console.error(alertMessages.offer_error, error);
            showAlert(alertMessages.offer_error, alertTypes.error);
        }

        onClose();
        setOfferData({cardReceive: null, cardOffer: null});
    }

    useEffect(() => {
        setOfferData({cardReceive: offer?.cardOffer, cardOffer: offer?.cardReceive})
    }, [offer]);

    return (
        <Dialog className={styles.dialog} open={show} onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent dividers className={styles.dialogContent}>
                <Box display="flex" alignItems="center">
                    <Image priority src={images.logo} alt="Logo" width={140} height={140}/>
                    <Typography variant="h4"
                                className={styles.dialogTitle}>
                        {offer ? "Enviar contraoferta" : "Enviar oferta"}
                    </Typography>
                </Box>
                <Box className={styles.formBox}>
                    <form noValidate autoComplete="off">
                        <Box className={styles.buttonGroup}>
                            <Button
                                variant="contained"
                                id="receive"
                                onClick={handleButtonClick('receive')}
                                className={styles.receiveButton}>
                                Carta a recibir
                            </Button>
                            <Button
                                variant="contained"
                                id="send"
                                onClick={handleButtonClick('send')}
                                className={styles.sendButton}
                                disabled={offer !== null}>
                                Carta a enviar
                            </Button>
                        </Box>
                        <FormControl fullWidth className={styles.fields}>
                            {(!showReceive && !showSend) && (
                                <>
                                    {offerData.cardReceive && (
                                        <TextField
                                            id="recibir"
                                            label={labels.receive}
                                            defaultValue={`Carta a recibir: ${offerData.cardReceive}`}
                                            className={styles.receiveTextField}
                                            InputProps={{style: {color: "white"}, readOnly: true}}
                                        />
                                    )}
                                    {offerData.cardOffer && (
                                        <TextField
                                            id="enviar"
                                            label={labels.send}
                                            defaultValue={`Carta a enviar: ${offerData.cardOffer}`}
                                            className={styles.sendTextField}
                                            InputProps={{style: {color: "white"}, readOnly: true}}
                                        />
                                    )}
                                </>
                            )}
                        </FormControl>
                        {showReceive && (
                            <TableSelector
                                onSelect={handleFieldChange('cardReceive')}
                                onClick={handleCloseReceive}
                                receive={true}
                                offer={offer}/>
                        )}
                        {showSend && (
                            <TableSelector
                                onSelect={handleFieldChange('cardOffer')}
                                onClick={handleCloseSend}
                                receive={false}/>
                        )}
                    </form>
                </Box>
            </DialogContent>
            <DialogActions className={styles.dialogActions}>
                <Button
                    variant="contained"
                    size="medium"
                    onClick={() => {
                        onClose();
                        setOfferData({cardReceive: null, cardOffer: null});
                    }}
                    className={styles.cancelButton}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    onClick={() => {
                        handleConfirm();
                    }}
                    className={styles.confirmButton}
                >
                    Ofertar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default OfferModal;


OfferModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    id: PropTypes.number
};

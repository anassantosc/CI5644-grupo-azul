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
import { useState } from "react";
import images from '../utils/constants/images';
import { CreateOffer } from "../utils/fetchs/CreateOffer";
import { useAlert } from "../context/AlertContext";
import { TableSelector } from "./TableSelector";
import styles from "../../styles/OfferModal.module.css";
import { alertMessages, alertTypes, labels } from "../utils/constants";


const dummyVariables = [
    '12', '2', '3', '4', '5',
    '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20',
    '11', '2', '3', '4', '5',
    '61', '7', '8', '9', '10',
    '111', '12', '13', '14', '15',
    '116', '17', '18', '19', '20',
    '12', '2', '3', '4', '5',
    '62', '7', '8', '9', '10',
    '112', '12', '13', '14', '15',
    '162', '17', '18', '19', '20',
];

const OfferModal = ({ show, onClose }) => {
    const showAlert = useAlert();
    const [offerData, setOfferData] = useState({ receive: null, send: null })
    const missingCards = dummyVariables;
    const duplicatedCards = dummyVariables;

    const [showReceive, setShowReceive] = useState(false);
    const [showSend, setShowSend] = useState(false);

    const handleCloseReceive = () => setShowReceive(false);
    const handleCloseSend = () => setShowSend(false);

    const handleButtonClick = (type) => () => {
        if (type === 'receive') {
            setShowReceive(!showReceive);
            handleCloseSend();
        } else if (type === 'send') {
            setShowSend(!showSend);
            handleCloseReceive();
        }
    };

    const handleFieldChange = (key) => (e) => {
        console.log(key);
        console.log(e);
        setOfferData({ ...offerData, [key]: e });
        console.log(offerData);
    };

    const handleConfirm = async () => {
        if (!offerData.receive || !offerData.send) {
            showAlert(alertMessages.fill_fields, alertTypes.warning);
            return
        }

        try {
            const response = await CreateOffer(offerData);
            setOfferData({ receive: null, send: null });

            if (response.ok) {
                showAlert(alertMessages.offer_success, alertTypes.success);
            } else {
                showAlert(alertMessages.unknown_error, alertTypes.error);
            }
            onClose();
        } catch (error) {
            console.error(alertMessages.offer_error, error);
        }

        onClose();
    }

    return (
        <Dialog open={show} onClose={onClose} fullWidth maxWidth="sm" >
            <DialogContent dividers className={styles.dialogContent} >
                <Box display="flex" alignItems="center">
                    <Image priority src={images.logo} alt="Logo" width={140} height={140} />
                    <Typography variant="h4" className={styles.dialogTitle} >Enviar oferta</Typography>
                </Box>
                <Box className={styles.formBox}>
                    <form noValidate autoComplete="off">
                        <Box className={styles.buttonGroup}>
                            <Button
                                variant="outlined"
                                id="receive"
                                onClick={handleButtonClick('receive')}
                                className={styles.receiveButton}>
                                Carta a recibir
                            </Button>
                            <Button
                                variant="outlined"
                                id="send"
                                onClick={handleButtonClick('send')}
                                className={styles.sendButton}>
                                Carta a enviar
                            </Button>
                        </Box>
                        <FormControl fullWidth >
                            {(!showReceive && !showSend) && (
                                <>
                                    {offerData.receive && (
                                        <TextField
                                            id="recibir"
                                            label={labels.receive}
                                            defaultValue={`Carta a recibir: ${offerData.receive}`}
                                            className={styles.receiveTextField}
                                            InputProps={{ style: { color: "white" }, readOnly: true }}
                                        />
                                    )}
                                    {offerData.send && (
                                        <TextField
                                            id="enviar"
                                            label={labels.send}
                                            defaultValue={`Carta a enviar: ${offerData.send}`}
                                            className={styles.sendTextField}
                                            InputProps={{ style: { color: "white" }, readOnly: true }}
                                        />
                                    )}
                                </>
                            )}
                            {showReceive && (
                                <TableSelector
                                    onSelect={handleFieldChange('receive')}
                                    onClick={handleCloseReceive}
                                    receive={true}
                                    cards={missingCards} />
                            )}
                            {showSend && (
                                <TableSelector
                                    onSelect={handleFieldChange('send')}
                                    onClick={handleCloseSend}
                                    receive={false}
                                    cards={duplicatedCards} />
                            )}
                        </FormControl>
                    </form>
                </Box>
            </DialogContent>
            <DialogActions className={styles.dialogActions} >
                <Button variant="contained" size="medium" onClick={onClose} className={styles.cancelButton} >
                    Cancelar
                </Button>
                <Button variant="contained" size="medium" onClick={handleConfirm} className={styles.confirmButton} >
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

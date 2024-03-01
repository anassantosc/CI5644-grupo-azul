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

const EditModal = ({ show, onClose }) => {
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
            showAlert("Por favor, complete todos los campos", "warning");
            return
        }

        try {
            const response = await CreateOffer(offerData);
            setOfferData({ receive: null, send: null });

            if (response.ok) {
                showAlert("Oferta creada exitosamente", "success");
            } else {
                showAlert("Ocurrió un error desconocido", "error");
            }
            onClose();
        } catch (error) {
            console.error('Error al crear la oferta:', error);
        }

        onClose();
    }

    return (
        <Dialog open={show} onClose={onClose} fullWidth maxWidth="sm" >
            <DialogContent dividers sx={{ backgroundColor: '#581E3D' }}>
                <Box display="flex" alignItems="center">
                    <Image priority src={images.logo} alt="Logo" width={140} height={140} />
                    <Typography variant="h4" sx={{ color: 'white', ml: 2 }}>Enviar oferta</Typography>
                </Box>
                <Box
                    bgcolor="rgba(255, 255, 255, 0.1)"
                    borderRadius={10}
                    p={2}>
                    <form noValidate autoComplete="off">
                        <Box display="flex" justifyContent="space-between" width="100%" paddingLeft="5%" paddingRight="5%" marginBottom="3%">
                            <Button
                                variant="outlined"
                                id="receive"
                                onClick={handleButtonClick('receive')}
                                style={{ backgroundColor: 'grey', color: 'white' }}>
                                Carta a recibir
                            </Button>
                            <Button
                                variant="outlined"
                                id="send"
                                onClick={handleButtonClick('send')}
                                style={{ backgroundColor: 'grey', color: 'white' }}>
                                Carta a enviar
                            </Button>
                        </Box>
                        <FormControl fullWidth>
                            {(!showReceive && !showSend) && (
                                <>
                                    {offerData.receive && (
                                        <TextField
                                            id="recibir"
                                            label="Carta a recibir"
                                            defaultValue={`Carta a recibir: ${offerData.receive}`}
                                            style={{ marginBottom: "10px", color: "white" }}
                                            InputProps={{ style: { color: "white" }, readOnly: true }}
                                        />
                                    )}
                                    {offerData.send && (
                                        <TextField
                                            id="enviar"
                                            label="Carta a enviar"
                                            defaultValue={`Carta a enviar: ${offerData.send}`}
                                            InputProps={{ style: { color: "white" }, readOnly: true }}
                                        />
                                    )}
                                </>
                            )}
                            {showReceive && (
                                <TableSelector onSelect={handleFieldChange('receive')} onClick={handleCloseReceive} receive={true} cards={missingCards} />
                            )}
                            {showSend && (
                                <TableSelector onSelect={handleFieldChange('send')} onClick={handleCloseSend} receive={false} cards={duplicatedCards} />
                            )}
                        </FormControl>
                    </form>
                </Box>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#581E3D' }}>
                <Button variant="contained" size="medium" onClick={onClose} style={{
                    backgroundColor: '#731530',
                    color: 'white'
                }}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    onClick={handleConfirm}
                    style={{ backgroundColor: '#520968', color: 'white' }}
                >
                    Ofertar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditModal;


EditModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    id: PropTypes.number
};

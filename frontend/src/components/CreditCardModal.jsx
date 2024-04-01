import { Box, Button, Dialog, DialogContent, DialogActions, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { useAlert } from "../context/AlertContext";
import { alertMessages, alertTypes, regex, images, labels, statusCodes } from "../utils/constants";

const CreditCardModal = ({ show, onClose, user, onChange }) => {
    const showAlert = useAlert();
    const [userData, setUserData] = useState(
        { creditCard: user.creditCard || "",
        expirationDate: user.expirationDate || "",
        cvv: user.cvv || "" })

    const handleFieldChange = (key) => (e) => {
        setUserData({ ...userData, [key]: e.target.value });
    };

    /*
    const handleDateChange = (date) => {
        setUserData((prevState) => ({
            ...prevState,
            expirationDate: date.format("YYYY-MM"),
        }))
    };

    */
    const validateFields = () => {
        if (!userData.creditCard || !userData.expirationDate || !userData.cvv) {
            showAlert(alertMessages.fill_fields, alertTypes.warning);
            return false
        }
        if (!regex.creditCard.test(userData.creditCard)) {
            showAlert(alertMessages.credit_card_long_error, alertTypes.warning);
            return false
        }
        if (!regex.experationDate.test(userData.expirationDate)) {
            showAlert(alertMessages.credit_card_expiration_error, alertTypes.warning);
            return false
        }
        if (!regex.cvv.test(userData.cvv)) {
            showAlert(alertMessages.credit_card_cvv_error, alertTypes.warning);
            return false
        }
        return true;
    };

    const handleConfirm = async () => {
        if (!validateFields()) return;

        const userChanges = {
            username: user.username,
            ...userData
        };

        /*
        try {
            const response = await EditUser(userChanges);

            if (response.ok) {
                showAlert(alertMessages.success_credit_card, alertTypes.success);
            } else if (response.status === statusCodes.bad_request) {
                showAlert(await response.text(), alertTypes.error);
            } else {
                showAlert(alertMessages.unknown_error, alertTypes.error);
            }

            onChange();
            onClose();
        } catch (error) {
            console.error(alertMessages.credit_card_error, error);
        }
        */
        onClose();
    }

    return (
        <Dialog open={show} onClose={onClose} fullWidth maxWidth="sm" >
            <DialogContent dividers sx={{ backgroundColor: '#581E3D' }}>
                <Box display="flex" alignItems="center">
                    <Image priority src={images.logo} alt="Logo" width={150} height={150} />
                    <Typography variant="h4" sx={{
                        color: 'white', ml: 2
                    }}>Tarjeta de Crédito</Typography>
                </Box>
                <Box bgcolor="rgba(255, 255, 255, 0.1)" borderRadius={10} p={2}>
                    <form noValidate autoComplete="off">
                        <TextField
                            label={labels.creditCard}
                            variant="outlined"
                            color="secondary"
                            value={userData.creditCard}
                            onChange={handleFieldChange("creditCard")}
                            fullWidth
                            sx={{
                                color: 'white', mb: 2
                            }}
                        />
                        <TextField
                            label={labels.expirationDate}
                            variant="outlined"
                            color="secondary"
                            value={userData.expirationDate}
                            onChange={handleFieldChange("expirationDate")}
                            fullWidth
                            sx={{
                                color: 'white', mb: 2
                            }}
                            type="month"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            label={labels.cvv}
                            variant="outlined"
                            color="secondary"
                            value={userData.cvv}
                            onChange={handleFieldChange("cvv")}
                            fullWidth
                            sx={{
                                color: 'white', mb: 2
                            }}
                        />
                        
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
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreditCardModal;
CreditCardModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    id: PropTypes.number
}

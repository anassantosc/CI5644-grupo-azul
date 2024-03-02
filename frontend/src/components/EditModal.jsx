import { Box, Button, Dialog, DialogContent, DialogActions, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { EditUser } from "../utils/fetchs/EditUser";
import { useAlert } from "../context/AlertContext";
import { alertMessages, alertTypes, regex, images, labels, genderOptions } from "../utils/constants";

const EditModal = ({ show, onClose, user, onChange }) => {
    const showAlert = useAlert();
    const [userData, setUserData] = useState(
        { email: user.email || "",
        gender: user.gender || "",
        name: user.name || "" })

    const handleFieldChange = (key) => (e) => {
        setUserData({ ...userData, [key]: e.target.value });
    };


    const validateFields = () => {
        if (!userData.name || !userData.email) {
            showAlert(alertMessages.fill_fields, alertTypes.warning);
            return false
        }
        if (!regex.username.test(userData.name)) {
            showAlert(alertMessages.invalid_name, alertTypes.warning);
            return false
        }
        if (!regex.email.test(userData.email)) {
            showAlert(alertMessages.invalid_email, alertTypes.warning);
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

        try {
            const response = await EditUser(userChanges);

            if (response.ok) {
                showAlert(alertMessages.success, alertTypes.success);
            } else {
                showAlert(alertMessages.unknown_error, alertTypes.error);
            }
            onChange();
            onClose();
        } catch (error) {
            console.error(alertMessages.edit_error, error);
        }

        onClose();
    }

    return (
        <Dialog open={show} onClose={onClose} fullWidth maxWidth="sm" >
            <DialogContent dividers sx={{ backgroundColor: '#581E3D' }}>
                <Box display="flex" alignItems="center">
                    <Image priority src={images.logo} alt="Logo" width={150} height={150} />
                    <Typography variant="h4" sx={{
                        color: 'white', ml: 2
                    }}>Editar Perfil</Typography>
                </Box>
                <Box bgcolor="rgba(255, 255, 255, 0.1)" borderRadius={10} p={2}>
                    <form noValidate autoComplete="off">
                        <TextField
                            label={labels.name}
                            variant="outlined"
                            color="secondary"
                            value={userData.name}
                            onChange={handleFieldChange("name")}
                            fullWidth
                            sx={{
                                color: 'white', mb: 2
                            }}
                        />
                        <TextField
                            label={labels.email}
                            variant="outlined"
                            color="secondary"
                            value={userData.email}
                            onChange={handleFieldChange("email")}
                            fullWidth
                            sx={{
                                color: 'white', mb: 2
                            }}
                        />
                        <FormControl variant="outlined" color="secondary" fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="gender-label">Género</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                label={labels.gender}
                                value={userData.gender}
                                onChange={handleFieldChange("gender")}
                            >
                                {Object.values(genderOptions).map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
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
                    Confirmar
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
}

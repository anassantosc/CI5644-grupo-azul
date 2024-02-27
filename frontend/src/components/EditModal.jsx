import { Box, Button, Dialog, DialogContent, DialogActions, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import images from '../utils/constants/images';
import { EditUser } from "../utils/fetchs/EditUser";
import { useAlert } from "../context/AlertContext";



const EditModal = ({ show, onClose, user, onChange }) => {
    const showAlert = useAlert();
    const [email, setEmail] = useState(user.email || "");
    const [gender, setGender] = useState(user.gender || "");
    const [name, setName] = useState(user.name || "");

    const nameRegex = /^[a-zA-Z\s]{5,}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleConfirm = async () => {
        if (!name || !email) {
            showAlert("Por favor, complete todos los campos", "warning");
            return
        }
        if (!nameRegex.test(name)) {
            showAlert("El nombre debe ser de al menos 5 caracteres y no debe contener caracteres especiales", "warning");
            return
        }
        if (!emailRegex.test(email)) {
            showAlert("El correo electronico no cumple las convenciones de correo electronico", "warning");
            return
        }

        const userData = {
            username: user.username,
            name: name,
            email: email,
            gender: gender
        };

        try {
            const response = await EditUser(userData);

            if (response.ok) {
                showAlert("Usuario editado exitosamente", "success");
            } else {
                showAlert("Ocurrió un error desconocido", "error");
            }
            onChange();
            onClose();
        } catch (error) {
            console.error('Error al editar el usuario:', error);
        }

        onClose();
    }

    return (
        <Dialog open={show} onClose={onClose} fullWidth maxWidth="sm" >
            <DialogContent dividers sx={{ backgroundColor: '#581E3D' }}>
                <Box display="flex" alignItems="center">
                    <Image src={images.logo} alt="Logo" width={150} height={150} />
                    <Typography variant="h4" sx={{
                        color: 'white', ml: 2
                    }}>Editar Perfil</Typography>
                </Box>
                <Box bgcolor="rgba(255, 255, 255, 0.1)" borderRadius={10} p={2}>
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            color="secondary"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            sx={{
                                color: 'white', mb: 2
                            }}
                        />
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            color="secondary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                label="Género"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value={"Masculino"}>Masculino</MenuItem>
                                <MenuItem value={"Femenino"}>Femenino</MenuItem>
                                <MenuItem value={"Otro"}>Otro</MenuItem>
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

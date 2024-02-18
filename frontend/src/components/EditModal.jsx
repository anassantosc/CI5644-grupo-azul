import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useEdit } from "../hooks/UseEdit";
import { Background } from "./Background";



const EditModal = ({show, onClose}) => {
    const user = useEdit();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');


    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
            setGender(user.gender);
        }
    }, [user]);

    return (
        
        <Modal open={show} onClose={onClose}>
            <div style={{ overflow: "auto"}}>
                    

                    <Image src={logo} alt="Logo" width={150} height={150} style={{
                        position: 'absolute', 
                        left: '10px', 
                        top: '10px' 
                    }}
                />
            
                <Typography variant="h4" style={{ 
                    color: 'white', 
                    textAlign: 'left', 
                    marginTop: '50px', 
                    marginBottom: '20px',
                    marginLeft: '200px',
                    fontWeight: 'bold',
                    position: 'relative'
                }}>
                    Editar Perfil
                </Typography>  

                <IconButton 
                    onClick={onClose} 
                    style={{ 
                        color: 'gray', 
                        position: 'absolute', 
                        right: '10px', 
                        top: '10px' 
                }}>
                    <CloseIcon />
                </IconButton>

            <Box style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                margin: '50px', 
                borderRadius: '10px', 
                padding: '20px',
                overflow: 'auto',
                height: '50%',
                width: '80%',
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center' }}>
                    <form noValidate autoComplete="off">
                        
                        <TextField label="Nombre" variant="outlined" color="secondary" value={name} onChange={(e) => setName(e.target.value)} fullWidth style={{ 
                            margin: 'normal',
                            backgroundColor: 'gray',
                            marginBottom: '10px',
                            borderRadius: '10px'
                        }} />

                        <TextField label="Correo Electrónico" variant="outlined" color="secondary" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth style={{ 
                            margin: 'normal',
                            backgroundColor: 'gray',
                            marginBottom: '10px',
                            borderRadius: '10px' 
                        }} />
                        <TextField label="Contraseña" variant="outlined" color="secondary" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth style={{ 
                            margin: 'normal',
                            backgroundColor: 'gray',
                            marginBottom: '10px',
                            borderRadius: '10px' 
                        }} />  

                        <FormControl variant="outlined" color="secondary" fullWidth style={{ 
                            margin: 'normal',
                            backgroundColor: 'gray',
                            marginBottom: '10px',
                            borderRadius: '10px' 
                        }}>
                            <InputLabel id="gender-label">Género</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                label="Género"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value={"Masculino"}>Hombre</MenuItem>
                                <MenuItem value={"Femenino"}>Mujer</MenuItem>
                                <MenuItem value={"Otro"}>Otro</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" size="medium" style={{ 
                            backgroundColor: '#731530', 
                            color: 'white', 
                            alignSelf: 'flex-center' }}>Confirmar
                        </Button>
                    </form>                   
                 
            </Box>       

            <Background />

            </div>
        </Modal>
    );
}

export default EditModal;


EditModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func, 
    id: PropTypes.number
}
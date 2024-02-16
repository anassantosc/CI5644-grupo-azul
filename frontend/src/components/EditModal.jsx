import React from "react";
import { Background } from "./Background";
import { Modal, IconButton, Typography, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import logo from "../assets/logo.png";
import Image from "next/image"; 




const EditModal = ({show, onClose}) => {
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
                        <TextField label="Nombre" variant="outlined" fullWidth style={{ 
                            margin: 'normal',
                            backgroundColor: 'gray',
                            marginBottom: '10px',
                            borderRadius: '10px' 
                        }} />
                        <TextField label="Nombre de Usuario" variant="outlined" fullWidth style={{ 
                            margin: 'normal',
                            backgroundColor: 'gray',
                            marginBottom: '10px',
                            borderRadius: '10px' 
                        }} />
                        <TextField label="Correo Electrónico" variant="outlined" fullWidth style={{ 
                            margin: 'normal',
                            backgroundColor: 'gray',
                            marginBottom: '10px',
                            borderRadius: '10px' 
                        }} />
                        <TextField label="Contraseña" variant="outlined" fullWidth style={{ 
                            margin: 'normal',
                            backgroundColor: 'gray',
                            marginBottom: '10px',
                            borderRadius: '10px' 
                        }} />  
                        <TextField label="Confirmar Contraseña" variant="outlined" fullWidth style={{ 
                            margin: 'normal',
                            backgroundColor: 'gray',
                            marginBottom: '10px',
                            borderRadius: '10px' 
                        }} />
                        <FormControl variant="outlined" fullWidth style={{ 
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
                            >
                                <MenuItem value={"hombre"}>Hombre</MenuItem>
                                <MenuItem value={"mujer"}>Mujer</MenuItem>
                                <MenuItem value={"otro"}>Otro</MenuItem>
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

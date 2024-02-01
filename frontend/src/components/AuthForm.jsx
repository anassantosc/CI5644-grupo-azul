import React from 'react';
import CustomInput from './CustomInput';
import ColorButton from "./ColorButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import Box from '@mui/material/Box';

const AuthForm = ({ onSubmit, onChange, values, errors, isLogin }) => {

    const style = {
        height: '55vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'space-around',
        padding: '3rem 2rem',
        backgroundColor: '#fff2',
        borderRadius: '10px',
        border: '1px solid #fffe',
        color: '#fff',
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={style}>
            <h1>{isLogin ? 'Iniciar sesión' : 'Registrate'}</h1>

            <CustomInput
                type="text"
                placeholder="Usuario"
                onChange={onChange}
                value={values.username}
                error={errors.username}
            />
            <CustomInput
                type="password"
                placeholder="Contraseña"
                onChange={onChange}
                value={values.password}
                error={errors.password}
            />
            {!isLogin && (
                <CustomInput
                    type="password"
                    placeholder="Confirmar contraseña"
                    onChange={onChange}
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                />
            )}

            <ColorButton textColor="#fff" bgColor="#731530" sx={{height: "29px", marginBottom: "1rem"}}>
                <Box sx = {{paddingRight:"7px"}}> Continuar </Box> <ArrowForwardIcon/>
            </ColorButton>

            <ColorButton textColor="#fff" bgColor="#EA5323" sx={{height: "29px", marginBottom: "1rem"}}>
                <LocalPoliceIcon />
                <Box sx = {{paddingLeft:"7px"}}> {isLogin ? 'Iniciar' : 'Registrate'} con Auth0 </Box>
            </ColorButton>
            {isLogin ? (
                <p>¿No tienes una cuenta? <a href="/signup">Registrate</a></p>
            ) : (
                <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
            )}
        </Box>
    );
};

export default AuthForm;

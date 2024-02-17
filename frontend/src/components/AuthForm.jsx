import React from "react";
import CustomInput from "./CustomInput";
import ColorButton from "./ColorButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { Link } from "@mui/material";

const AuthForm = ({ onSubmit, onChange, values, errors, isLogin }) => {
    const style = {
        height: "auto",
        width: "100%",
        maxWidth: "22rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "space-around",
        padding: "3rem 4rem",
        backgroundColor: "#fff2",
        borderRadius: "10px",
        border: "1px solid #fffe",
        color: "#fff",
        fontSize: ".9rem",
        "@media (max-width:600px)": {
            padding: "1.5rem 2rem",
            fontSize: "0.8rem",
        },
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={style}>
            <h1 style={{ margin: 0 }}>
                {isLogin ? "Iniciar sesión." : "Registrate"}
            </h1>

            <CustomInput
                type="text"
                label="Usuario"
                onChange={onChange}
                value={values.username}
                error={errors.username}
                name="username"
            />
            <CustomInput
                type="password"
                label="Contraseña"
                onChange={onChange}
                value={values.password}
                error={errors.password}
                name="password"
            />
            {!isLogin && (
                <CustomInput
                    type="password"
                    label="Confirmar contraseña"
                    onChange={onChange}
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                    name="confirmPassword"
                />
            )}
            <ColorButton
                textcolor="#fff"
                bgcolor="#731530"
                type="submit"
                sx={{ height: "29px", marginBottom: "1rem", marginTop: "1rem" }}
            >
                <Box sx={{ paddingRight: "7px" }}> Continuar </Box>{" "}
                <ArrowForwardIcon />
            </ColorButton>

            {isLogin ? (
                <Box>
                    ¿No tienes una cuenta?{" "}
                    <Link href="/register" underline="hover" color="white">
                        Registrate
                    </Link>
                </Box>
            ) : (
                <Box>
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" underline="hover" color="white">
                        Inicia sesión
                    </Link>
                </Box>
            )}
        </Box>
    );
};

export default AuthForm;

AuthForm.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    values: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string,
    }),
    errors: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string,
    }),
    isLogin: PropTypes.bool,
};

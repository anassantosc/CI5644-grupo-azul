import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PropTypes from "prop-types";
import React from "react";
import ColorButton from "./ColorButton";
import CustomInput from "./CustomInput";
import {Link, Box } from "@mui/material";
import styles from "./../../styles/AuthForm.module.css";
import SpecialsButtons from "./SpecialsButtons";
import { routes, labels, inputTypes, genderOptions, inputNames, formOptions, colors } from "../utils/constants";

const AuthForm = ({ onSubmit, onChange, values, isLogin }) => {
    return (
        <Box component='form' onSubmit={onSubmit} className={styles.authForm}>
            <h1 className={styles.h1Style}>
                {isLogin ? formOptions.login : formOptions.signup}
            </h1>

            <CustomInput
                type={inputTypes.text}
                label={labels.username}
                onChange={onChange}
                value={values.username}
                name={inputNames.username}
                required
            />
            <CustomInput
                type={inputTypes.password}
                label={labels.password}
                onChange={onChange}
                value={values.password}
                name={inputNames.password}
                required
            />
            {!isLogin && (
                <React.Fragment>
                    <CustomInput
                        type={inputTypes.password}
                        label={labels.confirmPassword}
                        onChange={onChange}
                        value={values.confirmPassword}
                        name={inputNames.confirmPassword}
                        required
                    />
                    <CustomInput
                        label={labels.name}
                        onChange={onChange}
                        value={values.name}
                        name={inputNames.name}
                        required
                    />
                    <CustomInput
                        type={inputTypes.email}
                        label={labels.email}
                        onChange={onChange}
                        value={values.email}
                        name={inputNames.email}
                        required
                    />
                    <CustomInput
                        type={inputTypes.select}
                        label={labels.gender}
                        defaultValue={values.gender}
                        onChange={onChange}
                        value={values.gender}
                        name={inputNames.gender}
                        required
                        options={[
                            { value: genderOptions.male, label: genderOptions.male},
                            { value: genderOptions.female, label: genderOptions.female },
                            { value: genderOptions.other, label: genderOptions.other },
                        ]}
                    />
                </React.Fragment>
            )}
            <ColorButton
                bgcolor={colors.primary}
                textcolor={colors.secondary}
                type={inputTypes.submit}
                className={styles.colorButton}
            >
                <Box className={styles.boxPadding}> Continuar </Box>{" "}
                <ArrowForwardIcon />
            </ColorButton>

            

            {isLogin ? (
                <Box>
                    ¿No tienes una cuenta?{" "}
                    <Link href={routes.signup} className={styles.linkStyle}>
                        Registrate
                    </Link>
                </Box>
            ) : (
                <Box>
                    ¿Ya tienes una cuenta?{" "}
                    <Link href={routes.login} className={styles.linkStyle}>
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
        name: PropTypes.string,
        email: PropTypes.string,
        gender: PropTypes.string,
        confirmPassword: PropTypes.string,
    }),
    isLogin: PropTypes.bool,
};

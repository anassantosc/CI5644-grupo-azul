import React, {useState} from 'react';
import logo from '../assets/logo.png';
import Image from "next/image";
import AuthForm from '../components/AuthForm';
import {Background} from "../components/Background";
import styles from "./../../styles/Login.module.css";

const SignupPage = () => {
    const [values, setValues] = useState({username: '', password: '', confirmPassword: ''});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Verificar si password y confirmPassword son iguales
        if (values.password !== values.confirmPassword) {
            // Si no son iguales, actualizar el estado de los errores
            setErrors({
                ...errors,
                confirmPassword: 'La contraseña y la confirmación de la contraseña no coinciden',
            });
        } else {
            console.log(`Intentando registrarse con ${values.username} y ${values.password}`);
            // Si el ingreso es exitoso, restablecer el estado de los errores a un objeto vacío
            setErrors({});
        }
    };

    return (
        <div className={styles.login}>
            <Background/>

            <div className={styles.logoContainer}>
                <Image
                    className={styles.loginLogo}
                    src={logo}
                    alt="logo"
                />
                <h1 className={styles.loginH1}>Marmota Salvaje</h1>
            </div>

            <AuthForm
                onSubmit={handleSubmit}
                onChange={handleChange}
                values={values}
                errors={errors}
                isLogin={false}
            />
        </div>
    );
};

export default SignupPage;
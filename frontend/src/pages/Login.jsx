import React, {useState} from 'react';
import logo from '../assets/logo.png';
import Image from "next/image";
import AuthForm from '../components/AuthForm';
import {Background} from "../components/Background";
import styles from "./../../styles/Login.module.css";


const LoginPage = () => {
    const [values, setValues] = useState({username: '', password: ''});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Intentando iniciar sesión con ${values.username} y ${values.password}`);
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
                isLogin={true}
            />
        </div>
    );
};

export default LoginPage;
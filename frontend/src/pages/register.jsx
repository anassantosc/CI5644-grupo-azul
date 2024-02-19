import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import AuthForm from "../components/AuthForm";
import { Background } from "../components/Background";
import { useAlert } from "../context/AlertContext";
import { Register } from "../utils/auth/Register";
import styles from "./../../styles/Login.module.css";

const RegisterPage = () => {
    const router = useRouter();

    const [values, setValues] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
        gender: ""
    });
    const showAlert = useAlert();
    const [errors, setErrors] = useState(null);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (values.password !== values.confirmPassword) {
            showAlert(
                "La contraseña y la confirmación de la contraseña no coinciden",
                "warning"
            );
        } else {
            const response = await Register(
                {
                    username: values.username,
                    password: values.password,
                    name: values.name,
                    email: values.email,
                    gender: values.gender,
                },
                showAlert
            );

            if (response?.ok) {
                router.push("/login");
            }
        }
    };

    return (
        <div className={styles.login}>
            <Background />

            <div className={styles.logoContainer}>
                <Image
                    priority
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

export default RegisterPage;

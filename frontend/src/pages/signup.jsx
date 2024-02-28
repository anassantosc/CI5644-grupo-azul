import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import images from "../utils/constants/images";
import AuthForm from "../components/AuthForm";
import { Background } from "../components/Background";
import { useAlert } from "../context/AlertContext";
import { Register } from "../utils/auth/Register";
import styles from "../../styles/Login.module.css";

const SignUpPage = () => {
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
        console.log(event.target.name, event.target.value);
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Regex to validate username
        const usernameRegex = /^[a-z]{5,}$/;
        // Regex to validate password
        const passwordRegex = /^[a-zA-Z\.\-\_]{8,}$/;

        if (values.password !== values.confirmPassword) {
            showAlert(
                "La contraseña y la confirmación de la contraseña no coinciden",
                "warning"
            );
        } else if (!usernameRegex.test(values.username)) {
            showAlert(
                "El nombre de usuario debe contener al menos 5 letras minúsculas",
                "warning"
            );
        } else if (!passwordRegex.test(values.password)) {
            showAlert(
                "La contraseña debe contener al menos 8 caracteres y solo letras," +
                "puntos, guiones y guiones bajos",
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
                    src={images.logo}
                    sizes="100vw"
                    width={0}
                    height={0}
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

export default SignUpPage;

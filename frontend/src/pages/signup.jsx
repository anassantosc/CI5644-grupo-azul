import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import images from "../utils/constants/images";
import AuthForm from "../components/AuthForm";
import { Background } from "../components/Background";
import { useAlert } from "../context/AlertContext";
import { Register } from "../utils/auth/Register";
import styles from "../../styles/Login.module.css";
import { regex, alertMessages, alertTypes, routes } from "../utils/constants";

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

        if (values.password !== values.confirmPassword) {
            showAlert(alertMessages.passwords_dont_match, alertTypes.warning);
        } else if (!regex.username.test(values.username)) {
            showAlert(alertMessages.invalid_username, alertTypes.warning);
        } else if (!regex.password.test(values.password)) {
            showAlert(alertMessages.invalid_password, alertTypes.warning);
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
                router.push(routes.login);
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

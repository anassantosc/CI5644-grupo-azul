import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import images from "../utils/constants/images";
import AuthForm from "../components/AuthForm";
import { Background } from "../components/Background";
import { useAlert } from "../context/AlertContext";
import { Login } from "../utils/auth/Login";
import styles from "../../styles/Login.module.css";

const LoginPage = () => {
    const [values, setValues] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const showAlert = useAlert();
    const router = useRouter();

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await Login(
            {
                username: values.username,
                password: values.password,
            },
            showAlert
        );

        if (response?.ok) {
            router.push("/profile");
        }
    };

    return (
        <div className={styles.login}>
            <Background />
            <div className={styles.logoContainer}>
                <Image priority className={styles.loginLogo} src={images.logo} sizes="100vw" width={0} height={0} alt="logo" />
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

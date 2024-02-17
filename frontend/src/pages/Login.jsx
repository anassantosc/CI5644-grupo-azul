import React, { useState } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import AuthForm from "../components/AuthForm";
import { Background } from "../components/Background";
import styles from "./../../styles/Login.module.css";
import { Authenticate } from "../utils/fetchs/Authenticate";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [values, setValues] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(
            `Intentando iniciar sesión con ${values.username} y ${values.password}`
        );
        const token = await Authenticate(
            {
                username: values.username,
                password: values.password,
            },
            "login"
        );

        if (token) {
            router.push("/");
        }
    };

    return (
        <div className={styles.login}>
            <Background />
            <div className={styles.logoContainer}>
                <Image className={styles.loginLogo} src={logo} alt="logo" />
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

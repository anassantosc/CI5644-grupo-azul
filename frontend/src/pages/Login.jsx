import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import AuthForm from "../components/AuthForm";
import { Background } from "../components/Background";
import { Authenticate } from "../utils/fetchs/Authenticate";
import styles from "./../../styles/Login.module.css";

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
        const response = await Authenticate(
            {
                username: values.username,
                password: values.password,
            },
            "login"
        );

        console.log(response);

        if (response) {
            router.push("/profile");
        } else {
            router.push("/dashboard");
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

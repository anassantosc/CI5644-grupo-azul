import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import styles from "./../../styles/Layout.module.css";
import { Background } from "../components/Background";
import { Footer } from "../components/Footer";
import PropTypes from "prop-types";
import { Logout } from "../utils/auth/Logout";
import { useAlert } from "../context/AlertContext";
import {routes as r} from "../utils/constants";

export default function Layout({ children }) {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const router = useRouter();
    const showAlert = useAlert();

    const routes = {
        Inicio: r.home,
        Perfil: r.profile,
        Album: r.album,
        Comprar: r.store,
        "Mi Álbum": r.album,
        Salir: r.home,
        Login: r.login,
        Registro: r.signup
    };

    const handleClick = (key) => {
        const route = routes[key];
        if (key === "Salir") {
            handleLogout();
        } else if (route) {
            router.push(route, { scroll: false });
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        const response = await Logout(showAlert);
        if (response.ok) {
            router.push("/", { scroll: false });
        }
    };

    const handlers = {
        handleClick,
        handleOpenUserMenu,
        handleCloseUserMenu,
        anchorElUser,
    };

    return (
        <>
            <Background />
            <Navbar {...handlers} />
            <div className={styles.layout}>{children}</div>
            <Footer />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

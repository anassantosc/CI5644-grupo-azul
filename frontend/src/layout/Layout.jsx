import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import styles from "./../../styles/Layout.module.css";
import { Background } from "./../components/Background";
import { Footer } from "./../components/Footer";
import PropTypes from "prop-types";

export default function Layout({ children }) {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const router = useRouter();

    const routes = {
        Inicio: "/",
        Perfil: "/profile",
        Album: "/album",
        Comprar: "/store",
        "Mi Álbum": "/album",
        Salir: "/",
    };

    const handleClick = (key) => {
        const route = routes[key];
        if (route) {
            router.push(route, { scroll: false });
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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

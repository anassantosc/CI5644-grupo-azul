import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Background } from "./../components/Background";
import { Footer } from "./../components/Footer";
import styles from "./../../styles/Layout.module.css";

export default function Layout({ children }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const router = useRouter();

    const routes = {
        Inicio: "/",
        Perfil: "/Profile",
        Album: "/Album",
        Comprar: "/Store",
        "Mi Álbum": "/Album",
        Salir: "/",
    };

    const handleClick = (key) => {
        const route = routes[key];
        if (route) {
            router.push(route, { scroll: false });
        }
    };

    const handleClickMenu = (key) => {
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

    const handleMainPage = () => {
        router.push(HOME, { scroll: false });
    };

    const handlers = {
        handleMainPage,
        handleClick,
        handleOpenUserMenu,
        handleCloseUserMenu,
        handleClickMenu,
        anchorElUser
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

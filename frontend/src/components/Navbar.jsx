import MailIcon from '@mui/icons-material/Mail';
import {
    Badge,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    AccountCircle,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import Image from "next/image";
import React from "react";
import NotificationMenu from "./NotificationMenu";
import images from "../utils/constants/images";
import { useAuthentication } from "../hooks/useAuthentication";
import colors from "../utils/constants/colors";

const pages = ["Inicio", "Album", "Comprar"];
const adminSettings = ["Perfil", "Mi Álbum", "Salir"];
const settings = ["Login", "Registro"]

export const Navbar = ({
    handleClick,
    handleOpenUserMenu,
    handleCloseUserMenu,
    anchorElUser,
}) => {
    const isLogin = useAuthentication();

    return (
        <Toolbar
            disableGutters
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1);",
                borderRadius: "0 0 15px 15px",
                borderBottom: "1px solid #FFF",
                position: "fixed",
                width: "100%",
                zIndex: "1",
            }}
        >
            <Box
                sx={{
                    flexGrow: 0,
                    marginLeft: 2,
                    marginRight: 0,
                    width: "100px",
                    height: "90px",
                }}
            >
                <Button onClick={() => handleClick("Inicio")}>
                    <Image
                        src={images.logo}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "100%" }}
                        alt="logo"
                    />
                </Button>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                }}
            >
                {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={() => handleClick(page)}
                        sx={{
                            my: 2,
                            mx: 1,
                            color: "white",
                            display: "block",
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: "15px",
                        }}
                    >
                        {page}
                    </Button>
                ))}
            </Box>
            <NotificationMenu
                handleOpenUserMenu={handleOpenUserMenu}
                anchorElUser={anchorElUser}
                handleCloseUserMenu={handleCloseUserMenu}
                isLogin={isLogin}
                adminSettings={adminSettings}
                settings={settings}
                handleClick={handleClick}
            />

            <Box sx={{ flexGrow: 0, marginRight: 5 }}>
                <Tooltip title="Menú">
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenUserMenu}
                        sx={{ p: 0, color: "#FFF" }}
                    >
                        <AccountCircle sx={{ fontSize: 60 }} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{
                        mt: "45px",
                        marginLeft: 4,
                        marginTop: 7,
                        "& .MuiMenu-paper": {
                            backgroundColor: "#531c3c",
                        },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >

                    {(isLogin ? adminSettings : settings).map((setting) => (
                        <MenuItem
                            key={setting}
                            onClick={() => handleClick(setting)}
                        >
                            <Typography textAlign="center" color="common.white">
                                {setting}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Toolbar>
    );
};

Navbar.propTypes = {
    handleClick: PropTypes.func,
    handleOpenUserMenu: PropTypes.func,
    anchorElUser: PropTypes.object,
    handleCloseUserMenu: PropTypes.func,
};

import AccountCircle from "@mui/icons-material/AccountCircle";
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";
import React from "react";
import logo from "./../assets/logo.png";

const pages = ["Inicio", "Album", "Comprar"];
const settings = ["Perfil", "Mi Álbum", "Salir"];

export const Navbar = ({
    handleClick,
    handleOpenUserMenu,
    anchorElUser,
    handleCloseUserMenu,
}) => {
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
                        src={logo}
                        sizes="100vw"
                        style={{ width: "100%", height: "100%"}}
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
                    {settings.map((setting) => (
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
    anchorElUser: PropTypes.func,
    handleCloseUserMenu: PropTypes.func,
};

import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import logo from "./../assets/logo.png";
import { Background } from "./../components/Background";
import { Footer } from "./../components/Footer";

const pages = ["Inicio", "Álbum", "Comprar"];
const settings = ["Perfil", "Mi Álbum", "Salir"];
const HOME = "/";
const PROFILE = "/Profile";
const ALBUM = "/Album";
const STORE = "/Store";

export default function Layout({ children }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const router = useRouter();

    const handleClick = (key) => {
        if (key == "Inicio") {
            router.push(HOME, { scroll: false });
        }
        if (key == "Álbum") {
            router.push(ALBUM, { scroll: false });
        }
        if (key == "Comprar") {
            router.push(STORE, { scroll: false });
        }
    };
    const handleClickMenu = (key) => {
        if (key == "Perfil") {
            router.push(PROFILE, { scroll: false });
        }
        if (key == "Mi Álbum") {
            router.push(ALBUM, { scroll: false });
        }
        if (key == "Salir") {
            router.push(HOME, { scroll: false });
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

    return (
        <>
            <Toolbar disableGutters sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1);",
                borderRadius: "0 0 15px 15px",
                borderBottom: "1px solid #FFF",
                width: "100vw"
            }}>
                <Box
                    sx={{
                        flexGrow: 0,
                        marginLeft: 2,
                        marginRight: 0,
                        width: "100px",
                        height: "90px",
                    }}
                >
                    <Button onClick={handleMainPage}>
                        <Image
                            src={logo}
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
                                onClick={() => handleClickMenu(setting)}
                            >
                                <Typography
                                    textAlign="center"
                                    color="common.white"
                                >
                                    {setting}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>

            {children}

            <Footer />
            <Background />
        </>
    );
}

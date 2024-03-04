import React from 'react';
import { Box, Tooltip, IconButton, Badge, Menu, MenuItem, Typography } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import colors from "../utils/constants/colors";

const NotificationMenu = ({ handleOpenUserMenu, anchorElUser, handleCloseUserMenu, isLogin, adminSettings, settings, handleClick }) => {
    return (
        <>
            <Box sx={{ flexGrow: 0, marginRight: 5 }}>
                <Tooltip title="Solicitudes de Intercambio">
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={handleOpenUserMenu}
                    >
                        <Badge badgeContent={17} color="error" >
                            <MailIcon  sx={{ fontSize: 30, color: colors.secondary }} />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
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
        </>
    );
};

export default NotificationMenu;
import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Inicio', 'Álbum', 'Comprar'];
const settings = ['Perfil', 'Mi Álbum', 'Salir'];

import { useRouter } from 'next/navigation';

import Image from "next/image";

import logo from "./../assets/logo.png";

const HOME = '/'
const PROFILE = '/Profile'
const ALBUM = '/Album'
const STORE = '/Store'

export default function Layout() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter()

  const handleClick = (key) => {
    if (key == "Inicio"){
      router.push(HOME, { scroll: false })
    }
    if (key == "Álbum"){
      router.push(ALBUM, { scroll: false })
    }
    if (key == "Comprar"){
      router.push(STORE, { scroll: false })
    }
  };
  const handleClickMenu = (key) => {
    if (key == "Perfil"){
      router.push(PROFILE, { scroll: false })
    }
    if (key == "Mi Álbum"){
      router.push(ALBUM, { scroll: false })
    }
    if (key == "Salir"){
      router.push(HOME, { scroll: false })
    }
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMainPage = () => {
    router.push(HOME, { scroll: false })
  };

  return (
      <AppBar position="sticky" 
      style={{
        background: "rgb(97,31,63)",
        background: "linear-gradient(500deg, rgba(97,31,63,1) 10%, rgb(83,28,60) 30%, rgb(99,52,79) 70%, rgba(88,49,78,255) 98%)"
        }}
      sx={{
          borderBottomLeftRadius : "10px",
          borderBottomRightRadius : "10px",
          borderBottom: 1,
          borderBottomColor : 'white',
          height: 75,
          width: { xs: '100%', sm: '100%' }
        }}>
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 0, marginLeft : 2, marginRight : 0, width : '100px', height : '90px'}}>
            <Button
                onClick={handleMainPage}
              >
              <Image
                        src={logo}
                        sizes="100vw"
                        style={{ width: "100%", height: "100%" }}
                        alt="logo"
                    />
            </Button>
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClick(page)}
                sx={{ my: 2, mx : 1, color: 'white', display: 'block' ,textTransform: "none",fontWeight: "bold", fontSize : "15px"}}
              >
                {page}
              </Button>
            ))}
          </Box>


          <Box sx={{ flexGrow: 0, marginRight : 5}}>
            <Tooltip title="Menú">

              <IconButton
                size = "large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenUserMenu} 
                sx={{ p: 0 }}
              >
              <AccountCircle sx = {{fontSize : 60}}/>
              </IconButton>

            </Tooltip>
            <Menu
              sx={
                { mt: "45px", marginLeft : 4, marginTop : 7,
                "& .MuiMenu-paper": 
                  { backgroundColor: "#531c3c"}, 
                }
              }

              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleClickMenu(setting)}>
                  <Typography textAlign="center" color="common.white">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    );
}
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

import HOME from '../general/url'

export default function Layout() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter()

  const handleClick = (key) => {
    if (key == "Inicio"){
      router.push('/', { scroll: false })
    }
    if (key == "Álbum"){
      router.push('/Album', { scroll: false })
    }
    if (key == "Comprar"){
      router.push('/Store', { scroll: false })
    }

    /*
    pages.map((page)=>{
      if (page == key){
        router.push(HOME, { scroll: false })
      }
    })*/
  };
  const handleClickMenu = (key) => {
    router.push('/dashboard', { scroll: false })
    console.log(key)
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMainPage = () => {
    console.log("main")
    router.push('/', { scroll: false })
  };
  //backgroundColor: { xs: 'black', sm: '#3A114D' }, sx
  return (
      <AppBar position="sticky" 
      style={{
        background: "rgb(110, 25, 66)",
        background: "linear-gradient(277deg, rgb(58, 17, 77) 2%, rgb(54, 54, 54) 12%, rgb(77, 17, 61) 50%, rgb(110, 26, 25) 100%)"
      }}
      sx={{
          borderRadius: '10px',
          border: '1px solid white',
          top : 0,
          height: 70,
          width: { xs: '100%', sm: '100%' }
        }}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, marginLeft : 2, marginRight : 2}}>
            <Button
                onClick={handleMainPage}
              >
              <Avatar alt="Futbarajitas" src="/static/images/avatar/2.jpg" />
            </Button>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Futbarajitas
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
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
              sx={{ mt: '45px' , marginLeft : 5, marginTop : 8}}
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
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    );
}


// <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              //  <Avatar src="/static/images/avatar/2.jpg" />
              // </IconButton>
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from 'next/link'

import { Container } from '@mui/material';


export default function Layout() {
  return (
      <AppBar position="sticky" style={{minWidth: 1000}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" underline="none" color="primary">Futbarajitas</Link>
          </Typography>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/dashboard">Inicio</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/album">Álbum</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/store">Comprar</Link>
          </Typography>
          
          <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
              <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
}

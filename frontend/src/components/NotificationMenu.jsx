import React, { useState } from 'react';
import { Badge, Box, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import colors from "../utils/constants/colors";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAlert } from "../context/AlertContext";
import { alertMessages, alertTypes } from "../utils/constants";
import OfferModal from './OfferModal';


const dummyTrades = [
    { username: 'Usuario1', receive: '1', offer: '2' },
    { username: 'Usuario2', receive: '3', offer: '4' },
    { username: 'Usuario3', receive: '5', offer: '6' },
    { username: 'Usuario4', receive: '7', offer: '8' },
    { username: 'Usuario5', receive: '9', offer: '10' },
    { username: 'Usuario6', receive: '11', offer: '12' },
    { username: 'Usuario7', receive: '13', offer: '14' },
    { username: 'Usuario8', receive: '15', offer: '16' },
    { username: 'Usuario9', receive: '17', offer: '18' }
]

export default function NotificationMenu() {
    const [trades, setTrades] = useState(dummyTrades);
    const [counterOffer, setCounterOffer] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(0);
    const open = Boolean(anchorEl);
    const showAlert = useAlert();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const nextStep = () => {
        if (step < trades.length - 3) {
            setStep(step + 1);
        }
    };

    const handleAccept = (offer) => {
        console.log('Accepted', offer);
        setTrades(trades.filter((o) => o !== offer));
        showAlert(alertMessages.accept_trade, alertTypes.success);
        handleClose();
    }

    const handleReject = (offer) => {
        console.log('Reject', offer);
        setTrades(trades.filter((o) => o !== offer));
        showAlert(alertMessages.reject_trade, alertTypes.error);
        handleClose();
    }

    const handleCounterOffer = (offer) => {
        console.log(offer);
        setCounterOffer(offer);
        setShowModal(true);
        handleClose();
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setCounterOffer(null)
    }

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginRight: 5 }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Badge badgeContent={trades.length} color="error">
                            <MailIcon sx={{ fontSize: 35, color: colors.secondary }} />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        mt: 1.5,
                        backgroundColor: '#581E3D',
                        padding: "0.5rem",
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={{ backgroundColor: 'rgb(78, 20, 50)', cursor: 'default', "&:hover": { backgroundColor: 'rgb(78, 20, 50)' } }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={4}>
                            <ListItemText sx={{ fontSize: '0.5rem', textAlign: 'center', color: '#FFFFFF' }}> Carta a recibir </ListItemText>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItemText sx={{ fontSize: '0.5rem', textAlign: 'center', color: '#FFFFFF' }}> Carta ofrecida </ListItemText>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItemText sx={{ fontSize: '0.5rem', textAlign: 'center', color: '#FFFFFF' }}> Acciones </ListItemText>
                        </Grid>
                    </Grid>
                </MenuItem>
                {trades.slice(step, step + 3).map((offer) => (
                    <MenuItem key={offer.username} sx={{ cursor: 'default' }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <ListItemText sx={{ textAlign: 'center', color: '#FFFFFF' }}>{offer.receive}</ListItemText>
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemText sx={{ textAlign: 'center', color: '#FFFFFF' }}>{offer.offer}</ListItemText>
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemIcon>
                                    <Tooltip title="Aceptar intercambio">
                                        <IconButton onClick={() => handleAccept(offer)}>
                                            <CheckIcon color="success" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Rechazar intercambio">
                                        <IconButton onClick={() => handleReject(offer)}>
                                            <CloseIcon color="error" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Contraofertar">
                                        <IconButton onClick={() => handleCounterOffer(offer)}>
                                            <TurnLeftIcon sx={{ color: '#d9d9d9' }} />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemIcon>
                            </Grid>
                        </Grid>
                    </MenuItem>
                ))}
                <MenuItem sx={{ backgroundColor: 'rgb(78, 20, 50)', cursor: 'default', "&:hover": { backgroundColor: 'rgb(78, 20, 50)' } }}>
                    <Grid container justifyContent="space-around">
                        <IconButton onClick={prevStep} disabled={step === 0}>
                            <ArrowBackIosIcon sx={{ color: step === 0 ? '#8c8c8c' : '#FFFFFF' }} />
                        </IconButton>
                        <IconButton onClick={nextStep} disabled={step >= trades.length - 3}>
                            <ArrowForwardIosIcon sx={{ color: step >= trades.length - 3 ? '#8c8c8c' : '#FFFFFF' }} />
                        </IconButton>
                    </Grid>
                </MenuItem>
            </Menu>
            <OfferModal show={showModal} onClose={handleCloseModal} offer={counterOffer} />
        </React.Fragment>
    );
}

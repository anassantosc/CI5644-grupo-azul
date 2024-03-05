import React, {useState} from 'react';
import {Badge, Box, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import colors from "../utils/constants/colors";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAlert } from "../context/AlertContext";
import { alertMessages, alertTypes } from "../utils/constants";
import CounterOfferModal from "./CounterOfferModal";


const dummyTrades = [
    {nombreUsuario: 'Usuario1', idCartaQueQuiere: '1', idCartaQueOfrece: '2'},
    {nombreUsuario: 'Usuario2', idCartaQueQuiere: '3', idCartaQueOfrece: '4'},
    {nombreUsuario: 'Usuario3', idCartaQueQuiere: '5', idCartaQueOfrece: '6'},
    {nombreUsuario: 'Usuario4', idCartaQueQuiere: '7', idCartaQueOfrece: '8'},
    {nombreUsuario: 'Usuario5', idCartaQueQuiere: '9', idCartaQueOfrece: '10'},
    {nombreUsuario: 'Usuario6', idCartaQueQuiere: '11', idCartaQueOfrece: '12'},
    {nombreUsuario: 'Usuario7', idCartaQueQuiere: 13, idCartaQueOfrece: 14},
    {nombreUsuario: 'Usuario8', idCartaQueQuiere: 15, idCartaQueOfrece: 16},
    {nombreUsuario: 'Usuario9', idCartaQueQuiere: 17, idCartaQueOfrece: 18},
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
        console.log('click');
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        console.log('close');
        setAnchorEl(null);
    };

    const nextStep = () => {
        if (step < trades.length - 3) {
            setStep(step + 1);
        }
    };

    const handleAccept = (offer) => {
        console.log('Accept', offer);
        setTrades(trades.filter((o) => o !== offer));
        showAlert(alertMessages.accept_trade, alertTypes.success);
    }

    const handleReject = (offer) => {
        console.log('Reject', offer);
        setTrades(trades.filter((o) => o !== offer));
        showAlert(alertMessages.reject_trade, alertTypes.error);
    }

    const handleCounterOffer = (offer) => {
        console.log('Counter Offer', offer);
        setCounterOffer(offer);
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center', marginRight: 5}}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Badge badgeContent={trades.length} color="error">
                            <MailIcon sx={{fontSize: 35, color: colors.secondary}}/>
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
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        padding: "0.5rem",
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={4}>
                            <ListItemText sx={{fontSize: '0.5rem', textAlign: 'center'}}> Carta a recibir </ListItemText>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItemText sx={{fontSize: '0.5rem', textAlign: 'center'}}> Carta ofrecida </ListItemText>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItemText sx={{fontSize: '0.5rem', textAlign: 'center'}}> Acciones </ListItemText>
                        </Grid>
                    </Grid>
                </MenuItem>
                {trades.slice(step, step + 3).map((offer) => (
                    <MenuItem key={offer.nombreUsuario}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <ListItemText sx={{textAlign: 'center'}}>{offer.idCartaQueQuiere}</ListItemText>
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemText sx={{textAlign: 'center'}}>{offer.idCartaQueOfrece}</ListItemText>
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemIcon>
                                    <Tooltip title="Aceptar intercambio">
                                        <IconButton onClick={() => handleAccept(offer)}>
                                            <CheckIcon color="success"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Rechazar intercambio">
                                        <IconButton onClick={() => handleReject(offer)}>
                                            <CloseIcon color="error"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Contraofertar">
                                        <IconButton onClick={() => handleCounterOffer(offer)}>
                                            <TurnLeftIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </ListItemIcon>
                            </Grid>
                        </Grid>
                    </MenuItem>
                ))}
                <MenuItem>
                    <Grid container justifyContent="space-around">
                        <IconButton onClick={prevStep} disabled={step === 0}>
                            <ArrowBackIosIcon/>
                        </IconButton>
                        <IconButton onClick={nextStep} disabled={step >= trades.length - 3}>
                            <ArrowForwardIosIcon/>
                        </IconButton>
                    </Grid>
                </MenuItem>
            </Menu>
            <CounterOfferModal show={showModal} onClose={handleCloseModal} offer={counterOffer}/>
        </React.Fragment>
);
}

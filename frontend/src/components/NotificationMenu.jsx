import React, {useState} from 'react';
import {Badge, Box, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import colors from "../utils/constants/colors";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useAlert} from "../context/AlertContext";
import {alertMessages, alertTypes} from "../utils/constants";
import OfferModal from './OfferModal';
import {useGetOffers} from '../hooks/useGetOffers';
import {AcceptOffer} from '../utils/fetchs/AcceptOffer';
import {DenyOffer} from '../utils/fetchs/DenyOffer';
import styles from '../../styles/NotificationMenu.module.css';


export default function NotificationMenu() {
    const [page, setPage] = useState(0);
    const {offers: trades, loading, error} = useGetOffers(page);
    const [counterOffer, setCounterOffer] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showModal, setShowModal] = useState(false);
    const open = Boolean(anchorEl);
    const showAlert = useAlert();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setPage(0);
    };

    const nextStep = () => {
        setPage(page + 1);
    };

    const handleAccept = async (offerId) => {
        try {
            const response = await AcceptOffer(offerId);
            if (response.ok) {
                showAlert(alertMessages.accept_trade, alertTypes.success);
            } else {
                showAlert(alertMessages.offer_not_exists, alertTypes.error);
            }
        } catch (error) {
            showAlert(alertMessages.accept_trade_error, alertTypes.error);
        }
        handleClose();
    };

    const handleDeny = async (offer) => {
        try {
            const response = await DenyOffer(offerId);
            if (response.ok) {
                showAlert(alertMessages.deny_trade, alertTypes.success);
            } else {
                showAlert(alertMessages.offer_not_exists, alertTypes.error);
            }
        } catch (error) {
            showAlert(alertMessages.deny_trade_error, alertTypes.error);
        }
        handleClose();
    };

    const handleCounterOffer = (offer) => {
        setCounterOffer(offer);
        setShowModal(true);
        handleClose();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCounterOffer(null);
    };

    const prevStep = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center', marginRight: 5}}>
                <Tooltip title="Notificaciones de Intercambio">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'notificaciones' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Badge badgeContent={(trades.length < 3)? `${trades.length}` :`${trades.length}+`} color="error">
                            <MailIcon className={styles.notificationMenuBadge}/>
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
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem className={`${styles.menuItem} ${styles.menuItemHover}`} >
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={4}>
                            <ListItemText className={styles.listItemTextTitle}> Carta a
                                recibir </ListItemText>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItemText className={styles.listItemTextTitle}> Carta
                                ofrecida </ListItemText>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItemText className={styles.listItemTextTitle}> Acciones </ListItemText>
                        </Grid>
                    </Grid>
                </MenuItem>
                {trades.map((offer) => (
                    <MenuItem key={offer.id} sx={{cursor: 'default'}}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <ListItemText className={styles.listItemText}>{offer.cardReceive}</ListItemText>
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemText className={styles.listItemText}>{offer.cardOffer}</ListItemText>
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemIcon>
                                    <Tooltip title="Aceptar intercambio">
                                        <IconButton onClick={() => handleAccept(offer.id)}>
                                            <CheckIcon color="success"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Rechazar intercambio">
                                        <IconButton onClick={() => handleDeny(offer.id)}>
                                            <CloseIcon color="error"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Contraofertar">
                                        <IconButton onClick={() => handleCounterOffer(offer)}>
                                            <TurnLeftIcon className={styles.iconButton}/>
                                        </IconButton>
                                    </Tooltip>
                                </ListItemIcon>
                            </Grid>
                        </Grid>
                    </MenuItem>
                ))}
                <MenuItem className={`${styles.menuItem} ${styles.menuItemHover}`}>
                    <Grid container justifyContent="space-around">
                        <IconButton onClick={prevStep} disabled={page === 0}>
                            <ArrowBackIosIcon sx={{color: page === 0 ? '#8c8c8c' : '#FFFFFF'}}/>
                        </IconButton>
                        <IconButton onClick={nextStep} disabled={trades.length < 3 }>
                            <ArrowForwardIosIcon sx={{color: trades.length < 3 ? '#8c8c8c' : '#FFFFFF'}}/>
                        </IconButton>
                    </Grid>
                </MenuItem>
            </Menu>
            <OfferModal show={showModal} onClose={handleCloseModal} offer={counterOffer}/>
        </>
    );
}

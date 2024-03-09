import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAlert } from "../context/AlertContext";
import OfferModal from "./OfferModal";
import { useGetOffers } from "../hooks/useGetOffers";
import { AcceptOffer } from "../utils/fetchs/AcceptOffer";
import { DenyOffer } from "../utils/fetchs/DenyOffer";
import styles from "../../styles/NotificationMenu.module.css";

export default function NotificationMenu() {
  const [page, setPage] = useState(0);
  const [step, setStep] = useState(0);
  const { offers: trades, loading, error } = useGetOffers(page);
  const [haveOffers, setHaveOffers] = useState(trades.length > 0);
  const [counterOffer, setCounterOffer] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showModal, setShowModal] = useState(false);
  const open = Boolean(anchorEl);
  const showAlert = useAlert();

  useEffect(() => {
    if (page === 0) {
      setHaveOffers(trades.length > 0);
    }
  }, [trades]);

  const handleClick = (event) => {
    console.log(trades);
    console.log(trades.length);
    console.log(haveOffers);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setPage(1);
    setPage(0);
    setStep(0);
    setHaveOffers(trades.length > 0);
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setPage(page + 1);
      setStep(0);
    }
  };

  const handleAccept = async (offerId) => {
    const response = await AcceptOffer(offerId, showAlert);
    handleClose();
  };

  const handleDeny = async (offerId) => {
    const response = await DenyOffer(offerId, showAlert);
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
    if (step > 0) {
      setStep(step - 1);
    } else {
      if (page > 0) {
        setPage(page - 1);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginRight: 5,
        }}
      >
        <Tooltip title="Notificaciones de Intercambio">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "notificaciones" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Badge
              badgeContent={
                haveOffers ? (trades.length < 5 ? trades.length : "5+") : null
              }
              color="error"
            >
              <MailIcon className={styles.notificationMenuBadge} />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      {haveOffers && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              mt: 1.5,
              backgroundColor: "#581E3D",
              padding: "0.5rem",
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem className={`${styles.menuItem} ${styles.menuItemHover}`}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={4}>
                <ListItemText className={styles.listItemTextTitle}>
                  {" "}
                  Carta a recibir{" "}
                </ListItemText>
              </Grid>
              <Grid item xs={4}>
                <ListItemText className={styles.listItemTextTitle}>
                  {" "}
                  Carta ofrecida{" "}
                </ListItemText>
              </Grid>
              <Grid item xs={4}>
                <ListItemText className={styles.listItemTextTitle}>
                  {" "}
                  Acciones{" "}
                </ListItemText>
              </Grid>
            </Grid>
          </MenuItem>
          {trades.slice(5*step, 5*(step+1)).map((offer) => (
            <MenuItem key={offer.id} sx={{ cursor: "default" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <ListItemText className={styles.listItemText}>
                    {offer.cardReceive}
                  </ListItemText>
                </Grid>
                <Grid item xs={4}>
                  <ListItemText className={styles.listItemText}>
                    {offer.cardOffer}
                  </ListItemText>
                </Grid>
                <Grid item xs={4}>
                  <ListItemIcon>
                    <Tooltip
                      title={
                        "Aceptar " +
                        (offer.status === "PENDING"
                          ? "Intercambio"
                          : "Contraoferta")
                      }
                    >
                      <IconButton onClick={() => handleAccept(offer.id)}>
                        <CheckIcon color="success" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={
                        "Rechazar " +
                        (offer.status === "PENDING"
                          ? "Intercambio"
                          : "Contraoferta")
                      }
                    >
                      <IconButton onClick={() => handleDeny(offer.id)}>
                        <CloseIcon color="error" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={
                        offer.status === "PENDING"
                          ? "Contraofertar"
                          : "Ya es una contraoferta"
                      }
                    >
                      <span>
                        <IconButton
                          onClick={() => handleCounterOffer(offer)}
                          disabled={offer.status !== "PENDING"}
                        >
                          <TurnLeftIcon className={styles.iconButton} />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </ListItemIcon>
                </Grid>
              </Grid>
            </MenuItem>
          ))}
          <MenuItem className={`${styles.menuItem} ${styles.menuItemHover}`}>
            <Grid container justifyContent="space-around">
              <IconButton onClick={prevStep} disabled={page === 0}>
                <ArrowBackIosIcon
                  sx={{ color: page === 0 ? "#8c8c8c" : "#FFFFFF" }}
                />
              </IconButton>
              <IconButton onClick={nextStep} disabled={trades.length < 5}>
                <ArrowForwardIosIcon
                  sx={{ color: trades.length < 5*(step + 1)  ? "#8c8c8c" : "#FFFFFF" }}
                />
              </IconButton>
            </Grid>
          </MenuItem>
        </Menu>
      )}
      <OfferModal
        show={showModal}
        onClose={handleCloseModal}
        offer={counterOffer}
      />
    </>
  );
}

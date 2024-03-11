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
import { GetOffers } from "../utils/fetchs/GetOffers";
import { AcceptOffer } from "../utils/fetchs/AcceptOffer";
import { DenyOffer } from "../utils/fetchs/DenyOffer";
import styles from "../../styles/NotificationMenu.module.css";

export default function NotificationMenu() {
  const [page, setPage] = useState(0);
  const [offers, setOffers] = useState([]);
  const [counterOffer, setCounterOffer] = useState(null);
  const [haveOffers, setHaveOffers] = useState(offers.length > 0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showModal, setShowModal] = useState(false);
  const open = Boolean(anchorEl);
  const showAlert = useAlert();

  const getOffers = async () => {
    try {
        const data = await GetOffers(page);
        setOffers(data)
    } catch (error) {
        console.log(e)
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPage(0);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
    setPage(0);
  };

  const nextPage = () => {
    setPage(page + 1)
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleAccept = async (offerId) => {
    await AcceptOffer(offerId, showAlert);
    getOffers();
  };

  const handleDeny = async (offerId) => {
    await DenyOffer(offerId, showAlert);
    getOffers();
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

  useEffect(() => {
    if (page === 0) {
      setHaveOffers(offers.length > 0);
    }
  }, [offers]);

  useEffect(() => {
    getOffers();
  }, [page]);

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
                haveOffers ? (offers.length < 5 ? offers.length : "5+") : null
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
          {offers.map((offer) => (
            <MenuItem key={offer.id} sx={{ cursor: "default" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <ListItemText className={styles.listItemText}>
                    {offer.cardOffer}
                  </ListItemText>
                </Grid>
                <Grid item xs={4}>
                  <ListItemText className={styles.listItemText}>
                    {offer.cardReceive}
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
              <IconButton onClick={prevPage} disabled={page === 0}>
                <ArrowBackIosIcon
                  sx={{ color: page === 0 ? "#8c8c8c" : "#FFFFFF" }}
                />
              </IconButton>
              <IconButton onClick={nextPage} disabled={offers.length < 5}>
                <ArrowForwardIosIcon
                  sx={{
                    color:
                      offers.length < 5 ? "#8c8c8c" : "#FFFFFF",
                  }}
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

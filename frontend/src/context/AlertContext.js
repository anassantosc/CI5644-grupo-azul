import React, { createContext, useCallback, useContext, useState } from "react";
import { Alert, Fade } from "@mui/material";
import Proptypes from "prop-types";

const AlertContext = createContext();

export const useAlert = () => {
    try {
        const context = useContext(AlertContext);
        if (!context) {
            throw new Error("useAlert must be used within an AlertProvider");
        }
        return context;
    } catch (error) {
        console.error(error);
    }
};

export const AlertProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info");

    const showAlert = useCallback(
        (newMessage, newSeverity = "info") => {
            setMessage(newMessage);
            setSeverity(newSeverity);
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
            }, 3000);
        },
        [setMessage, setSeverity, setOpen]
    );

    const hideAlert = () => {
        setOpen(false);
    };

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            <Fade in={open} timeout={1000}>
                <Alert
                    severity={severity}
                    onClose={hideAlert}
                    sx={{
                        position: "fixed",
                        bottom: 5,
                        left: 5,
                        zIndex: 10,
                    }}
                >
                    {message}
                </Alert>
            </Fade>
        </AlertContext.Provider>
    );
};

AlertProvider.propTypes = {
    children: Proptypes.object,
};

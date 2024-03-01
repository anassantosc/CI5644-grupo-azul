import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

const BUTTON_STYLES = {
    PADDING: "10px 20px",
    BORDER_RADIUS: "5px",
    TEXT_TRANSFORM: "uppercase",
    FONT_WEIGHT: "bold",
};

const STYLEDBUTTON_SIZE = {
    SMALL: "small",
};

const StyledButton = styled(Button)(({ bgcolor, textcolor }) => ({
    backgroundColor: bgcolor,
    color: textcolor,
    padding: BUTTON_STYLES.PADDING,
    borderRadius: BUTTON_STYLES.BORDER_RADIUS,
    textTransform: BUTTON_STYLES.TEXT_TRANSFORM,
    fontWeight: BUTTON_STYLES.FONT_WEIGHT,
    "&:hover": {
        backgroundColor: bgcolor,
    },
}));

export default function ColorButton({
    bgcolor,
    textcolor,
    children,
    onClick,
    ...props
}) {
    return (
        <StyledButton
            bgcolor={bgcolor}
            textcolor={textcolor}
            size={STYLEDBUTTON_SIZE.SMALL}
            onClick={onClick}
            {...props}
        >
            {children}
        </StyledButton>
    );
}

ColorButton.propTypes = {
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

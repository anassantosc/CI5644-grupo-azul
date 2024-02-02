import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

const StyledButton = styled(Button)(({ bgColor, textColor }) => ({
    backgroundColor: bgColor,
    color: textColor,
    padding: "10px 15px",
    borderRadius: "0.5rem",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: bgColor,
    },
}));

export default function ColorButton({
    bgColor,
    textColor,
    children,
    onClick,
    ...props
}) {
    return (
        <StyledButton
            bgColor={bgColor}
            textColor={textColor}
            size="small"
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
    children: PropTypes.string,
    onClick: PropTypes.func,
};

import React from "react";
import {Button} from "@mui/material";
import {styled} from "@mui/system";
import PropTypes from "prop-types";

const StyledButton = styled(Button)(({bgcolor, textcolor}) => ({
    backgroundColor: bgcolor,
    color: textcolor,
    padding: "10px 15px",
    borderRadius: "0.5rem",
    textTransform: "none",
    fontWeight: "bold",
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
    children: PropTypes.node,
    onClick: PropTypes.func,
};


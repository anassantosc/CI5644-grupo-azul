import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import CircularProgress, {
    circularProgressClasses,
} from "@mui/material/CircularProgress";

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    position: "absolute",
    [`&.${circularProgressClasses.colorPrimary}`]: {
        color: "white", // Este es el circulo de progreso
    },
    [`&.${circularProgressClasses.colorSecondary}`]: {
        color: "#731530", // Este es el circulo de fondo
    },
}));

const ProgressCircle = ({ value }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
            }}
        >
            <StyledCircularProgress
                variant="determinate"
                size={200}
                thickness={6}
                value={100}
                color="secondary"
            />
            <StyledCircularProgress
                variant="determinate"
                size={200}
                thickness={6}
                value={Number(value)}
                color="primary"
            />
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "200px",
                    height: "200px",
                    color: "white",
                    fontSize: "35px",
                    fontWeight: "semi-bold",
                }}
            >
                {value}%
            </div>
        </div>
    );
};

ProgressCircle.propTypes = {
    value: PropTypes.string.isRequired,
};

export default ProgressCircle;

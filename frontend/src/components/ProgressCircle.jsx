import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import CircularProgress, {
    circularProgressClasses,
} from "@mui/material/CircularProgress";
import styles from "./../../styles/ProgressCircle.module.css";
import {colors} from "../utils/constants";

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    position: "absolute",
    [`&.${circularProgressClasses.colorPrimary}`]: {
        color: colors.secondary,
    },
    [`&.${circularProgressClasses.colorSecondary}`]: {
        color: colors.primary,
    },
}));

const ProgressCircle = ({ value }) => {
    return (
        <div className={styles.progressCircleContainer} >
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
            <div className={styles.progressCircle} >
                {value}%
            </div>
        </div>
    );
};

ProgressCircle.propTypes = {
    value: PropTypes.string.isRequired,
};

export default ProgressCircle;

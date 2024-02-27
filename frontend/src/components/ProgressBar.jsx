import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "../../styles/ProgressBar.module.css";
const ProgressBar = ({ value }) => {
    return <LinearProgress className={styles.linearProgress} variant="determinate" value={value} />;
};

ProgressBar.propTypes = {
    value: PropTypes.string.isRequired,
};

export default ProgressBar;

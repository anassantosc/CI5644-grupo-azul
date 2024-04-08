import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "../../styles/ProgressBar.module.css";

const ProgressBar = ({ value }) => {
    return <LinearProgress className={styles.linearProgress} variant="determinate" value={value} />;
};

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
};

export default ProgressBar;

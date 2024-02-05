import React from "react";
import styles from "./../../styles/Background.module.css";

export const Background = () => {
    return (
        <div className={styles.container}>
            <div className={styles.circles}></div>
            <div className={styles.blur}></div>
        </div>
    );
};
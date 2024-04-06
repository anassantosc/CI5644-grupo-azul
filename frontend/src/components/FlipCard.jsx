import React from "react";
import {Card} from "./Card";
import styles from './../../styles/FlipCard.module.css';

export const FlipCard = (props) => {
    return (
        props.name && (
            <div className={`${styles.fullCard} ${props.flipped ? styles.flipped : ''}`}>
                <div className={styles.backCard}>
                </div>
                <div className={styles.frontCard}>
                    <Card {...props}/>
                </div>
            </div>
        )
    )
};

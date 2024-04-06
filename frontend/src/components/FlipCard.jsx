import React from "react";
import {Card} from "./Card";
import styles from './../../styles/FlipCard.module.css';
import images from "../utils/constants/images";
import Image from "next/image";

const IMAGES_PROPS = {
    width: 0,
    height: 0,
    sizes: "100vw",
    priority: true,
};

export const FlipCard = (props) => {

    return (
        props.name && (
            <div className={`${styles.fullCard} ${props.flipped ? styles.flipped : ''}`}>
                <div className={styles.backCard}>
                    <Image
                        src={images.backCard}
                        className={styles.backCardSize}
                        sizes={IMAGES_PROPS.sizes}
                        width={IMAGES_PROPS.width}
                        height={IMAGES_PROPS.height}
                        alt='Imagen de jugador'
                        priority={IMAGES_PROPS.priority}
                    />
                </div>
                <div className={styles.frontCard}>
                    <Card {...props}/>
                </div>
            </div>
        )
    )
};

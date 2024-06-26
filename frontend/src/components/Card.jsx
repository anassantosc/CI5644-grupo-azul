import {
    faDumbbell,
    faFlag,
    faRulerVertical,
    faUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import styles from "../../styles/Card.module.css";
import images from "../utils/constants/images";

const IMAGES_PROPS = {
    width: 0,
    height: 0,
    sizes: "100vw",
    priority: true,
};

export const Card = ({ name, number, position, height, weight }) => {

    return name ? (
        <div className={styles.card}>
            <div className={styles.card__info}>
                <div className={styles.card__attr}>
                    <div
                        className={`${styles.card__attr__item}, ${styles.card__attr__itemReverse}`}
                    >
                        <FontAwesomeIcon icon={faFlag} />
                        <h3 className={styles.card__heading}>{number}</h3>
                    </div>
                    <div className={styles.card__attr__item}>
                        <FontAwesomeIcon icon={faUpDownLeftRight} />
                        <p className={styles.card__text}>{position}</p>
                    </div>
                    <div className={styles.card__attr__item}>
                        <FontAwesomeIcon icon={faRulerVertical} />
                        <p className={styles.card__text}>{height}</p>
                    </div>
                    <div className={styles.card__attr__item}>
                        <FontAwesomeIcon icon={faDumbbell} />
                        <p className={styles.card__text}>{weight}</p>
                    </div>
                </div>
                <div className={styles.card__img}>
                    <Image
                        src={images.playerBackground}
                        sizes={IMAGES_PROPS.sizes}
                        width={IMAGES_PROPS.width}
                        height={IMAGES_PROPS.height}
                        className={styles.image__fullsize}
                        alt='Imagen de jugador'
                        priority={IMAGES_PROPS.priority}
                    />
                </div>
            </div>
            <div className={styles.card__playerName}>{name}</div>
        </div>
    ) : (
        <div className={styles.card}>
            <div className={styles.card__img}>
                <Image
                    src={images.unknownPlayer}
                    sizes={IMAGES_PROPS.sizes}
                    width={IMAGES_PROPS.width}
                    height={IMAGES_PROPS.height}
                    className={styles.image__fullsize}
                    alt='No tienes este jugador aún'
                    priority={IMAGES_PROPS.priority}
                />
            </div>
            <div className={styles.card__playerName}>{number}</div>
        </div>
    );
};

Card.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number.isRequired,
    position: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
};

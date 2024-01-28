import React from "react";
import styles from "./../../styles/Card.module.css";
import playerImage from "./../assets/player-background.png";
import Image from "next/image";
import { faRulerVertical,faDumbbell, faFlag, faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'



export const Card = ({ name, number, position, height, weight }) => {
    return (
        <div className={styles.card}>
            <div className={styles.card__info}>
                <div className={styles.card__attr}>
                    <div
                        className={`${styles.card__attr__item}, ${styles.card__attr__itemReverse}`}
                    >
                        <FontAwesomeIcon icon={faFlag}/>
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
                        src={playerImage}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "100%" }}
                        alt="Imagen de jugador"
                    />
                </div>
            </div>
            <div className={styles.card__playerName}>{name}</div>
        </div>
    );
};

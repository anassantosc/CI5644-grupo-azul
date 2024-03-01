import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import { useGetCards } from "../hooks/useGetCards";
import { useProgress } from "../hooks/useProgress";
import Layout from "../layout/Layout";
import styles from "./../../styles/Album.module.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from '@mui/material/Button';
import OfferModal from "../components/OfferModal";

function Album() {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [currentCards, setCurrentCards] = useState([]);
    const [show, setShow] = useState(false);

    const { cards, loading, error } = useGetCards(page);
    const progress = useProgress();
    const fullSize = Array(641);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const nextPage = () => {
        if (size < 640) {
            setPage(page + 1);
            setSize((size) => size + 20);
        }
    };

    const previousPage = () => {
        setPage(page > 0 ? page - 1 : 0);
        if (page > 0) {
            setSize((size) => size - 20);
        }
    };

    useEffect(() => {
        setCurrentCards(cards);
    }, [cards]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Layout>
            <OfferModal show={show} onClose={handleClose} />
            <div className={styles.container}>
                <div className={styles.containerH1}>
                    <h1 className={styles.title} >Album</h1>
                    <div className={styles.containerButton}>
                        <Button
                            variant="contained"
                            onClick={handleShow}
                            size="medium"
                            className={styles.offerButton}>Ofertar</Button>
                    </div>
                </div>
                {progress !== null && typeof progress === 'number' && (
                    <div className={styles.progressBar}>
                        <div className={styles.containerProgress}>
                            <h2 style={{ margin: '0' }}>Progreso Actual</h2>
                            <h2 style={{ margin: '0' }}>{progress.toFixed(2)}%</h2>
                        </div>
                        <ProgressBar value={progress} />
                    </div>
                )}
            </div>

            <div className={styles.albumCards}>
                {[...fullSize.keys()]
                    .slice(size - 19, size + 1)
                    .map((index) => {
                        const card = currentCards.find(
                            (card) => card.id === index
                        );
                        return (
                            <Card
                                key={index}
                                name={card ? card.playerName : null}
                                number={index}
                                position={card ? card.position : null}
                                height={card ? card.height + "m" : "0.0m"}
                                weight={card ? card.weight.toFixed(1) + "Kg" : "0.0Kg"}
                            />
                        );
                    })}
            </div>
            <div className={styles.paginator}>
                <button className={styles.arrow} onClick={previousPage}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Página Anterior
                </button>
                <button className={styles.arrow} onClick={nextPage}>
                    Página Siguiente
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
            <div className={styles.pageCount}>
                <h3>Página {page + 1} de 32</h3>
            </div>
        </Layout>
    );
}

export default Album;

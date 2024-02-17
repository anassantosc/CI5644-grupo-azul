import React, { useState } from "react";
import Layout from "../layout/Layout";
import { SearchBar } from "./../components/SearchBar";
import { useProgress } from "./../hooks/UseProgress";
import { Card } from "./../components/Card";
import styles from "./../../styles/Album.module.css";
import ProgressBar from "./../components/ProgressBar";
import { useGetCards } from "../hooks/UseGetCards";

function Album() {
    const [page, setPage] = useState(0);
    const { cards, loading, error } = useGetCards(page);
    const progress = useProgress();

    const nextPage = () => {
        setPage(page + 1);
    };

    const previousPage = () => {
        setPage(page > 0 ? page - 1 : 0);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.containerH1}>
                    <h1>Album</h1>
                </div>
                <SearchBar />
                <div className={styles.progressBar}>
                    <h2>Progreso Actual</h2>
                    {progress && <ProgressBar value={progress} />}
                </div>
            </div>

            <div className={styles.albumCards}>
                {cards &&
                    cards.map((card) => (
                        <Card
                            key={card.id}
                            name={card.playerName}
                            number={card.id}
                            position={card.position}
                            height={card.height}
                            weight={card.weight}
                        />
                    ))}
            </div>
            <div>
                <button onClick={previousPage}>Página Anterior</button>
                <button onClick={nextPage}>Página Siguiente</button>
            </div>
        </Layout>
    );
}

export default Album;

import React from "react";
import Layout from "../layout/Layout";
import {SearchBar} from "./../components/SearchBar";
import {useProgress} from "./../hooks/UseProgress";
import {usePageableCards} from "./../hooks/UsePageableCards";
import {Card} from "./../components/Card";
import styles from "./../../styles/Album.module.css";
import ProgressBar from "./../components/ProgressBar";

function Album() {
    const {cards, loading, error} = usePageableCards(1);
    const progress = useProgress(1);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
            <Layout>

                <div className={styles.container}>
                    <div className={styles.containerH1}>
                        <h1>Album</h1>
                    </div>
                    <SearchBar/>
                    <div className={styles.progressBar}>
                        <h2>Progreso Actual</h2>
                        {progress && <ProgressBar value={progress}/>}
                    </div>
                </div>

                <div className={styles.albumCards}>
                {cards && cards.map((card) => (
                            <Card
                                name={card.playerName}
                                number={card.id}
                                position={card.position}
                                height={card.height}
                                weight={card.weight}
                            />
                    ))}
                </div>
            </Layout>

    );
}

export default Album;


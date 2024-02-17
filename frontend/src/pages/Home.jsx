import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { Card } from "../components/Card";
import styles from "./../../styles/Home.module.css";
import albumImage from "./../assets/album.png";
import packImage from "./../assets/pack.png";
import { useMundialProgress } from "../hooks/useMundialProgress";
import TopMundial from "../components/TopMundial";

const ColorButton = styled(Button)(({ theme, margintop }) => ({
    color: "#581E3D",
    fontWeight: "600",
    backgroundColor: "#FFF",
    padding: "10px 30px 10px 30px",
    textTransform: "none",
    marginTop: margintop,
    "&:hover": {
        backgroundColor: "#FFF",
    },
}));

export const Home = () => {
    const mundialProgress = useMundialProgress();
    return (
        <div className={styles.home}>
            <div className={styles.homeTop}>
                <h1 className={styles.topText}>
                    VIVA LA EMOCIÓN DEL DEPORTE REY
                </h1>
                <div className={styles.cardPack}>
                    <Card
                        number={10}
                        name={"Lionel Messi"}
                        height={"1.70m"}
                        weight={"72kg"}
                        position={"DC"}
                    />
                    <div className={styles.leftCard}>
                        <Card
                            number={10}
                            name={"Lionel Messi"}
                            height={"1.70m"}
                            weight={"72kg"}
                            position={"DC"}
                        />
                    </div>
                    <div className={styles.rightCard}>
                        <Card
                            number={10}
                            name={"Lionel Messi"}
                            height={"1.70m"}
                            weight={"72kg"}
                            position={"DC"}
                        />
                    </div>
                </div>

                {mundialProgress && (
                    <TopMundial
                        firstPlace={mundialProgress[0]}
                        secondPlace={mundialProgress[1]}
                        thirdPlace={mundialProgress[2]}
                    />
                )}
                <ColorButton margintop="70px">Comienza ahora</ColorButton>
            </div>

            <div className={styles.homeMiddle}>
                <Image
                    src={albumImage}
                    width={398}
                    height={552}
                    alt="Imagen de album"
                />
                <span className={styles.homeMiddleText}>
                    <p>
                        ¡Revive la magia del Mundial 2022 con nuestro álbum de
                        barajitas!
                    </p>
                    <p>
                        Colecciona, intercambia y guarda los momentos más
                        emocionantes del fútbol. ¡Empieza tu aventura hoy!
                    </p>
                    <ColorButton>¡Colecciónalas!</ColorButton>
                </span>
            </div>

            <div className={styles.homeBottom}>
                <Image
                    src={packImage}
                    width={407}
                    height={432}
                    alt="Imagen de paquete de barajitas"
                />
                <span className={styles.homeBottomText}>
                    <p>
                        ¡Descubre la emoción del Mundial 2026 con cada sobre de
                        barajitas!
                    </p>
                    <p>
                        Cada sobre contiene 5 barajitas, 5 momentos únicos para
                        coleccionar. ¡Abre, descubre y colecciona hoy!
                    </p>
                    <ColorButton>¡Adquiérelas ya!</ColorButton>
                </span>
            </div>
        </div>
    );
};

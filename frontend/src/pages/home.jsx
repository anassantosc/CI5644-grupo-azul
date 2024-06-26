import {Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import Image from "next/image";
import {Card} from "../components/Card";
import styles from "../../styles/Home.module.css";
import images from "../utils/constants/images";
import {useMundialProgress} from "../hooks/useMundialProgress";
import TopMundial from "../components/TopMundial";
import {useRouter} from 'next/router';
import {useAuthentication} from "../hooks/useAuthentication";

const ColorButton = styled(Button)(({theme, margintop}) => ({
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

const Home = () => {
    const router = useRouter();
    const isLogin = useAuthentication();
    const mundialProgress = useMundialProgress(isLogin);

    const handleClick = () => {
        router.push("/store");
    };

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
                <ColorButton onClick={handleClick} margintop="70px">Comienza ahora</ColorButton>
            </div>

            <div className={styles.homeMiddle}>
                <Image
                    src={images.album}
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
                    src={images.pack}
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

export default Home;
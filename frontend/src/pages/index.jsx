import React from "react";
import { Card } from "../components/Card";
import { SearchBar } from "../components/SearchBar";
import Layout from "../layout/Layout";

export default function Home() {
    return (
        <>
            <Layout>
                <h1>VIVA LA EMOCIÓN DEL DEPORTE REY</h1>
                <div className="card-pack">
                    <Card
                        number={10}
                        name={"Lionel Messi"}
                        height={"1.70m"}
                        weight={"72kg"}
                        position={"DC"}
                    />
                    <Card
                        number={10}
                        name={"Lionel Messi"}
                        height={"1.70m"}
                        weight={"72kg"}
                        position={"DC"}
                    />
                    <Card
                        number={10}
                        name={"Lionel Messi"}
                        height={"1.70m"}
                        weight={"72kg"}
                        position={"DC"}
                    />
                </div>
            </Layout>
        </>
    );
}

import React from "react";
import Layout from "../layout/Layout";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { SearchBar } from "../components/SearchBar";

export default function Home() {
    return (
        <>
            <Layout />
            <SearchBar />
            <div> Mi álbum </div>
            <Card
                number={10}
                name={"Lionel Messi"}
                height={"1.70m"}
                weight={"72kg"}
                position={"DC"}
            />
            <Footer />
        </>
    );
}

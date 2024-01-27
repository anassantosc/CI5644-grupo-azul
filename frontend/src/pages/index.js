import React from "react";

import Link from "next/link";
import Layout from "../layout/Layout";

export default function Home() {
  return (
    <>
      <Layout />
      Home page
      <ul>
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/profile">Perfil</Link>
        </li>
        <li>
          <Link href="/album">Album</Link>
        </li>
        <li>
          <Link href="/store">Comprar</Link>
        </li>
      </ul>
    </>
  );
}

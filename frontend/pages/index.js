import ReactDOM from "react-dom";

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Layout from '../components/Layout'
import Link from 'next/link'


export default function Home() {
  return (
    <>
    <Layout/>
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
        <Link href="/store" >Comprar</Link>
      </li>
    </ul>

    </>
    );
}
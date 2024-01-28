import React from "react";
import Link from "next/link";
import Layout from "../layout/Layout";

import Card from "../layout/Card";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/fontawesome-free-solid'


export default function Home() {
  return (
    <>
      <Layout />

    <Box
      component="form"
      noValidate
      autoComplete="off"
    >

    <TextField
        label="Buscar..."
        styles={{backgroundColor:'white'}}
        sx={{borderRadius : 3}}
        variant = "filled"
        InputProps={{
          endAdornment: (
                <FontAwesomeIcon icon={faHandPointer} />
          ),
          style : {color: 'white'}
        }}
      />

    </Box>
      
      <div> Mi álbum </div>
      <Card/>

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
      <div style={{height: 1000}}></div>
      
    </>
  );
}


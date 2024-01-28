import React from "react";
import Layout from "../layout/Layout";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faRulerVertical,faDumbbell, faFlag } from '@fortawesome/fontawesome-free-solid'

import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'white',
}));
export default function Card() {
  return (
    <Box sx={{ flexGrow: 1,
          width: '230px',
          height : '250px',
          p: 1,
          bgcolor: 'grey.100',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'black',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
        style={{ 
    background: "rgb(110, 25, 66)",
    background: "linear-gradient(360deg, rgb(58, 17, 77) 2%, rgb(54, 54, 54) 12%, rgb(77, 17, 61) 50%, rgb(110, 26, 25) 100%)"
}}>


    <Grid container spacing={0} style={{ textColor : 'white' }}>
      <Grid item xs={4} md={3.5} styles={{border:"black"}} >
        <Item sx={{width:"60px", height : "200px"}}>
        <div>10</div>
        <div>
        <FontAwesomeIcon icon={faFlag} /> 
        </div> 
        <FontAwesomeIcon icon={faFlag} /> <div>DC</div> 
        <FontAwesomeIcon icon={faRulerVertical} /> <div>1.70 m</div> 
        <FontAwesomeIcon icon={faDumbbell} /> <div> 72 kg </div> </Item>
      </Grid>
      <Grid item xs={2} md={2}>
        <Item sx={{width:"150px", height : "200px"}}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Lionel_Messi%2C_Player_of_FC_Barcelona_team.JPG/1200px-Lionel_Messi%2C_Player_of_FC_Barcelona_team.JPG" 
     width="150" 
     height="220"/></Item>
      </Grid>
      <Grid item xs={8} md={8}>
        <Item sx={{width:"210px", height : "30px"}}>Lionel Messi</Item>
      </Grid>
    </Grid>
    </Box>

    
  );
}


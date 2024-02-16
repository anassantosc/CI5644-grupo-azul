import React from "react";
import Layout from "../layout/Layout";
import { Box, Grid, Avatar, Typography, Button } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import WcIcon from '@mui/icons-material/Wc';
import ProgressCircle from "../components/ProgressCircle";
import { useState } from "react";
import EditModal from "../components/EditModal";



export default function Profile() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <Layout>
            <Box style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                margin: '50px', 
                borderRadius: '10px', 
                padding: '20px' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} container justifyContent="center">
                        <Avatar alt="User Avatar" style={{ width: '180px', height: '180px', backgroundColor: 'black' }} />
                    </Grid>
                    <Grid item xs={8} container direction="column" justifyContent="center">
                        <Typography variant="h5" style={{ 
                            fontWeight: 'bold', 
                            color: 'white', 
                            margin:'10px', 
                            padding: '10px' }}>
                                <BadgeIcon style={{ marginRight: '8px' }}/>Simon Puyosa
                        </Typography>
                        <Typography variant="h6" style={{ 
                            fontWeight: 100, 
                            fontStyle: 'italic', 
                            color: 'white', 
                            margin:'10px', 
                            padding: '10px'  }}>SimonElPorteroNorcoreano
                        </Typography>
                        <Typography variant="h6" style={{ 
                            fontWeight: 'light', 
                            color: 'white', 
                            margin:'10px', 
                            padding: '10px'  }}><EmailIcon style={{ marginRight: '8px' }}/>simon12345@cantv.net
                        </Typography>
                        <Typography variant="h6" style={{ 
                            fontWeight: 'light', 
                            color: 'white', 
                            margin:'10px', 
                            padding: '10px'  }}><WcIcon style={{ marginRight: '8px' }}/>Hombre
                        </Typography>
                        <Button variant="contained" size="medium" onClick={handleShow} style={{ 
                            backgroundColor: '#731530', 
                            color: 'white', 
                            alignSelf: 'flex-end' }}>Editar
                        </Button>
                        <EditModal show={show} onClose={handleClose}/>
                    </Grid>
                </Grid>
            </Box>


            <Box style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                margin: '50px', 
                borderRadius: '10px', 
                padding: '20px' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} container justifyContent="center">
                        <Typography variant="h4" justifyContent="center" style={{ 
                            fontWeight: 'bold', 
                            color: 'white', 
                            margin:'10px', 
                            padding: '10px' }}>MI PROGRESO
                        </Typography>
                    </Grid>
                    <Grid item xs={8} container direction="column" justifyContent="center">                        
                        <ProgressCircle value={70}></ProgressCircle>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

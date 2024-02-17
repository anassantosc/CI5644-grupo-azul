import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import WcIcon from '@mui/icons-material/Wc';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from "react";
import EditModal from "../components/EditModal";
import ProgressCircle from "../components/ProgressCircle";
import { useProgress } from "../hooks/UseProgress";
import { useUser } from "../hooks/UseUser";
import Layout from "../layout/Layout";



export default function Profile() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {id, username, password, name, email, gender} = useUser() || {};
    const progress = useProgress(id);
    
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
                                <BadgeIcon style={{ marginRight: '8px' }}/>{name}
                        </Typography>
                        <Typography variant="h6" style={{ 
                            fontWeight: 100, 
                            fontStyle: 'italic', 
                            color: 'white', 
                            margin:'10px', 
                            padding: '10px'  }}>{username}
                        </Typography>
                        <Typography variant="h6" style={{ 
                            fontWeight: 'light', 
                            color: 'white', 
                            margin:'10px', 
                            padding: '10px'  }}><EmailIcon style={{ marginRight: '8px' }}/>{email}
                        </Typography>
                        <Typography variant="h6" style={{ 
                            fontWeight: 'light', 
                            color: 'white', 
                            margin:'10px', 
                            padding: '10px'  }}><WcIcon style={{ marginRight: '8px' }}/>{gender}
                        </Typography>
                        <Button variant="contained" size="medium" onClick={handleShow} style={{ 
                            backgroundColor: '#731530', 
                            color: 'white', 
                            alignSelf: 'flex-end' }}>Editar
                        </Button>
                        <EditModal show={show} onClose={handleClose} id={id}/>
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
                        {progress && <ProgressCircle value={progress.toFixed(2)}/>}
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

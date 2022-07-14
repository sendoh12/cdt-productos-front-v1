import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import BancoAzteca from '../../assets/pictures/banco-azteca-icon.png';
import LogoCDT from '../../assets/pictures/logoCDT.png';
import { Grid, Box, Typography } from '@mui/material';

function Footer() {
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar variant="dense">
        <Grid container style={{ display: 'flex', margin: 'auto' }}>
          <Grid item xs={4} sx={{ textAlign: 'left', alignItems: 'left', marginTop: '2px' }}>
            {/* <img src={BancoAzteca} alt="BancoAzteca" style={{ width: '115px', height: '95px', objectFit: 'contain' }} /> */}
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center', alignItems: 'center', marginTop: '30px' }}>
            <Typography variant="h4">
              <Box sx={{ fontWeight: 'bold' }}>
                {/* <Box component="span" sx={{ color: '#0db02b' }}>
                  C
                </Box>
                <Box component="span" sx={{ color: '#006647' }}>
                  D
                </Box>
                <Box component="span" sx={{ color: '#224e37' }}>
                  T
                </Box> */}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={4} justifyContent="flex-end" sx={{ textAlign: 'right', alignItems: 'right' }}>
            <Typography color={'#006647'} marginRight={10} marginTop={6}>
              v1.0.0
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;

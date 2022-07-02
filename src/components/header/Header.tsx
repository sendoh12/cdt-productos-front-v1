import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';

export interface HederData {
  titleHeder: string;
}

function Header(props: HederData) {
  const { titleHeder } = props;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Grid container justifyContent="center" alignItems="center" marginLeft={6}>
            <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1 }}>
              {titleHeder}
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

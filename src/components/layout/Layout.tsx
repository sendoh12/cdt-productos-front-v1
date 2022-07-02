import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Header from '../header/Header';
import Footer from '../footer/Footer';

interface PropsHeder {
  titleHederLayout: string;
}

function Layout({ children, titleHederLayout }: PropsWithChildren<PropsHeder>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '3' }}>
      <Header titleHeder={titleHederLayout} />
      <Box sx={{ flex: 'auto', margin: 2 }}>{children}</Box>
      <Footer />
    </Box>
  );
}

export default Layout;

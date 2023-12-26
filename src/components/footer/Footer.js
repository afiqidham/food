// components/Footer.js
import React, { useContext } from 'react';
import itemsContext from '../../store/items-context';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Footer = () => {
  const itemsCtx = useContext(itemsContext);

  const switchPageHandler = () => {
    itemsCtx.togglePage();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px', // Adjust the height as needed
        background: '#4bbd27', // Set your preferred background color
      }}
    >
      <Button onClick={switchPageHandler} variant="contained">
         {itemsCtx.switchPage ? 'Admin' : 'User'} 
      </Button>
    </Box>
  );
};

export default Footer;

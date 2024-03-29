import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// ----------------------------------------------------------------------
const images = [
  {
    url: '/static/mock-images/avatars/avatar_20.jpg',
    title: 'General',
    width: '30%',
    value: 1
  },
  {
    url: '/static/mock-images/avatars/avatar_21.jpg',
    title: 'Importaciones y exportaciones',
    width: '30%',
    value: 2
  },
  {
    url: '/static/mock-images/avatars/avatar_22.jpg',
    title: 'Seguros',
    width: '30%',
    value: 3
  },
  {
    url: '/static/mock-images/avatars/avatar_23.jpg',
    title: 'Transacciones',
    width: '30%',
    value: 4
  },
  {
    url: '/static/mock-images/avatars/avatar_24.jpg',
    title: 'Servicio VIP',
    width: '30%',
    value: 5
  }
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15
    },
    '& .MuiImageMarked-root': {
      opacity: 0
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor'
    }
  }
}));
const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%'
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity')
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity')
}));

const servicio = {};

// ----------------------------------------------------------------------
export default function Solicitud() {
  const navigate = useNavigate();

  const onClickAction = (data) => {
    servicio.servicio = data;
    navigate('/cedula');
  };

  return (
    <Container>
      <AppBar position="relative">
        <Toolbar>
          <Typography flexGrow="1" align="center" variant="h6" color="inherit" noWrap>
            Por favor elige el servicio
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111.1%' }}>
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: image.width
            }}
            onClick={() => onClickAction(image.value)}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
    </Container>
  );
}
export { servicio };

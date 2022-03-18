import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Stack, Button, Typography, Container } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';

// ----------------------------------------------------------------------

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
  width: 505,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(5% - 9px)',
  transition: theme.transitions.create('opacity')
}));

const servicio = {};

// ----------------------------------------------------------------------
export default function Pantallas() {
  const navigate = useNavigate();

  return (
    <Container>
      <Stack spacing={20} mt={3}>
        <Typography flexGrow="1" align="center" variant="h6" color="inherit" noWrap>
          Por favor elige el servicio
        </Typography>
        <ImageButton
          focusRipple
          key="Mostrar Turnos"
          width="100%"
          onClick={() => navigate('/turnos')}
        >
          <ImageSrc style={{ backgroundImage: `url(/static/mock-images/avatars/avatar_20.jpg)` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="h1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
              }}
            >
              Mostrar Turnos
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
        <ImageButton
          focusRipple
          key="Solicitar Turnos"
          width="100%"
          onClick={() => navigate('/solicitud')}
        >
          <ImageSrc style={{ backgroundImage: `url(/static/mock-images/avatars/avatar_21.jpg)` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="h1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
              }}
            >
              Solicitar Turnos
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      </Stack>
    </Container>
  );
}
export { servicio };

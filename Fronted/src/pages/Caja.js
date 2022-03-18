/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Stack,
  Typography,
  Box,
  Card,
  Grid,
  Button,
  Modal,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CenterFocusStrong } from '@mui/icons-material';
import Page from '../components/Page';
import { asignarTurno, getCajas, confirmarTurno, saltarTurno } from '../apicore';

const CustomBox = styled('Box')({
  align: 'center',
  textAlign: 'center',
  height: '400px',
  width: '1500px',
  left: '30%',
  right: 0,
  top: '50%',
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%'
});

const CustomButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  height: '150px',
  width: '250px',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const CustomSaltarButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  height: '150px',
  width: '250px',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));
function Caja() {
  const [caja, setCaja] = useState(1);
  const [cajas, setCajas] = useState([]);
  const [turnoInfo, setTurnoInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const modalHandler = () => {
    // setMensaje('HOLA');
    setOpenModal(true);
  };
  const closeModal = () => setOpenModal(false);
  let timer;
  const [mensaje, setMensaje] = useState('');

  const ButtonHandler = () => {
    modalHandler();
    timer = setTimeout(closeModal, 1000);
  };

  const ModalStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };

  const handleChange = async (event, newCaja) => {
    if (newCaja !== null) {
      setCaja(newCaja);
    }

    const response = await asignarTurno(caja);
    if (response[0].turno_codigo !== turnoInfo.turno_codigo) setTurnoInfo(response[0]);
  };

  useEffect(() => {
    const obtenerPrimerTurno = async () => {
      const response = await asignarTurno(caja);
      console.log(response[0]);
      if (response[0].turno_codigo !== turnoInfo.turno_codigo) {
        setTurnoInfo(response[0]);
        localStorage.setItem('nuevoTurno', response[0].consecutivo);
      }
      // localStorage.setItem('nuevoTurno', response[0].consecutivo);
    };
    const obtenerCajas = async () => {
      const response = await getCajas();
      setCajas(response);
    };
    obtenerCajas();
    obtenerPrimerTurno();
  }, [turnoInfo, caja]);

  const children = cajas.map((caja) => (
    <ToggleButton value={caja.caja_codigo} key={caja.caja_nombre}>
      {`caja ${caja.caja_codigo}`}
    </ToggleButton>
  ));

  const control = {
    color: 'primary',
    value: caja,
    onChange: handleChange,
    exclusive: true
  };

  const confirmTurno = async () => {
    setMensaje('Turno Confirmado!');
    modalHandler();
    timer = setTimeout(closeModal, 1000);
    const response = await confirmarTurno({ turno_codigo: turnoInfo.turno_codigo });
    const response2 = await asignarTurno(caja);
    setTurnoInfo(response2[0]);
    localStorage.setItem('nuevoTurno', response2[0].consecutivo);
    console.log(response);
  };

  const skipTurno = async () => {
    setMensaje('Turno Saltado!');
    modalHandler();
    timer = setTimeout(closeModal, 1000);
    const response = await saltarTurno({ turno_codigo: turnoInfo.turno_codigo });
    const response2 = await asignarTurno(caja);
    setTurnoInfo(response2[0]);
    localStorage.setItem('nuevoTurno', response2[0].consecutivo);
    console.log(response);
  };
  return (
    <Page title="Caja | Minimal-UI">
      <Container align="center" maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Caja</Typography>
        </Box>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">{`Turno ${turnoInfo.consecutivo}`}</Typography>
          <br />
          <Typography variant="h4">{`Documento ${turnoInfo.persona_documento}`}</Typography>
        </Box>
        <Modal
          open={openModal}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <Typography align="center" id="modal-modal-title" variant="h5" component="h2">
              <br />
              <br />
              {mensaje}
            </Typography>
          </Box>
        </Modal>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // TODO Replace with Stack
            '& > :not(style) + :not(style)': { mt: 2 }
          }}
        >
          <ToggleButtonGroup {...control}>{children}</ToggleButtonGroup>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={8} sm={6}>
            <CustomButton sx={{ top: '50%' }} size="large" onClick={() => confirmTurno()}>
              Confirmar Turno
            </CustomButton>
          </Grid>
          <Grid item xs={8} sm={6}>
            <CustomSaltarButton sx={{ top: '50%' }} size="large" onClick={() => skipTurno()}>
              Saltar Turno
            </CustomSaltarButton>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Caja;

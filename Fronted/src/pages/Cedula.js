import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import BackspaceIcon from '@mui/icons-material/Backspace';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';
import { servicio } from './Solicitud';
import { addPersona, getPersona, addTurno } from '../apicore';

// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const turno = {};
// ----------------------------------------------------------------------

export default function Cedula() {
  const [texto, setTexto] = React.useState('');
  const [user, setUser] = React.useState('');

  const navigate = useNavigate();

  function LlenarCedula(numero) {
    setTexto(texto.concat(numero));
  }

  function Borrar() {
    setTexto(texto.slice(0, -1));
  }

  function CampoLLeno() {
    if (texto.length > 0) {
      return false;
    }
    return true;
  }

  const createTurn = async () => {
    const responseAddUser = await addPersona({
      persona_nombre: texto,
      persona_documento: texto
    });

    const responseGetUser = await getPersona(texto);

    const responseAddTurn = await addTurno({
      servicio_codigo: servicio.servicio,
      persona_codigo: responseGetUser.persona_codigo
    });

    turno.turno = responseAddTurn;

    navigate('/confirmado');
  };

  return (
    <RootStyle title="404 Page Not Found | Minimal-UI">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Digite su cedula
              </Typography>
            </motion.div>
            <TextField
              id="Cedula"
              label="Cedula"
              inputProps={{ inputMode: 'numeric' }}
              value={texto}
            />
            <Box sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}>
              <Grid>
                <Button size="large" variant="outlined" onClick={() => LlenarCedula('1')}>
                  1
                </Button>
                <Button size="large" variant="outlined" onClick={() => LlenarCedula('2')}>
                  2
                </Button>
                <Button size="large" variant="outlined" onClick={() => LlenarCedula('3')}>
                  3
                </Button>
              </Grid>
              <Grid>
                <Button size="large" variant="outlined" onClick={() => LlenarCedula('4')}>
                  4
                </Button>
                <Button size="large" variant="outlined" onClick={() => LlenarCedula('5')}>
                  5
                </Button>
                <Button size="large" variant="outlined" onClick={() => LlenarCedula('6')}>
                  6
                </Button>
              </Grid>
              <Grid>
                <Button size="large" variant="outlined" onClick={() => LlenarCedula('7')}>
                  7
                </Button>
                <Button size="large" variant="outlined" onClick={() => LlenarCedula('8')}>
                  8
                </Button>
                <Button size="large" variant="outlined" onClick={() => LlenarCedula('9')}>
                  9
                </Button>
              </Grid>
              <Grid>
                <Button
                  size="large"
                  variant="outlined"
                  width="50"
                  onClick={() => LlenarCedula('0')}
                >
                  0
                </Button>
                <div />
                <Button
                  size="large"
                  variant="outlined"
                  endIcon={<BackspaceIcon />}
                  onClick={() => Borrar()}
                >
                  Borrar
                </Button>
              </Grid>
            </Box>
            <Stack direction="row" spacing={40}>
              <Button to="/solicitud" size="large" variant="contained" component={RouterLink}>
                Atras
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={() => createTurn()}
                disabled={CampoLLeno()}
              >
                Siguiente
              </Button>
            </Stack>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
export { turno };

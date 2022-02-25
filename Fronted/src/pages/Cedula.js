import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
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

// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Cedula() {
  const [completado, setCompletado] = React.useState(true);

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
              checked={completado}
              onChange={() => setCompletado(!completado)}
            />
            <Box sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}>
              <Grid>
                <Button size="large" variant="outlined" value="1">
                  1
                </Button>
                <Button size="large" variant="outlined">
                  2
                </Button>
                <Button size="large" variant="outlined">
                  3
                </Button>
              </Grid>
              <Grid>
                <Button size="large" variant="outlined">
                  4
                </Button>
                <Button size="large" variant="outlined">
                  5
                </Button>
                <Button size="large" variant="outlined">
                  6
                </Button>
              </Grid>
              <Grid>
                <Button size="large" variant="outlined">
                  7
                </Button>
                <Button size="large" variant="outlined">
                  8
                </Button>
                <Button size="large" variant="outlined">
                  9
                </Button>
              </Grid>
              <Grid>
                <Button size="large" variant="outlined" Width="50">
                  0
                </Button>
                <div />
                <Button size="large" variant="outlined" endIcon={<BackspaceIcon />}>
                  Borrar
                </Button>
              </Grid>
            </Box>
            <Stack direction="row" spacing={40}>
              <Button to="/solicitud" size="large" variant="contained" component={RouterLink}>
                Atras
              </Button>
              <Button
                to="/confirmado"
                size="large"
                variant="contained"
                component={RouterLink}
                disabled={completado}
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

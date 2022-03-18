import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
// material
import { styled } from '@mui/material/styles';
import {
  Card,
  Stack,
  Link,
  Container,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  InputAdornment
} from '@mui/material';
// layouts
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { login } from '../apicore';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------
const usuario = {};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameA, setUsernameA] = React.useState('');
  const [passwordA, setPasswordA] = React.useState('');

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onChangeUsername = (event) => {
    setUsernameA(event.target.value);
  };

  const onChangePassword = (event) => {
    setPasswordA(event.target.value);
  };

  const userLog = async () => {
    let user = {};
    const response = await login({
      username: usernameA,
      password: passwordA
    });
    if (response !== undefined) user = response;

    //  usuario.usuario = user;

    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.ser.username);
    localStorage.setItem('name', `${user.ser.first_name} ${user.ser.last_name}`);
    localStorage.setItem('email', user.ser.email);
    localStorage.setItem('sede_nombre', 'user.ser.sede_nombre');
    localStorage.setItem('nuevoTurno', '');

    if (Object.keys(user).length === 3) {
      if (user.ser.is_staff === true && user.ser.is_superuser === true) {
        navigate('/dashboard');
      } else if (user.ser.is_staff === true) {
        navigate('/caja');
      } else {
        navigate('/pantallas');
      }
    } else {
      navigate('');
    }
  };

  return (
    <RootStyle title="Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Bienvenido de vuelta
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              BTM
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Ingresa tus datos.</Typography>
          </Stack>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="username"
              label="Nombre de usuario"
              onChange={onChangeUsername}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={onChangePassword}
            />
          </Stack>
          <Box
            component="img"
            src="/static/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => userLog()}
          >
            Login
          </Button>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
export { usuario };

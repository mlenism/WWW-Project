import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';
import { getUsuarios, getUsuario, addUsuario } from '../apicore';

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

export default function Login() {
  const agregarUsuario = async () => {
    const data = {
      username: 'user_name31',
      first_name: 'first_name31',
      last_name: 'last_name31',
      email: 'email31@hotmail.com',
      sede_nombre: 'sede2',
      password: 'contrasenia'
    };

    const response2 = await addUsuario(data);

    console.log(response2);
  };
  useEffect(() => {
    const response = getUsuarios();
    console.log(response);
    const response1 = getUsuario('1');
    console.log(response1);
    const data = {
      username: 'user_name31',
      first_name: 'first_name31',
      last_name: 'last_name31',
      email: 'email31@hotmail.com',
      sede_nombre: 'sede2',
      password: 'contrasenia'
    };

    agregarUsuario();
  }, []);

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Get started
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          <AuthSocial />

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

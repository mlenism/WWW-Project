import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Typography, Box, Card, Grid, Button, Modal } from '@mui/material';
import ReactHowler from 'react-howler';

import { styled } from '@mui/material/styles';

import DropZone from '../components/DropZone';
// components
import Page from '../components/Page';

// material

// utils

//

// ----------------------------------------------------------------------
const ImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const ModalStyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export default function Publicidad() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const modalHandler = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <ReactHowler src="http://127.0.0.1:8000/static/GN-001.mp3" />
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <Typography align="center" id="modal-modal-title" variant="h5" component="h2">
            Cargar Archivo
          </Typography>
          <DropZone />
        </Box>
      </Modal>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Publicidad
        </Typography>

        <Grid align="center" container spacing={6}>
          <Grid key="cargarPublicidad" item xs={12} sm={6} md={3}>
            <Card>
              <Box sx={{ pt: '100%', position: 'relative' }}>
                <ImgStyle
                  onClick={() => modalHandler()}
                  alt="product_1"
                  src="/static/illustrations/upload_icon.png"
                />
              </Box>

              <Stack spacing={2} sx={{ p: 3 }}>
                <Button onClick={() => modalHandler()}>
                  <Typography align="center" variant="subtitle2" noWrap>
                    Cargar publicidad
                  </Typography>
                </Button>
              </Stack>
            </Card>
          </Grid>
          <Grid key="cargarPublicidad" item xs={12} sm={6} md={3}>
            <Card>
              <Box sx={{ pt: '100%', position: 'relative' }}>
                <ImgStyle
                  onClick={() => modalHandler()}
                  alt="product_1"
                  src="/static/illustrations/programacion.png"
                />
              </Box>

              <Stack spacing={2} sx={{ p: 3 }}>
                <Button onClick={() => modalHandler()}>
                  <Typography align="center" variant="subtitle2" noWrap>
                    Crear programaciones
                  </Typography>
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

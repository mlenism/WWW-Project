/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
  Modal,
  Box
} from '@mui/material';
import ReactHowler from 'react-howler';

import { getTurnos } from '../apicore';

// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';

import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';

//

const TABLE_HEAD = [
  { id: 'codigoTurno', label: 'Codigo Turno', alignRight: false },
  { id: 'servicio', label: 'Servicio', alignRight: false }
];

// let USERLIST = [
//   {
//     codigoTurno: 't21',
//     servicio: 'servicio1'
//   },
//   {
//     codigoTurno: 't22',
//     servicio: 'servicio2'
//   },
//   {
//     codigoTurno: 't23',
//     servicio: 'servicio3'
//   },
//   {
//     codigoTurno: 't24',
//     servicio: 'servicio4'
//   },
//   {
//     codigoTurno: 't25',
//     servicio: 'servicio3'
//   },
//   {
//     codigoTurno: 't26',
//     servicio: 'servicio3'
//   },
//   {
//     codigoTurno: 't27',
//     servicio: 'servicio3'
//   }
// ];

function Turnos() {
  const [USERLIST, setUSERLIST] = useState([{ turno_codigo: 0 }]);
  const [nuevoTurno, setNuevoTurno] = useState('0');
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const modalHandler = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const [audioTurno, setAudioTurno] = useState(
    <ReactHowler src="http://127.0.0.1:8000/static/DO-012.mp3" />
  );

  let timer;

  const ButtonHandler = () => {
    setNuevoTurno({
      codigoTurno: 't28',
      servicio: 'servicio3'
    });
    USERLIST.unshift(nuevoTurno);
    const aux = USERLIST.slice(0, 10);
    setUSERLIST(aux);
    modalHandler();
    console.log(aux);
    timer = setTimeout(closeModal, 1000);
  };

  useEffect(() => {
    clearTimeout(timer);
    const obtenerTurnos = async () => {
      const res = await getTurnos();

      if (res[0].turno_codigo !== USERLIST[0].turno_codigo) {
        setUSERLIST(res);
        console.log(res);
      }
    };

    const getNuevoTurno = async () => {
      const aux1 = localStorage.getItem('nuevoTurno');
      if (nuevoTurno !== aux1) {
        setNuevoTurno(aux1);
        //  setAudioTurno(<ReactHowler src={`http://127.0.0.1:8000/static/${aux1}.mp3`} />);
        USERLIST.unshift(nuevoTurno);
        const aux = USERLIST.slice(0, 10);
        setUSERLIST(aux);
        modalHandler();
        console.log(aux);

        timer = setTimeout(closeModal, 1000);
      }
    };
    obtenerTurnos();
    // getNuevoTurno();
    const interval = setInterval(() => getNuevoTurno(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [USERLIST]);

  const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }));
  const SectionStyleNewTurn = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '30px',
    height: '30px'
  }));

  const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
  }));

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

  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  }));

  return (
    <RootStyle>
      <Card width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Manage the job more effectively with Minimal
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </Card>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Turnos
          </Typography>
        </Stack>
        <Modal
          open={openModal}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <Typography align="center" id="modal-modal-title" variant="h5" component="h2">
              Siguiente Turno
            </Typography>
            <Typography align="center" id="modal-modal-title" variant="h2" sx={{ mt: 2 }}>
              {nuevoTurno}
            </Typography>
          </Box>
        </Modal>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 100 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Codigo Turno</TableCell>
                    <TableCell align="center">Servicio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {USERLIST.slice(0, 10).map((row) => {
                    const { consecutivo, servicio_nombre } = row;

                    return (
                      <TableRow hover key={consecutivo} tabIndex={-1}>
                        <TableCell align="center">
                          <Typography variant="subtitle2" noWrap>
                            {consecutivo}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{servicio_nombre}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
        <Button
          onClick={() => {
            ButtonHandler();
          }}
        >
          NuevoTurno
        </Button>
      </Container>
    </RootStyle>
  );
}

export default Turnos;

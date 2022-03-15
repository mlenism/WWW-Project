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
  TableHead
} from '@mui/material';
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

const USERLIST = [
  {
    codigoTurno: 't21',
    servicio: 'servicio1'
  },
  {
    codigoTurno: 't22',
    servicio: 'servicio2'
  },
  {
    codigoTurno: 't23',
    servicio: 'servicio3'
  },
  {
    codigoTurno: 't24',
    servicio: 'servicio4'
  },
  {
    codigoTurno: 't25',
    servicio: 'servicio3'
  },
  {
    codigoTurno: 't26',
    servicio: 'servicio3'
  },
  {
    codigoTurno: 't27',
    servicio: 'servicio3'
  }
];

function Turnos() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const [nextTurn, setNextTurn] = useState(<>Hi</>);
  let timer;

  const ButtonHandler = () => {
    console.log('prueba');
    const nuevoTurno = {
      codigoTurno: 't28',
      servicio: 'servicio3'
    };
    USERLIST.push(nuevoTurno);
    console.log(USERLIST);
    setNextTurn(
      <SectionStyleNewTurn>
        <Card>{nuevoTurno.codigoTurno}</Card>
      </SectionStyleNewTurn>
    );
    timer = setTimeout(() => setNextTurn(<>Hi</>), 3000);
    console.log('Hola');
  };

  useEffect(() => {
    clearTimeout(timer);
  }, [nextTurn]);

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
      {nextTurn}
      <Card width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Manage the job more effectively with Minimal
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </Card>

      <Container maxWidth="sm">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Turnos
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Codigo Turno</TableCell>
                    <TableCell align="center">Servicio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {USERLIST.slice(0, 10).map((row) => {
                    const { codigoTurno, servicio } = row;

                    return (
                      <TableRow hover key={codigoTurno} tabIndex={-1}>
                        <TableCell align="center">
                          <Typography variant="subtitle2" noWrap>
                            {codigoTurno}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{servicio}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
      <Button
        onClick={() => {
          ButtonHandler();
        }}
      >
        NuevoTurno
      </Button>
    </RootStyle>
  );
}

export default Turnos;

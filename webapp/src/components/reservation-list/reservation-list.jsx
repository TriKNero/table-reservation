import React, { useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';
import { RequestsHelper } from '../../api/requests-helper';
import dayjs from 'dayjs';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  tableContainer: {
    overflowY: 'scroll',
    maxHeight: '50vh !important',
    height: '50vh !important',
  },
  link: {
    cursor: 'pointer',
  },
}));

const ReservationList = ({ closeList, authInfo, logout }) => {
  const classes = useStyles();
  const [reservationInfo, setReservationInfo] = useState([]);
  useEffect(() => {
    RequestsHelper.getReservedTable(authInfo?.login).then((data) => setReservationInfo(data));
  }, []);

  const renderNavigation = () => {
    return (
      <Typography variant="body2">
        <Link className={classes.link} onClick={closeList}>
          Reserve table
        </Link>
        {` | `}
        <Link className={classes.link} onClick={logout}>
          Logout
        </Link>
      </Typography>
    );
  };

  return (
    <Container>
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guests:</TableCell>
              <TableCell align="right">Date:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservationInfo.map(({ reservationDate, guests }, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {guests.join(', ')}
                </TableCell>
                <TableCell>{dayjs.utc(reservationDate).local().format('DD/MM/YYYY hh:mm A')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {renderNavigation()}
    </Container>
  );
};

export { ReservationList };

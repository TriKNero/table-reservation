import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { RequestsHelper } from '../../api/requests-helper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ReservationList } from '../reservation-list/reservation-list.jsx';
import Link from '@mui/material/Link';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles(() => ({
  clockContainer: {
    display: 'flex',
    width: '100%',
  },
  button: {
    height: '50px',
    cursor: 'pointer',
  },
  switchContainer: {
    display: 'flex',
    padding: '10px',
  },
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '25px',
  },
  link: {
    cursor: 'pointer',
  },
}));

const ReservationForm = ({ logout, authInfo }) => {
  const classes = useStyles();
  const [dateTime, setDateTime] = useState(null);
  const [snackBarInfo, setSnackBarInfo] = useState(null);
  const [twoSeatsOption, setTwoSeatsOption] = useState(false);
  const [reservedIntervals, setReservedIntervals] = useState([]);
  const [showReservations, setShowReservations] = useState(false);

  useEffect(() => {
    RequestsHelper.getBookedTimeIntervals(twoSeatsOption).then((bookedTables) =>
      setReservedIntervals(RequestsHelper.formatIntervals(bookedTables)),
    );
  }, [twoSeatsOption]);

  const onSnackBarMessageClose = () => {
    setSnackBarInfo(null);
  };

  const handleReserve = async () => {
    try {
      const { login } = authInfo;
      const guests = twoSeatsOption ? [login, login] : [login];
      const response = await RequestsHelper.reserveTable({
        reservationDate: dayjs(dateTime).utc(),
        guests,
        twoSeatsOption,
      });
      const { message, bookedTables, isError } = response;
      setReservedIntervals(RequestsHelper.formatIntervals(bookedTables));
      setSnackBarInfo({ isError: isError, message });
    } catch (error) {
      console.error('Error: ', error);
      setSnackBarInfo({ isError: true, message: error.message });
    }
  };

  const disableTime = (targetDateTime) => {
    const targetLocalTime = targetDateTime.local();
    for (let interval of reservedIntervals) {
      const localStartTime = dayjs(interval.startDateTime).local().subtract(2, 'hour');
      const localEndTime = dayjs(interval.endDateTime).local();

      if (targetLocalTime.isBetween(localStartTime, localEndTime)) return true;
    }
    if (isBetweenMidnightAnd9AM(targetLocalTime)) return true;
    if (isTimeInPast(targetLocalTime)) return true;

    return false;
  };

  const isTimeInPast = (selectedTime) => {
    const currentTime = dayjs();
    const selectedDateTime = dayjs(selectedTime, 'HH:mm');

    return selectedDateTime.isBefore(currentTime);
  };

  const isBetweenMidnightAnd9AM = (targetTime) => {
    const midnight = targetTime.startOf('day');
    const nineAM = targetTime.startOf('day').add(9, 'hours');

    return targetTime.isBetween(midnight, nineAM, null, '[)');
  };

  const renderClock = () => {
    return (
      <div>
        <div>Available slots:</div>
        <DigitalClock
          onChange={setDateTime}
          value={dayjs(dateTime)}
          skipDisabled
          shouldDisableTime={disableTime}
          timeStep={60}
        />
      </div>
    );
  };

  const renderCalendar = () => {
    return <DateCalendar onChange={setDateTime} disablePast autoFocus />;
  };

  const renderNavigation = () => {
    return (
      <Typography variant="body2">
        <Link className={classes.link} onClick={() => setShowReservations(true)}>
          Your Reservations
        </Link>
        {` | `}
        <Link className={classes.link} onClick={logout}>
          Logout
        </Link>
      </Typography>
    );
  };

  const renderSnackBar = () => {
    return (
      <Snackbar open={Boolean(snackBarInfo)} autoHideDuration={6000} onClose={onSnackBarMessageClose}>
        <Alert severity={snackBarInfo?.isError ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackBarInfo?.message}
        </Alert>
      </Snackbar>
    );
  };

  if (!showReservations)
    return (
      <div className={classes.mainContainer}>
        <Typography variant="h5">Table reservation:</Typography>
        <div className={classes.clockContainer}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {renderCalendar()}
            {renderClock()}
          </LocalizationProvider>
        </div>
        <div className={classes.switchContainer}>
          <Typography variant="body1">Reserve whole table:</Typography>
          <Switch value={twoSeatsOption} onChange={(event, checked) => setTwoSeatsOption(checked)} size="small" />
        </div>
        <Button
          variant="contained"
          onClick={handleReserve}
          disabled={!dateTime || disableTime(dayjs(dateTime))}
          fullWidth
          className={classes.button}
        >
          Reserve {twoSeatsOption ? 'table' : 'seat'}
        </Button>

        {renderNavigation()}
        {renderSnackBar()}
      </div>
    );
  else return <ReservationList closeList={() => setShowReservations(false)} authInfo={authInfo} logout={logout} />;
};

export { ReservationForm };

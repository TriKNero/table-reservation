import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
const host = 'http://localhost:3001';
const RequestsHelper = {
  getBookedTimeIntervals: async (twoSeatsOption) => {
    try {
      const result = await fetch(`${host}/api/get-booked-tables`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ twoSeatsOption }),
      });
      return await result.json();
    } catch (e) {
      console.log('Error: failed to fetch api/get-booked-tables', e);
    }
  },

  reserveTable: async (reservationInfo) => {
    const result = await fetch(`${host}/api/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationInfo),
    });
    return await result.json();
  },

  getReservedTable: async (login) => {
    try {
      const result = await fetch(`${host}/api/get-user-reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login }),
      });
      return await result.json();
    } catch (e) {
      console.log('Error: failed to fetch api/get-user-reservations', e);
    }
  },

  formatIntervals: (bookedTables) => {
    if (!Array.isArray(bookedTables)) return [];
    const res = bookedTables.map(({ reservationDate }) => {
      const localInterval = dayjs.utc(reservationDate).local();
      const startDateTime = localInterval.format();
      const endDateTime = localInterval.add(3, 'hour').format();
      return { startDateTime, endDateTime };
    });
    return res;
  },
};

export { RequestsHelper };

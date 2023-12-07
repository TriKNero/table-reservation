const errors = {
  tableReserved: 'This table already reserved, please pick another one.',
  seatsRanOut: 'This table or some of the seats already reserved, please pick another date and time.',
};
const messages = {
  tableReserved: 'Table successfully reserved',
  seatReserved: 'Seat successfully reserved',
};

const maxSitsPerTable = 2;

module.exports = { errors, messages, maxSitsPerTable };

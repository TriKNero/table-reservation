const mongoose = require('mongoose');
const { errors, messages, maxSitsPerTable } = require('./constants');
const TableReservation = mongoose.model('TableReservation');

const isShouldBeReserved = (guests) => guests?.length === maxSitsPerTable;

async function ReserveTable({ reservationDate, guests }) {
  const session = await TableReservation.startSession();
  session.startTransaction();
  try {
    const reservation = await TableReservation.findOne({ reservationDate }).session(session);
    if (!reservation) {
      await TableReservation.create(
        [
          {
            reservationDate,
            reserved: isShouldBeReserved(guests),
            guests,
          },
        ],
        { session },
      );
      await session.commitTransaction();
      const message = isShouldBeReserved(guests) ? messages['tableReserved'] : messages['seatReserved'];
      return { message, isError: false };
    }
    const { reserved: isAlreadyReserved, guests: currentGuests = [], id: reservationId } = reservation || {};

    const updatedGuests = [...currentGuests, ...guests];

    if (isAlreadyReserved) throw new Error(errors['tableReserved']);
    if (isShouldBeReserved(updatedGuests)) {
      await TableReservation.findByIdAndUpdate(
        reservationId,
        { $set: { reserved: true, guests: updatedGuests } },
        { new: true, session },
      );
      await session.commitTransaction();
      return { message: messages['tableReserved'], isError: false };
    } else throw new Error(errors['seatsRanOut']);
  } catch (error) {
    console.log('Error: ', error.message);
    await session.abortTransaction();
    return { message: error.message, isError: true };
  } finally {
    await session.endSession();
  }
}

const GetBookedTables = async (twoSeatsOption) => {
  try {
    const currentDateUTC = new Date().toUTCString();
    const filterByReservations = twoSeatsOption ? {} : { reserved: true };

    return await TableReservation.find({ ...filterByReservations, reservationDate: { $gte: currentDateUTC } }).select(
      'reservationDate',
    );
  } catch (error) {
    console.error('Error finding future reservations:', error);
  }
};

const GetUserReservations = async (login) => {
  try {
    const currentDateUTC = new Date().toUTCString();
    const filterByGuestName = { guests: { $all: [login] } };

    return await TableReservation.find({ ...filterByGuestName, reservationDate: { $gte: currentDateUTC } });
  } catch (error) {
    console.error('Error finding future reservations:', error);
  }
};

module.exports = { ReserveTable, GetBookedTables, GetUserReservations };

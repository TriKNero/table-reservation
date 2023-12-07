const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const { connectToDatabase } = require('./db/db');
const { ReserveTable, GetBookedTables, GetUserReservations } = require('./api-methods');

const app = new Koa();
const router = new Router();

connectToDatabase().then(() => {
  (function startServer() {
    app.use(
      cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'OPTIONS'],
        credentials: false,
        allowHeaders: ['Content-Type'],
      }),
    );

    router.post('/api/reserve', async (ctx) => {
      //todo we can add schema here

      const { reservationDate, guests, twoSeatsOption } = ctx.request.body;
      const { message, isError } = await ReserveTable({ reservationDate, guests });
      const bookedTables = await GetBookedTables(twoSeatsOption);
      ctx.status = 200;
      ctx.body = { message, bookedTables, isError };
    });

    router.post('/api/get-booked-tables', async (ctx) => {
      //todo we can add schema here

      const { twoSeatsOption } = ctx.request.body;
      const bookedTables = await GetBookedTables(twoSeatsOption);
      ctx.status = 200;
      ctx.body = bookedTables;
    });

    router.post('/api/get-user-reservations', async (ctx) => {
      //todo we can add schema here

      const { login } = ctx.request.body;
      const bookedTables = await GetUserReservations(login);
      ctx.status = 200;
      ctx.body = bookedTables;
    });

    app.use(koaBody());
    app.use(router.routes());
    app.use(router.allowedMethods());
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })();
});

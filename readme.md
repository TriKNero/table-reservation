## Table reservation app

### Mongo + Docker:
1. Open docker
2. Go to the `koa-server/db` folder
3. Run `chmod +x mongo-rs.sh`
4. Run `./mongo-rs.sh` (to install mongo and setup replica set)
5. Connection url: `mongodb://root:example@127.0.0.1:27017/Reservation?replicaSet=rs0&authSource=admin`

### KOA Server:
1. Go to the `koa-server` folder
2. Install dependencies via `yarn`
3. To run app use `yarn start` 
4. See the app on `localhost:3001`

### Webpack + React
1. Go to the `webapp` folder
2. Install dependencies via `yarn`
3. To run app use `yarn start`


### How it works:
1. Go to the `localhost:3000`
2. Fill login form with any login and password
3. Pick any available date and time, you can reserve 1 seat or the whole table 
4. After the reservation you can see a message with reservation status
5. Via bottom links you can make a logout or see list of exists reservations

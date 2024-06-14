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
4. After the reservation you can see a message with the reservation status
5. Via bottom links you can make a logout or see list of existing reservations

### Requirements:

Implement a booking mechanism for a single table in a restaurant that accommodates two people. The first user creates an event for a specific time and date. The time step in the calendar is one hour, meaning there are 24 slots in a day. The duration of the table booking is 3 hours. For the table to be considered booked, it must be occupied by two people.

Example: The first user comes, and books the table for tomorrow at 12 PM. Then the second user comes, sees that there is a half-filled slot for tomorrow at 12 PM. The second user confirms the booking, after which the table for that time is considered closed.

The first user can open another slot, but then the first available time for them will be 3 PM because 12 PM is already taken, and the booking duration is 3 hours.

Notes: User registration is not necessary, users can be hardcoded. Time zones should be considered as users may be from different time zones.

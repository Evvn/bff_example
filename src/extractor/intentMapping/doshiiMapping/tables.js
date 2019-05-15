import doshiiConnector from '@mryum/doshii-sdk';

const doshii = doshiiConnector({
    clientId: process.env.DOSHII_CLIENT_ID,
    clientSecret: process.env.DOSHII_CLIENT_SECRET,
    env: 'sandbox',
    version: 'v3',
    silent: false
  });

const tables = {
    [intents.RETRIEVE_ALL_TABLES]: params => doshii.Tables.retrieveAll(params),
    [intents.RETRIEVE_TABLE]: params => doshii.Tables.retrieveOne(params),
    [intents.RETRIEVE_TABLE_BOOKINGS]: params => doshii.Tables.retrieveBookings(params),
    [intents.RETRIEVE_TABLE_CHECKINS]: params => doshii.Tables.retrieveCheckins(params),
    [intents.RETRIEVE_TABLE_ORDERS]: params => doshii.Tables.retrieveOrders(params),
  };

  export default tables;
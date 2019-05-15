import doshiiConnector from '@mryum/doshii-sdk';
import * as intents from '../../../ordering/intents/doshiiIntents.js';

const doshii = doshiiConnector({
    clientId: process.env.DOSHII_CLIENT_ID,
    clientSecret: process.env.DOSHII_CLIENT_SECRET,
    env: 'sandbox',
    version: 'v3',
    silent: false
  });

const reservations = {
    [intents.RETRIEVE_ALL_RESERVATIONS]: params => doshii.Reservations.retrieveAll(params),
    [intents.RETRIEVE_RESERVATION]: params => doshii.Reservations.retrieveOne(params),
    [intents.CREATE_RESERVATION]: params => doshii.Reservations.create(params),
    [intents.UPDATE_RESERVATION]: params => doshii.Reservations.update(params),
    [intents.REMOVE_RESERVATION]: params => doshii.Reservations.remove(params),
    [intents.CREATE_RESERVATION_CHECKIN]: params => doshii.Reservations.createCheckin(params),
  };

export default reservations;
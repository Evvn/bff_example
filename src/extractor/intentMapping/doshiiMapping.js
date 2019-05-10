import doshiiConnector from 'doshii-sdk';

import * as intents from '../../ordering/intents/doshiiIntents';

// Doshii Connection Params
const doshii = doshiiConnector({
  clientId: process.env.DOSHII_CLIENT_ID,
  clientSecret: process.env.DOSHII_CLIENT_SECRET,
  env: 'sandbox',
  version: 'v3',
  silent: false
});

// Intent to Doshii Call Maps
const checkins = {
  [intents.RETRIEVE_CHECKIN]: params => doshii.Checkins.retrieveOne(params),
};

const locations = {
  [intents.RETRIEVE_ALL_LOCATIONS]: params => doshii.Locations.retrieveAll(params),
  [intents.RETRIEVE_LOCATION_MENU]: params => doshii.Locations.retrieveMenu(params),
};

const members = {
  [intents.RETRIEVE_ALL_MEMBERS]: params => doshii.Members.retrieveAll(params),
  [intents.RETRIEVE_MEMBER]: params => doshii.Members.retrieveOne(params),
  [intents.CREATE_MEMBER]: params => doshii.Members.create(params),
  [intents.UPDATE_MEMBER]: params => doshii.Members.update(params),
  [intents.REMOVE_MEMBER]: params => doshii.Members.remove(params),
};

const orders = {
  [intents.RETRIEVE_ALL_ORDERS]: params => doshii.Orders.retrieveAll(params),
  [intents.RETRIEVE_ORDER]: params => doshii.Orders.retrieveOne(params),
  [intents.CREATE_ORDER]: params => doshii.Orders.create(params),
  [intents.UPDATE_ORDER]: params => doshii.Orders.update(params),
  [intents.RETRIEVE_ORDER_TRANSACTIONS]: params => doshii.Orders.retrieveTransactions(params),
  [intents.CREATE_ORDER_TRANSACTION]: params => doshii.Orders.createTransaction(params),
};

const reservations = {
  [intents.RETRIEVE_ALL_RESERVATIONS]: params => doshii.Reservations.retrieveAll(params),
  [intents.RETRIEVE_RESERVATION]: params => doshii.Reservations.retrieveOne(params),
  [intents.CREATE_RESERVATION]: params => doshii.Reservations.create(params),
  [intents.UPDATE_RESERVATION]: params => doshii.Reservations.update(params),
  [intents.REMOVE_RESERVATION]: params => doshii.Reservations.remove(params),
  [intents.CREATE_RESERVATION_CHECKIN]: params => doshii.Reservations.createCheckin(params),
};

const rewards = {
  [intents.RETRIEVE_ALL_REWARDS]: params => doshii.Rewards.retrieveAll(params),
  [intents.RETRIEVE_REWARD]: params => doshii.Rewards.retrieveOne(params),
  [intents.CREATE_REWARD]: params => doshii.Rewards.create(params),
  [intents.UPDATE_ALL_REWARDS]: params => doshii.Rewards.updateAll(params),
  [intents.UPDATE_REWARD]: params => doshii.Rewards.update(params),
  [intents.REMOVE_REWARD]: params => doshii.Rewards.remove(params),
  [intents.ACCEPT_REWARD]: params => doshii.Rewards.accept(params),
  [intents.REJECT_REWARD]: params => doshii.Rewards.reject(params),
  [intents.ACCEPT_REWARD_POINTS]: params => doshii.Rewards.acceptPoints(params),
  [intents.REJECT_REWARD_POINTS]: params => doshii.Rewards.rejectPoints(params),
};

const tables = {
  [intents.RETRIEVE_ALL_TABLES]: params => doshii.Tables.retrieveAll(params),
  [intents.RETRIEVE_TABLE]: params => doshii.Tables.retrieveOne(params),
  [intents.RETRIEVE_TABLE_BOOKINGS]: params => doshii.Tables.retrieveBookings(params),
  [intents.RETRIEVE_TABLE_CHECKINS]: params => doshii.Tables.retrieveCheckins(params),
  [intents.RETRIEVE_TABLE_ORDERS]: params => doshii.Tables.retrieveOrders(params),
};

const transactions = {
  [intents.RETRIEVE_TRANSACTION]: params => doshii.Tables.retrieveOne(params),
  [intents.CREATE_TRANSACTION]: params => doshii.Tables.create(params),
  [intents.UPDATE_TRANSACTION]: params => doshii.Tables.update(params),
};


const doshiiMapping = {
  ...checkins,
  ...locations,
  ...members,
  ...orders,
  ...reservations,
  ...rewards,
  ...tables,
  ...transactions,
};

export default doshiiMapping;

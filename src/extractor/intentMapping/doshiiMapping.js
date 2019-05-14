import doshiiConnector from '@mryum/doshii-sdk';

import * as intents from '../../ordering/intents/doshiiIntents';
import * as templates from '../../enums/commonEnums';



// Doshii Connection Params
const doshii = doshiiConnector({
  clientId: process.env.DOSHII_CLIENT_ID,
  clientSecret: process.env.DOSHII_CLIENT_SECRET,
  env: 'sandbox',
  version: 'v3',
  silent: false
});

const doshii_cancelOrder = (params, onSuccess) => {
  doshii.Orders.retrieveOne({
    doshiiLocationId: params.doshiiLocationId,
    orderId: params.orderId
  }).then((result) => {
    let versionId = result.version;
    doshii.Orders.update({
      ...templates.cancelOrder.update,
      ...params, 
      version: versionId
    }).then((nextResult) => {
      let transactions = [];
      if (nextResult.transactions) {
        nextResult.transactions.map(val => {
          transactions.push({
            version: val.version,
            amount: val.amount,
            id: val.id
          });
        });

        transactions.map(data => {
          doshii.Transactions.update({
            ...templates.cancelOrder.update_transactions,
            doshiiLocationId: params.doshiiLocationId,
            transactionId: data.id,
            version: data.version
          })
        })
      }
    })
    onSuccess(result);
  });
};


// Intent to Doshii Call Maps
const checkins = {
  [intents.RETRIEVE_CHECKIN]: params => doshii.Checkins.retrieveOne(params),
  [intents.CREATE_CHECKIN]: (params, onSuccess) => {
    doshii.Checkins.create({
      ...templates.createCheckin,
      doshiiLocationId: params.doshiiLocationId,
      ...params.body
    }).then((response) => onSuccess(response))
  },
  [intents.CANCEL_CHECKIN]: (params, onSuccess) => {
    doshii.Checkins.update({
      checkinId: params.checkinId,
      doshiiLocationId: params.doshiiLocationId,
      status: 'cancelled',
      ...params.body
    }).then((response) => {
      onSuccess(response);
    })
  }
};

const locations = {
  [intents.RETRIEVE_ALL_LOCATIONS]: params => doshii.Locations.retrieveAll(params),
  [intents.RETRIEVE_LOCATION_MENU]: params => doshii.Locations.retrieveMenu(params),
  [intents.SUBSCRIBE_LOCATION]: (params, onSuccess) => doshii.Locations.subscribe({locationId: params.doshiiLocationId}).then((response) => onSuccess(response)),
  [intents.UNSUBSCRIBE_LOCATION]: (params, onSuccess) => doshii.Locations.unsubscribe({locationId: params.doshiiLocationId}).then((response) => onSuccess(response)),
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
  [intents.CREATE_ORDER]: (params, onSuccess) => {
    doshii.Orders.create({
      ...templates.createOrder.BASE,
      doshiiLocationId: params.doshiiLocationId,
      ...params.body
    }).then((response) => onSuccess(response))
  },
  [intents.UPDATE_ORDER]: params => doshii.Orders.update(params),
  [intents.CANCEL_ORDER]: (params, onSuccess) => doshii_cancelOrder(params, onSuccess),
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

const webhook = {
  [intents.RETRIEVE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.get().then((result) => onSuccess(result)),
  [intents.CREATE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.create({event: params.event, webhookUrl: params.webhookUrl}).then((result) => onSuccess(result)),
  [intents.UPDATE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.update({event: params.event, webhookUrl: params.webhookUrl}).then((result) => onSuccess(result)),
  [intents.DELETE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.delete({event: params.event}).then((result) => onSuccess(result))
}

const doshiiMapping = {
  ...checkins,
  ...locations,
  ...members,
  ...orders,
  ...reservations,
  ...rewards,
  ...tables,
  ...transactions,
  ...webhook,
};

export default doshiiMapping;

import doshiiConnector from "@mryum/doshii-sdk";
import * as preprocessors from "../preprocessors/doshiiPreprocessors.js";
import sendSms from "../../../util/sendSms.js";
import { callDatabase, postToDatabase } from "../../../util/callDatabase.js";
import emojis from "moji-translate";
import * as intents from "../../../ordering/intents/doshiiIntents.js";
import * as templates from "../../../enums/commonEnums.js";
import * as sms from "../../../enums/smsEnums.js";

const doshii = doshiiConnector({
  clientId: process.env.DOSHII_CLIENT_ID,
  clientSecret: process.env.DOSHII_CLIENT_SECRET,
  env: "sandbox",
  version: "v3",
  silent: false
});

const { createOrderPreprocess } = preprocessors;

const cancelOrder = (params, onSuccess) => {
  doshii.Orders.retrieveOne({
    doshiiLocationId: params.doshiiLocationId,
    orderId: params.orderId
  }).then(result => {
    let versionId = result.version;
    doshii.Orders.update({
      ...templates.cancelOrder.update,
      ...params,
      version: versionId
    }).then(nextResult => {
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
          });
        });
      }
    });
    console.log(result);
    onSuccess(result);
  });
};

const buildDatabasePayload = (body, doshiiId, doshiiLocationId) => {
  return {
    STRIPE_ID: body.stripeId,
    DOSHII_ID: doshiiId,
    DOSHII_LOCATION_ID: doshiiLocationId,
    VENUE_NAME: body.venueName,
    ITEMS: JSON.stringify(body.items),
    CUSTOMER_NAME: body.name,
    CUSTOMER_PHONE: body.phone,
    CLIENT_TYPE: body.clientType,
    REDEMPTION_CODE: body.redemptionCode,
    ORDER_TOTAL: body.orderTotal,
    STATUS: "pending"
  };
};

const orders = {
  [intents.CREATE_ORDER]: (params, onSuccess) => {
    try {
      const timedOut = setTimeout(() => {
        sms.sendOrderFailureSms(params.body.name, params.body.phone);
      }, 20000);

      doshii.Orders.create(
        createOrderPreprocess(params.body, params.doshiiLocationId)
      ).then(response => {
        postToDatabase(
          "db/orders", () => {},
          buildDatabasePayload(params.body, response.id, params.doshiiLocationId)
        ).then(() => {
          clearTimeout(timedOut);
          onSuccess(response);
        });
      });
    } catch (error) {
      console.log(error);
      sms.sendOrderFailureSms(params.body.name, params.body.phone);
    }
  },
  [intents.UPDATE_ORDER]: params => doshii.Orders.update(params),
  ['CANCEL_ORDER']: (params, onSuccess) => {cancelOrder(params, onSuccess)},
  [intents.RETRIEVE_ORDER_TRANSACTIONS]: params =>
    doshii.Orders.retrieveTransactions(params),
  [intents.CREATE_ORDER_TRANSACTION]: params =>
    doshii.Orders.createTransaction(params),
  [intents.RETRIEVE_ALL_ORDERS]: (params, onSuccess) =>
    doshii.Orders.retrieveAll({
      doshiiLocationId: params.doshiiLocationId
    }).then(response => onSuccess(response)),
  [intents.RETRIEVE_ORDER]: (params, onSuccess) =>
    doshii.Orders.retrieveOne({
      doshiiLocationId: params.doshiiLocationId,
      orderId: params.orderId
    }).then(response => onSuccess(response))
};

export default orders;

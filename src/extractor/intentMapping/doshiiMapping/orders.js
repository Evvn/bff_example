import doshiiConnector from '@mryum/doshii-sdk';
import * as preprocessors from '../preprocessors/doshiiPreprocessors.js';
import sendSms from '../../../util/sendSms.js';
import { callDatabase, postToDatabase }  from '../../../util/callDatabase.js';
import emojis from 'moji-translate';
import * as intents from '../../../ordering/intents/doshiiIntents.js';
import * as templates from '../../../enums/commonEnums.js';

const doshii = doshiiConnector({
    clientId: process.env.DOSHII_CLIENT_ID,
    clientSecret: process.env.DOSHII_CLIENT_SECRET,
    env: 'sandbox',
    version: 'v3',
    silent: false
  });

const { createOrderPreprocess } = preprocessors;

const cancelOrder = (params, onSuccess) => {
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
      console.log(result);
      onSuccess(result);
    });
  };

const buildDatabasePayload = (body, doshiiId) => {
  return {
    STRIPE_ID: body.stripeId,
    DOSHII_ID: doshiiId,
    VENUE_NAME: body.venueName,
    ITEMS: JSON.stringify(body.items),
    CUSTOMER_NAME: body.name,
    CUSTOMER_PHONE: body.phone,
    CLIENT_TYPE: body.clientType,
    REDEMPTION_CODE: body.redemptionCode,
    ORDER_TOTAL: body.orderTotal,
    STATUS: 'PENDING',
  };
}

const orders = {
  [intents.RETRIEVE_ALL_ORDERS]: params => doshii.Orders.retrieveAll(params),
  [intents.RETRIEVE_ORDER]: params => doshii.Orders.retrieveOne(params),
  [intents.CREATE_ORDER]: (params, onSuccess) => {
    try{
    const sendSmsOnSuccess = (phone, name) => {
      const message = `Hi ${name}, your order has been successfully placed. You will recieve a message when it is ready! `
      + emojis.translate('snowflake grin ice_skate pizza snowman');
      sendSms(phone, message, () => {});
    }
    
    const sendSmsOnFailure = (phone, name) => {
      const message = `Hi ${name}, your order has NOT been successfully placed. You will recieve a message when it is ready! `
      + emojis.translate('snowflake grin ice_skate pizza snowman');
      sendSms(phone, message, () => {});
    }

    const timedOut = setTimeout(() => {
      sendSmsOnFailure(params.body.phone, params.body.name);
    }, 20000);

    doshii.Orders.create(createOrderPreprocess(params.body, params.doshiiLocationId))
    .then((response) => {
        postToDatabase('db/orders', () => {sendSmsOnSuccess(params.body.phone, params.body.name)}, buildDatabasePayload(params.body, response.id))
        .then(() => {
          
          clearTimeout(timedOut);
          onSuccess(response);
        })
    });
    } catch(error){
      console.log(error);
    }

    
  },
  [intents.UPDATE_ORDER]: params => doshii.Orders.update(params),
  [intents.CANCEL_ORDER]: (params, onSuccess) => cancelOrder(params, onSuccess),
  [intents.RETRIEVE_ORDER_TRANSACTIONS]: params => doshii.Orders.retrieveTransactions(params),
  [intents.CREATE_ORDER_TRANSACTION]: params => doshii.Orders.createTransaction(params),
};

export default orders;
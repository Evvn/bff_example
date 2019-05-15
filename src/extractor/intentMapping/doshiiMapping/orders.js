import doshiiConnector from '@mryum/doshii-sdk';
import * as preprocessors from './preprocessors/doshiiPreprocessors.js';
import sendSms from '../../util/sendSms.js';
import emojis from 'moji-translate';

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
      onSuccess(result);
    });
  };

const orders = {
  [intents.RETRIEVE_ALL_ORDERS]: params => doshii.Orders.retrieveAll(params),
  [intents.RETRIEVE_ORDER]: params => doshii.Orders.retrieveOne(params),
  [intents.CREATE_ORDER]: (params, onSuccess) => {
    doshii.Orders.create(createOrderPreprocess(params.body, params.doshiiLocationId))
      .then((response) => {
        const {phone, name} = params.body;
        const message = `Hi ${name}, your order has been successfully placed. You will recieve a message when it is ready! `
          + emojis.translate('snowflake grin ice_skate pizza snowman');
        sendSms(phone, message, () => {});
        console.log(response);
        onSuccess(response);
      });
  },
  [intents.UPDATE_ORDER]: params => doshii.Orders.update(params),
  [intents.CANCEL_ORDER]: (params, onSuccess) => cancelOrder(params, onSuccess),
  [intents.RETRIEVE_ORDER_TRANSACTIONS]: params => doshii.Orders.retrieveTransactions(params),
  [intents.CREATE_ORDER_TRANSACTION]: params => doshii.Orders.createTransaction(params),
};

export default orders;
import doshiiConnector from '@mryum/doshii-sdk';
import * as intents from '../../../ordering/intents/doshiiIntents.js';
import * as templates from '../../../enums/commonEnums.js';


const doshii = doshiiConnector({
    clientId: process.env.DOSHII_CLIENT_ID,
    clientSecret: process.env.DOSHII_CLIENT_SECRET,
    env: 'sandbox',
    version: 'v3',
    silent: false
  });

const transactions = {
    [intents.RETRIEVE_TRANSACTION]: params => doshii.Tables.retrieveOne(params),
    [intents.CREATE_TRANSACTION]: (params, onSuccess) => doshii.Tables.create(params).then((response) => onSuccess(response)),
    [intents.UPDATE_TRANSACTION]: params => doshii.Tables.update(params),
  };

export default transactions;
import doshiiConnector from '@mryum/doshii-sdk';
import * as intents from '../../../ordering/intents/doshiiIntents.js';
import sendSms from '../../../util/sendSms.js';

const doshii = doshiiConnector({
    clientId: process.env.DOSHII_CLIENT_ID,
    clientSecret: process.env.DOSHII_CLIENT_SECRET,
    env: 'sandbox',
    version: 'v3',
    silent: false
  });

const catchWebhook = (event) => {
  if(event === 'order_updated'){
    sendSms('+61413206203', 'EV', 'orderDone')
  }
}

const webhook = {
    [intents.RETRIEVE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.get(),//.then((result) => onSuccess(result)),
    [intents.CREATE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.create({event: params.event, webhookUrl: params.webhookUrl}).then((result) => onSuccess(result)),
    [intents.UPDATE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.update({event: params.event, webhookUrl: params.webhookUrl}).then((result) => onSuccess(result)),
    [intents.DELETE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.delete({event: params.event}).then((result) => onSuccess(result)),
    //[intents.CATCH_WEBHOOK]: (params, onSuccess) => 
  }

  export default webhook;
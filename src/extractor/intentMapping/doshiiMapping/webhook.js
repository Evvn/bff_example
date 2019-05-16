import doshiiConnector from '@mryum/doshii-sdk';
import * as intents from '../../../ordering/intents/doshiiIntents.js';
import sendSms from '../../../util/sendSms.js';
import * as templates from '../../../enums/commonEnums.js';
import { callDatabase } from '../../../util/callDatabase.js';


const doshii = doshiiConnector({
    clientId: process.env.DOSHII_CLIENT_ID,
    clientSecret: process.env.DOSHII_CLIENT_SECRET,
    env: 'sandbox',
    version: 'v3',
    silent: false
  });

const catchWebhook = (payload) => {
  const { event, data } = payload;
  const { status, id } = data;

  processOrder = (order) => {
    if(event === 'order_updated'){
      if(status === 'accepted'){
        //send successfully placed text
      }
      else if(status === 'rejected'){
        //send failure text
      }
    }
    else if(event === 'pending_timeout'){
      postToDatabase(`orders/updateStatus/${id}`)
    }
  };

  callDatabase(`orders/${id}`, processOrder);
  
  
}

const webhook = {
    [intents.RETRIEVE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.get(),//.then((result) => onSuccess(result)),
    [intents.CREATE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.create({event: params.event, webhookUrl: params.webhookUrl}).then((result) => onSuccess(result)),
    [intents.UPDATE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.update({event: params.event, webhookUrl: params.webhookUrl}).then((result) => onSuccess(result)),
    [intents.DELETE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.delete({event: params.event}).then((result) => onSuccess(result)),
    [intents.CATCH_WEBHOOK]: (params, onSuccess) => catchWebhook(params)
  }

  export default webhook;
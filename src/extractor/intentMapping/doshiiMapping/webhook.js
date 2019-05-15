import doshiiConnector from '@mryum/doshii-sdk';

const doshii = doshiiConnector({
    clientId: process.env.DOSHII_CLIENT_ID,
    clientSecret: process.env.DOSHII_CLIENT_SECRET,
    env: 'sandbox',
    version: 'v3',
    silent: false
  });

const webhook = {
    [intents.RETRIEVE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.get(),//.then((result) => onSuccess(result)),
    [intents.CREATE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.create({event: params.event, webhookUrl: params.webhookUrl}).then((result) => onSuccess(result)),
    [intents.UPDATE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.update({event: params.event, webhookUrl: params.webhookUrl}).then((result) => onSuccess(result)),
    [intents.DELETE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.delete({event: params.event}).then((result) => onSuccess(result))
  }

  export default webhook;
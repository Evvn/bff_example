import doshiiConnector from '@mryum/doshii-sdk';

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

export default checkins;
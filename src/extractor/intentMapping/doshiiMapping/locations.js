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

const locations = {
    [intents.RETRIEVE_ALL_LOCATIONS]: params => doshii.Locations.retrieveAll(params),
    [intents.RETRIEVE_LOCATION_MENU]: params => doshii.Locations.retrieveMenu(params),
    [intents.SUBSCRIBE_LOCATION]: (params, onSuccess) => doshii.Locations.subscribe({locationId: params.doshiiLocationId}).then((response) => onSuccess(response)),
    [intents.UNSUBSCRIBE_LOCATION]: (params, onSuccess) => doshii.Locations.unsubscribe({locationId: params.doshiiLocationId}).then((response) => onSuccess(response)),
  };

  export default locations;
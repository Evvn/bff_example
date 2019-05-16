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

const members = {
    [intents.RETRIEVE_ALL_MEMBERS]: params => doshii.Members.retrieveAll(params),
    [intents.RETRIEVE_MEMBER]: params => doshii.Members.retrieveOne(params),
    [intents.CREATE_MEMBER]: params => doshii.Members.create(params),
    [intents.UPDATE_MEMBER]: params => doshii.Members.update(params),
    [intents.REMOVE_MEMBER]: params => doshii.Members.remove(params),
  };

export default members;
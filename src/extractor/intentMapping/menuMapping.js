import * as intents from '../../menu/menuIntents';
import models from '../../models/index';
import callDatabase from '../../util/callDatabase.js';

const menuMapping = {
  [intents.GET_MENU_DATA]: (context, onSuccess) => {
    callDatabase(`db/menu/${context.venueUrl}`, onSuccess);
  },
  [intents.GET_VENUE_LIST]: (context, onSuccess) => {
    if (context.category === 'list') {
      callDatabase(`db/menu/venues`, onSuccess);
    } else {
      callDatabase(`db/menu/venues/${context.category}`);
    }
  }
};

export default menuMapping;

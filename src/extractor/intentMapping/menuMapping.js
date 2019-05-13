import * as intents from '../../menu/menuIntents';
import models from '../../models/index';
import callDatabase from '../../util/callDatabase.js';

const menuMapping = {
  [intents.GET_MENU_DATA]: (context, onSuccess) => {
    callDatabase(`db/menu/${context.venueUrl}`, onSuccess);
  },
  [intents.GET_VENUE_LIST]: (context, onSuccess) => {
    if (context.category === 'list') {
      models.Venue.findAll({where: {}})
        .then((data) => {
          onSuccess(data);
        });
    } else {
      models.Venue.findByCategory(context.category)
        .then((data) => {
          onSuccess(data);
        });
    }
  }
};

export default menuMapping;

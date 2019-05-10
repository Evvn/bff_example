import {
  GET_MENU_DATA,
  GET_VENUE_LIST,
} from './menuIntents';

const menuService = (airtableTransformer, extractor) => {

  const getMenuData = ({
    context, onSuccess, onFailure,
  }) => {
    extractor.readMany({
      intents: [GET_MENU_DATA],
      context,
      onSuccess: (airtablePayload) => {
        onSuccess(airtableTransformer.getMenuData(airtablePayload));
      },
      onFailure,
    });
  };

  const getVenueList = ({
    context, onSuccess, onFailure,
  }) => {
    extractor.readMany({
      intents: [GET_VENUE_LIST],
      context,
      onSuccess: (airtablePayload) => {
        onSuccess(context.category !== 'list' ? airtableTransformer.getVenueList(airtablePayload) : airtableTransformer.getVenueNames(airtablePayload));
      },
      onFailure,
    });
  };

  return {
    getMenuData,
    getVenueList,
  };
};

export default menuService;

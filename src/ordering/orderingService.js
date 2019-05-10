import {
  GET_ORDER_MENU_DATA,
  MAKE_STRIPE_CHARGE,
  SEND_SMS,
} from './intents/orderIntents';

const orderingService = ({ doshiiTransformer, orderMenuTransformer }, extractor) => {

  const getOrderMenuData = ({
    context, onSuccess, onFailure,
  }) => {
    extractor.readMany({
      intents: [GET_ORDER_MENU_DATA],
      context,
      onSuccess: (payload) => {
        onSuccess(orderMenuTransformer.getOrderMenuData(payload));
      },
      onFailure,
    });
  };

  const makeStripeCharge = ({
    context, onSuccess, onFailure,
  }) => {
    extractor.readMany({
      intents: [MAKE_STRIPE_CHARGE],
      context,
      onSuccess: (payload) => {
        onSuccess(orderMenuTransformer.getStripeResponse(payload));
      },
      onFailure,
    });
  };

  const sendSms = ({
    context, onSuccess, onFailure,
  }) => {
    extractor.readMany({
      intents: [SEND_SMS],
      context,
      onSuccess: (payload) => {
        onSuccess(orderMenuTransformer.getSmsResponse(payload));
      },
      onFailure,
    });
  };

  return {
    getOrderMenuData,
    makeStripeCharge,
    sendSms,
  };
};



export default orderingService;

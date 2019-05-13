import {
  GET_ORDER_MENU_DATA,
  MAKE_STRIPE_CHARGE,
  SEND_SMS,
} from './intents/orderIntents';

import {
  SUBSCRIBE_LOCATION,
  UNSUBSCRIBE_LOCATION,
  CREATE_ORDER,
  CANCEL_ORDER,
  CREATE_CHECKIN,
  CANCEL_CHECKIN
} from "./intents/doshiiIntents";

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

  const doshii_SubscribeLocation = ({ context, onSuccess, onFailure }) => {
    extractor.readMany({
      intents: [SUBSCRIBE_LOCATION],
      context,
      onSuccess: payload => {
        onSuccess(doshiiTransformer.subscribe(payload));
      },
      onFailure
    });
  };

  const doshii_UnsubscribeLocation = ({ context, onSuccess, onFailure }) => {
    extractor.readMany({
      intents: [UNSUBSCRIBE_LOCATION],
      context,
      onSuccess: payload => {
        onSuccess(doshiiTransformer.unsubscribe(payload));
      },
      onFailure
    });
  };

  const doshii_createOrder = ({ context, onSuccess, onFailure }) => {
    extractor.readMany({
      intents: [CREATE_ORDER],
      context,
      onSuccess: payload => {
        onSuccess(doshiiTransformer.createOrder(payload));
      },
      onFailure
    });
  };

  const doshii_cancelOrder = ({ context, onSuccess, onFailure }) => {
    extractor.readMany({
      intents: [CANCEL_ORDER],
      context,
      onSuccess: payload => {
        onSuccess(doshiiTransformer.cancelOrder(payload));
      },
      onFailure
    });
  };

  const doshii_createCheckin = ({ context, onSuccess,  onFailure }) => {
    extractor.readMany({
      intents: [CREATE_CHECKIN],
      context,
      onSuccess: payload => {
        onSuccess(doshiiTransformer.createCheckin(payload));
      },
      onFailure
    });
  };

  const doshii_cancelCheckin = ({ context, onSuccess, onFailure }) => {
    extractor.readMany({
      intents: [CANCEL_CHECKIN],
      context,
      onSuccess: payload => {
        onSuccess(doshiiTransformer.cancelCheckin(payload));
      },
      onFailure
    });
  }

  return {
    getOrderMenuData,
    makeStripeCharge,
    sendSms,
    doshii_SubscribeLocation,
    doshii_UnsubscribeLocation,
    doshii_createOrder,
    doshii_cancelOrder,
    doshii_createCheckin,
    doshii_cancelCheckin,
  };
};



export default orderingService;

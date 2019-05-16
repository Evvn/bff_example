import doshiiConnector from "@mryum/doshii-sdk";
import * as intents from "../../../ordering/intents/doshiiIntents.js";
import sendSms from "../../../util/sendSms.js";
import * as templates from "../../../enums/commonEnums.js";
import { callDatabase } from "../../../util/callDatabase.js";
import * as sms from "../../../enums/smsEnums.js";
import * as orderCommands from './orders.js';

const doshii = doshiiConnector({
  clientId: process.env.DOSHII_CLIENT_ID,
  clientSecret: process.env.DOSHII_CLIENT_SECRET,
  env: "sandbox",
  version: "v3",
  silent: false
});

const catchWebhook = payload => {
  const { event } = payload;
  const processOrder = order => {
    console.log(order);
    if (event === "order_updated") {
	    const { status, id, locationId } = payload.data;
      if (status === "accepted") {
        postToDatabase(`orders/updateStatus/${id}`, () => {}, {
          STATUS: status
        }).then(() => {
          //send successfully placed text
          sms.sendOrderSuccessSms(order.CUSTOMER_NAME, order.CUSTOMER_PHONE);
        });
      } else if (status === "rejected") {
        postToDatabase(`orders/updateStatus/${id}`, () => {}, {
          STATUS: status
        }).then(() => {
          //send failure text
          sms.sendOrderFailureSms(order.CUSTOMER_NAME, order.CUSTOMER_PHONE);
        });
      } else if (status === "completed") {
        postToDatabase(`orders/updateStatus/${id}`, () => {}, {
          STATUS: status
        }).then(() => {
          // send ready for pickup sms
          sms.sendPickupReadySms(
            order.CUSTOMER_NAME,
            order.CUSTOMER_PHONE,
            order.REDEMPTION_CODE
          );
        });
      }
    } else if (event === "pending_timeout") {
      const { STATUS, DOSHII_ID, LOCATION_ID } = payload.order;
      if (order.STATUS === "pending") {
        postToDatabase(`orders/updateStatus/${id}`, () => {}, {
          STATUS: "canceled"
        }).then(() => {
          // cancel doshii order
          orderCommands['CANCEL_ORDER']({orderId: DOSHII_ID, doshiiLocationId: DOSHII_LOCATION_ID, status: 'cancelled'});
          // issue refund - ask AVC, eftpos refund option?
          // send refund order (negative balance for reconciliation)
          // send failure text
          sms.sendOrderFailureSms(order.CUSTOMER_NAME, order.CUSTOMER_PHONE);
        });
      }
    }
  };
	let ID = payload.order ? payload.order.DOSHII_ID : payload.data.id;
  callDatabase(`orders/${ID}`, processOrder);
};

const webhook = {
  [intents.RETRIEVE_WEBHOOKS]: (params, onSuccess) => doshii.Webhooks.get(), //.then((result) => onSuccess(result)),
  [intents.CREATE_WEBHOOKS]: (params, onSuccess) =>
    doshii.Webhooks.create({
      event: params.event,
      webhookUrl: params.webhookUrl
    }).then(result => onSuccess(result)),
  [intents.UPDATE_WEBHOOKS]: (params, onSuccess) =>
    doshii.Webhooks.update({
      event: params.event,
      webhookUrl: params.webhookUrl
    }).then(result => onSuccess(result)),
  [intents.DELETE_WEBHOOKS]: (params, onSuccess) =>
    doshii.Webhooks.delete({ event: params.event }).then(result =>
      onSuccess(result)
    ),
  ['CATCH_WEBHOOK']: (params, onSuccess) => {catchWebhook(params)}
};

export default webhook;

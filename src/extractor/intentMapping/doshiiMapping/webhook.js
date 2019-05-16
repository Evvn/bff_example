import doshiiConnector from "@mryum/doshii-sdk";
import * as intents from "../../../ordering/intents/doshiiIntents.js";
import sendSms from "../../../util/sendSms.js";
import * as templates from "../../../enums/commonEnums.js";
import { callDatabase } from "../../../util/callDatabase.js";
import * as sms from "../../../enums/smsEnums.js";

const doshii = doshiiConnector({
  clientId: process.env.DOSHII_CLIENT_ID,
  clientSecret: process.env.DOSHII_CLIENT_SECRET,
  env: "sandbox",
  version: "v3",
  silent: false
});

const catchWebhook = payload => {
  const { event, data } = payload;
  const { status, id } = data;

  processOrder = order => {
    if (event === "order_updated") {
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
<<<<<<< HEAD
    } else if (event === "pending_timeout") {
      if (order.STATUS === "pending") {
        postToDatabase(`orders/updateStatus/${id}`, () => {}, {
          STATUS: "canceled"
        }).then(() => {
          // cancel doshii order
          // issue refund - ask AVC, eftpos refund option?
          // send refund order (negative balance for reconciliation)
          // send failure text
          sms.sendOrderFailureSms(order.CUSTOMER_NAME, order.CUSTOMER_PHONE);
        });
=======
    }
    else if(event === 'pending_timeout'){
      if(order.STATUS === 'pending'){
        postToDatabase(`orders/updateStatus/${id}`, ()=>{}, {STATUS: 'cancelled'})
          .then(() => {
            // cancel doshii order
            // send failure text
          })
>>>>>>> 1f4577c0d0f8834f07ae3a196c94dc5cd9dde64f
      }
    }
  };

  callDatabase(`orders/${id}`, processOrder);
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
  [intents.CATCH_WEBHOOK]: (params, onSuccess) => catchWebhook(params)
};

export default webhook;

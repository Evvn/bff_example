import sendSms from "../util/sendSms.js";
import emojis from "moji-translate";

export const sendOrderSuccessSms = (name, phone) => {
  const message =
    `Hi ${name}, your order has been successfully placed. You will receive a message when it is ready! ` +
    emojis.translate("snowflake grin ice_skate pizza snowman");
  return sendSms(phone, message, () => {});
};

export const sendOrderFailureSms = (name, phone) => {
  const message =
    `Hi ${name}, your order has NOT been successfully placed.` +
    emojis.translate("snowflake grin ice_skate pizza snowman");
  return sendSms(phone, message, () => {});
};

export const sendPickupReadySms = (name, phone, redemptionCode) => {
  const message =
    `Hi ${name}, your order is ready for pick up at the Feast Kitchen container. Your redemption code is ${redemptionCode} ` +
    emojis.translate("snowflake grin ice_skate pizza snowman");
  return sendSms(phone, message, () => {});
};

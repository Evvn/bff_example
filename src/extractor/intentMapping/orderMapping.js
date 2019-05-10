import * as intents from '../../ordering/intents/orderIntents';
import models from '../../models/index';
import Stripe from 'stripe';
import twilio from 'twilio';
import emojis from 'moji-translate';

const orderingMapping = {
  [intents.GET_ORDER_MENU_DATA]: (context, onSuccess) => {
    models.OrderingMenu.findByUrl(context.venueName)
      .then((data) => {
        if(data.length > 0){
          const dataWithAddons = [];
          data.map(item => {
            const whereClause = item.AIRTABLE_MENU_PAYLOAD.addons;
            if(whereClause) {
              models.AddOn.findByIDs(whereClause)
                .then((addOnData) => {
                  const itemClone = item;
                  itemClone.AIRTABLE_MENU_PAYLOAD.addons = addOnData;
                  dataWithAddons.push(itemClone);
                  if (dataWithAddons.length === data.length){
                    onSuccess(dataWithAddons)
                  }
                });
            } else{
              dataWithAddons.push(item);
                  if (dataWithAddons.length === data.length){
                    onSuccess(dataWithAddons)
                  }
            }
          });
        } else{
              onSuccess(data);
        }
      });
  },
  [intents.MAKE_STRIPE_CHARGE]: (context, onSuccess, onFailure) => {
    const stripe = Stripe('sk_live_8YQQMHtzDj6h8wP608xeiisQ');
    stripe.charges.create({
      amount: context.body.amount,
      currency: context.body.currency,
      source: context.body.source,
      description: context.body.desc,
      receipt_email: context.body.email,
    }).then((response) => {
      onSuccess(response)
    }).catch((error) => {
      onFailure(error)
    });
  },
  [intents.SEND_SMS]: (context, onSucess) => {
    const client = twilio(process.env.TWILIO_ACCOUT_SID,process.env.TWILIO_AUTH_TOKEN);
    client.messages
    .create({
      from: '+61488811318',
      to: `+${context.body.number}`,
      body: `Hi ${context.body.name}, your order is ready for pick up at the Feast Kitchen container. Your redemption code is ${context.body.redemptionCode} ` + emojis.translate('snowflake grin ice_skate pizza snowman')
    })
    .then(res => {
      console.log('here')
      onSucess(res)
    })
    .catch(err => {
      console.log(err);
    });

  }
};

export default orderingMapping;

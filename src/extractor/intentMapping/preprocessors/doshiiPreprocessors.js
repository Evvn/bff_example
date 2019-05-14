import * as templates from '../../../enums/commonEnums.js';

export const createOrderPreprocess = (rawOrders, doshiiLocationId) => {
    const { createOrder } = templates;
    const {
        items,
        stripeId,
        orderTotal,
        name,
        email,
        phone,
        clientType,
    } = rawOrders;

    //Fill in order base
    const orderPayload = createOrder.BASE;
    orderPayload.name = name;
    orderPayload.email = email;
    orderPayload.doshiiLocationId = doshiiLocationId;
    orderPayload.consumer = { name, phone, };

    //Add Trasaction Data
    orderPayload.transactions = [{
        ...{
            amount: orderTotal,
            reference: stripeId,
        },
        ...createOrder.TRANSCATION,
    }];

    //Populate Items
    orderPayload.order = {
        type: clientType,
        surcounts: [],
        items: Object.keys(items).map(itemKey => {
            const { ORDER_ITEM } = createOrder;
            const item = items[itemKey];
            ORDER_ITEM.name = item.NAME;
            ORDER_ITEM.unitPrice = item.PRICE;
            ORDER_ITEM.totalBeforeSurcounts = item.PRICE;
            ORDER_ITEM.totalAfterSurcounts = item.PRICE;
            ORDER_ITEM.posId = item.DOSHII_POS_ID;
            return ORDER_ITEM;
        })
    }

    console.log(JSON.stringify(orderPayload));
    return orderPayload;
};
import * as templates from '../../enums/commonEnums';

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
    const orderPayload = {};

    //Fill in order base
    orderPayload.BASE = createOrder.BASE;
    orderPayload.BASE.name = name;
    orderPayload.BASE.email = email;
    orderPayload.BASE.doshiiLocationId = doshiiLocationId;
    orderPayload.BASE.consumer = { name, phone, };

    //Add Trasaction Data
    orderPayload.BASE.transactions = [{
        ...{
            amount: orderTotal,
            reference: stripeId,
        },
        ...createOrder.TRANSCATION,
    }];

    //Populate Items
    orderPayload.BASE.order = {
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
        })
    }

    return orderPayload;
};
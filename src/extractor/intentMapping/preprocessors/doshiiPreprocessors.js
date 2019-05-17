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
    orderPayload.consumer = { name, phone, email};

    //Add Trasaction Data
    orderPayload.transactions = [{
            amount: orderTotal,
            reference: stripeId,
            prepaid: true,
            method: 'credit',
    }];

    //Populate Items
    orderPayload.order = {
        externalOrderRef: stripeId,
        type: clientType,
        surcounts: [],
        items: Object.keys(items).map(itemKey => {
            const { ORDER_ITEM } = createOrder;
            const item = items[itemKey];
            const options = !item.addOns ? [] : item.addOns
                .map(addon => {
                    return {
                        name: 'addons', //addon.name,
                        posId: '000010',//addon.DOSHII_POS_ID,
                        variants: [{
                            name: 'vegan cheese',
                            posId: '000143',
                            price: 80, 
                        }]//addon.PRICE,
                    };
                });
            ORDER_ITEM.name = item.name;
            ORDER_ITEM.unitPrice = item.price;
            ORDER_ITEM.totalBeforeSurcounts = item.price;
            ORDER_ITEM.totalAfterSurcounts = item.price;
            ORDER_ITEM.posId = '8502-17308' //item.DOSHII_POS_ID;
            ORDER_ITEM.options = options;
            return ORDER_ITEM;
        })
    }
    console.log(JSON.stringify(orderPayload));
    return orderPayload;
};
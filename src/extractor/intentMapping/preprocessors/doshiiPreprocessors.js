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
            let variantAddition = 0;
            const variants = !item.addOns ? [] : item.addOns
                .map(addon => {
                    variantAddition = variantAddition +  addon.price;
                    return {
                        name: 'vego', //addon.name,
                        posId: '000022',//addon.DOSHII_POS_ID,
                        price: '80'//addon.PRICE,
                    };
                });
            ORDER_ITEM.name = item.name;
            ORDER_ITEM.unitPrice = item.price;
            ORDER_ITEM.totalBeforeSurcounts = item.price;
            ORDER_ITEM.totalAfterSurcounts = item.price + variantAddition;
            ORDER_ITEM.posId = '0000000026' //item.DOSHII_POS_ID;
            ORDER_ITEM.variants = variants;
            return ORDER_ITEM;
        })
    }
    console.log(JSON.stringify(orderPayload));
    return orderPayload;
};
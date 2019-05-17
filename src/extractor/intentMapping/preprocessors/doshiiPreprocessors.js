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
            amount: 500,//orderTotal,
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
            const options = !item.addOns ? [] : item.addOns;
            //     .map(addon => {
            //         options: []
            //         [{
            //             name: 'Coffee & Tea Mods', //addon.name,
            //             posId: '191',//addon.DOSHII_POS_ID,
            //             variants: [{
            //                 name: 'Add Soy',
            //                 posId: '8502-19015',
            //                 price: 50, 
            //             },
            //             {
            //                 name: 'Almond Milk',
            //                 posId: '8502-19131',
            //                 price: 50, 
            //             },
            //             {
            //                 name: 'Decaf',
            //                 posId: '8502-19130',
            //                 price: , 
            //             }]//addon.PRICE,
            //         }];
            //    });
            ORDER_ITEM.quantity = item.quantity;
            ORDER_ITEM.name = item.name;
            ORDER_ITEM.unitPrice = item.price;
            ORDER_ITEM.totalBeforeSurcounts = item.totalBeforeSurcounts;
            ORDER_ITEM.totalAfterSurcounts = item.totalBeforeSurcounts;
            ORDER_ITEM.posId = item.DOSHII_POS_ID;
            ORDER_ITEM.options = options;
            return ORDER_ITEM;
        })
    }
    console.log(JSON.stringify(orderPayload));
    return orderPayload;
};
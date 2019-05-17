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
            const options = //!item.addOns ? [] : //item.addOns
                //.map(addon => {
                    [{
                        name: 'Coffee & Tea Mods', //addon.name,
                        posId: '191',//addon.DOSHII_POS_ID,
                        variants: [{
                            name: 'Add Soy',
                            posId: '8502-19015',
                            price: 50, 
                        },
                        {
                            name: 'Almond Milk',
                            posId: '8502-19131',
                            price: 50, 
                        },
                        {
                            name: 'Decaf',
                            posId: '8502-19130',
                            price: 0, 
                        }]//addon.PRICE,
                    }];
               // });
            ORDER_ITEM.name = "English B'Fast"//item.name;
            ORDER_ITEM.unitPrice = 400;//item.price;
            ORDER_ITEM.totalBeforeSurcounts = 400;//item.price;
            ORDER_ITEM.totalAfterSurcounts = 400;//item.price;
            ORDER_ITEM.posId = '8502-19001' //item.DOSHII_POS_ID;
            ORDER_ITEM.options = options;
            return ORDER_ITEM;
        })
    }
    console.log(JSON.stringify(orderPayload));
    return orderPayload;
};
export const createOrder = {
    BASE: {
        name: 'MrYum',
        email: 'dev@mryum.com.au',
        doshiiLocationId: '',
        order: {
            type: 'dinein',
            items: [],
            surcounts: [],
        },
        transactions: [],
        consumer: {
            name: 'MrYum',
            phone: '0423289668'
        }
    },
    TRANSACTION: { 
        amount: '0',
        prepaid: true,
        method: 'credit',
        reference: 'stripe id'
    },
    ORDER_ITEM: {
        name: '',
        quantity: '1',
        unitPrice: '0',
        type: 'single',
        surcounts: [],
        options: [],
        totalBeforeSurcounts: '0',
        totalAfterSurcounts: '0',
        posId: ''
    },

    BUNDLE_ORDER_ITEM: {
        name: '',
        quantity: '1',
        unitPrice: '0',
        type: 'single',
        surcounts: [],
        options: [],
        includedItems: [],
        totalBeforeSurcounts: '0',
        totalAfterSurcounts: '0',
        posId: ''
    },
    INCLUDED_ITEMS: {
        name: '',
        posId: '',
        quantity: '1',
        unitPrice: '0',
        options: [],
    }
}

export const cancelOrder = {
    retrieve: {
        doshiiLocationId: '',
        orderId: '',
    },
    update: {
        doshiiLocationId: '',
        orderId: '',
        version: '',
        status: 'cancelled',
    },
    update_transactions: {
        doshiiLocationId: '',
        transactionId: '',
        status: 'cancelled',
        version: ''
    }
}

export const location = {
    SUBSCRIBE: {
        locationId: ''
    },
    UNSUBSCRIBE: {
        locationId: ''
    }

}

export const createCheckin = {
    doshiiLocationId: '',
    tableNames: [],
    ref: '',
    covers: '',
    checkTables: false
}

export const cancelCheckin = {
    doshiiLocationId: '',
    status: 'cancelled',
    tableNames: [],
}

export const updateWebhook = {
    event: '',
    webhookUrl: ''
}

export const createWebhook = {
    event: '',
    webhookUrl: ''
}

export const deleteWebhook = {
    event: ''
}

export const events = {
    transaction_created: { 
        event: 'transaction_created',
        data: {
            "id": "1354",
            "orderId": "123",
            "locationId": "aH43yx2",
            "status": "requested",
            "posRef": "o987684",
            "posTerminalId": "23fd46",
            "requestData": {
                "accountId": "HwgD78834234Ds2d",
                "expiryDate": "2018-09-12T00:00:00.000Z"
            },
            "uri": "https://sandbox.doshii.co/partner/v3/transactions/1354"
        }
    },
    order_updated: {
        event: 'order_updated',
        data: {
            "id": "3",
            "locationId": "aH43yx2",
            "status": "cancelled",
            "uri": "https://sandbox.doshii.co/partner/v3/orders/3"
        }
    },
    transaction_updated: {
        event: 'transaction_updated',
        data: {
            "id": "1354",
            "orderId": "123",
            "locationId": "aH43yx2",
            "status": "complete",
            "posRef": "o987684",
            "posTerminalId": "23fd46",
            "verifyData": {
                "imageUri": "https://payment.app/verification_image.png"
            },
            "uri": "https://sandbox.doshii.co/partner/v3/transactions/1354"
        }
    },
    booking_created: {
        event: "booking_created",
        data: {
            "id": "",
            "locationId": "",
            "uri": ""
        }
    },
    booking_updated: {
        event: "booking_updated",
        data: {
            "id": "1354",
            "locationId": "7",
            "status": "accepted",
            "uri": "https://sandbox.doshii.co/partner/v3/bookings/1354"
        }
    },
    checkin_created: {
        event: "checkin_created",
        data: {
            "id": "1354",
            "locationId": "7",
            "uri": "https://sandbox.doshii.co/partner/v3/checkins/1354"
        }
    },
    checkin_updated: {
        event: "checkin_updated",
        data: {
            "id": "1354",
            "locationId": "7",
            "uri": "https://sandbox.doshii.co/partner/v3/checkins/1354"
        }
    },
    checkin_deleted :{
        event: "checkin_deleted",
        data: {
            "id": "1354",
            "locationId": "7",
            "uri": "https://sandbox.doshii.co/partner/v3/checkins/1354"
        }
    },
    member_created: {
        event: "member_created",
        data: {
            "id": "1354",
            "organisationId": "100",
            "uri": "https://sandbox.doshii.co/partner/v3/members/1354"
        }
    },
    member_updated: {
        event: "member_updated",
        // Event - entire menu updated
        data1: {
            "id": "1354",
            "organisationId": "100",
            "uri": "https://sandbox.doshii.co/partner/v3/members/1354"
        },
        // Event - specific menu item updated
        data2: {
            "locationId": "1354",
            "uri": "https://sandbox.doshii.co/partner/v3/locations/1354/menu",
            "posId": "00011231",
            "type": "products",
            "action": "updated",
            "itemUri": "https://sandbox.doshii.co/partner/v3/locations/1354/menu/products/00011231"
        },
        // Event - specific menu surcount updated
        data3: {
            "locationId": "1354",
            "uri": "https://sandbox.doshii.co/partner/v3/locations/1354/menu",
            "posId": "delivery10",
            "type": "surcounts",
            "action": "updated",
            "itemUri": "https://sandbox.doshii.co/partner/v3/locations/1354/menu/surcounts/delivery10"
        }
    },
    order_created: {
        event: "order_created",
        data: {
            "id": "3",
            "locationId": "aH43yx2",
            "status": "complete",
            "uri": "https://sandbox.doshii.co/partner/v3/orders/3"
        }
    },
    points_redemption: {
        event: "points_redemption",
        data: {
            "memberId": "100",
            "orderId": "236",
            "points": "1354",
            "uri": "https://sandbox.doshii.co/partner/v3/members/100"
        }
    },
    reward_redemption: {
        "event": "reward_redemption",
        "data": {
            "memberId": "100",
            "rewardId": "1354",
            "orderId": "236",
            "uri": "https://sandbox.doshii.co/partner/v3/members/100/rewards/1354"
        }
    },
    table_created: {
        "event": "table_created",
        "data": {
            "id": "1354",
            "tableName": "table16",
            "locationId": "aH43yx2",
            "uri": "https://sandbox.doshii.co/partner/v3/tables/table16"
        }
    },
    table_deleted: {
        "event": "table_deleted",
        "data": {
            "id": "1354",
            "tableName": "table16",
            "locationId": "aH43yx2"
        }
    },
    table_bulk_updated: {
        "event": "table_bulk_updated",
        "data": {
            "locationId": "aH43yx2",
            "uri": "https://sandbox.doshii.co/partner/v3/tables"
        }
    },
    table_updated: {
        "event": "table_updated",
        "data": {
            "id": "1354",
            "tableName": "table16",
            "locationId": "aH43yx2",
            "uri": "https://sandbox.doshii.co/partner/v3/tables/table16"
        }
    },
    card_activate: {
        "event": "card_activate",
        "data": {
            "id": "1354",
            "locationId": "aH43yx2",
            "status": "pending",
            "posTerminalId": "23fd46",
            "requestData": {
                "cardRef": "1234-5678-9012",
                "amount": "2500",
                "cardAuthorisationKey": "1234",
                "cardProviderAuthId": "username",
                "cardProviderAuthPassword": "password"
            },
            "uri": "https://sandbox.doshii.co/partner/v3/loyalty/cards/activation/1354"
        }
    },
    card_enquiry: {
        "event": "card_enquiry",
        "data": {
            "id": "1354",
            "locationId": "aH43yx2",
            "status": "pending",
            "posTerminalId": "23fd46",
            "requestData": {
                "cardRef": "1234-5678-9012",
                "cardAuthorisationKey": "1234",
                "cardProviderAuthId": "username",
                "cardProviderAuthPassword": "password"
            },
            "uri": "https://sandbox.doshii.co/partner/v3/loyalty/cards/enquiry/1354"
        }
    },
    order_preprocess: {
        "event": "order_preprocess",
        // Event - rejected order
        "data1": {
          "id": "f77011a6-f4f9-4fe7-ba75-5319c3e59916",
          "status": "rejected",
          "locationId": "2xYdsw233",
          "rejectionCode": "O1",
          "rejectionReason": "Unknown item"
        },
        // Event - completed order
        "data2": {
            "id": "f77011a6-f4f9-4fe7-ba75-5319c3e59916",
            "status": "complete",
            "locationId": "2xYdsw233",
            "posAdjusted": true,
            "validUntil": null,
            "order": {
              "type":"pickup",
              "surcounts": [],
              "items":[{
                "name":"Toasted Sourdough Bread & Eggs",
                "description":"Just ye old classic",
                "unitPrice":"1100",
                "totalBeforeSurcounts":"1100",
                "totalAfterSurcounts":"1100",
                "posId":"toasted_eggs",
                "quantity":1,
                "type": "single", 
                "surcounts": [],
                "options": []
              }]
            }
          }
    },
    location_subscription: {
        "event": "location_subscription",
        "data": {
            "id": "aH43yx2",
            "locationId": "aH43yx2",
            "mappedLocationId": "1354",
            "status": "subscribed",
            "uri": "https://sandbox.doshii.co/partner/v3/locations/aH43yx2"
        }
    }
}

    // subscribe to location
  // doshii.Locations.subscribe({locationId: '8KXM0OD4'}).then((result) =>{
  //   console.log(result)
  // })

  // create order
  // doshii.Orders.create({
  //   ...createOrder.BASE,
  //   doshiiLocationId: '8KXM0OD4',
    
  //   order: {
  //     ...createOrder.BASE.order,
  //     ...{
  //       items: [{
  //           ...createOrder.ORDER_ITEM,
  //           name: 'Schnitzel Roll',
  //           unitPrice: '200',
  //           totalBeforeSurcounts: '200',
  //           totalAfterSurcounts: '200',
  //           posId: '0000000026'
  //         }]
  //     }
  //   },
  //   transactions: [{
  //     ...createOrder.TRANSACTION,
  //     amount: '500'
  //   }]
  // }).then((result) => {
  //   console.log(result)
  // })
  
  // cancel order and transactions
  // doshii.Orders.retrieveOne({
  //   doshiiLocationId: '8KXM0OD4',
  //   orderId: '127312'
  // }).then((result) => {
  //   let versionId = result.version;
  //   doshii.Orders.update({
  //     doshiiLocationId: '8KXM0OD4',
  //     orderId: '127312',
  //     version: versionId,
  //     status: 'cancelled'
  //   }).then((nextresult) => {
  //     let transactions = [];
  //     nextresult.transactions.map((val) => {
  //       transactions.push({
  //         version: val.version, 
  //         amount: val.amount, 
  //         id: val.id
  //       });
  //     })

  //     transactions.map((data) => {
  //       doshii.Transactions.update({
  //         doshiiLocationId: '8KXM0OD4',
  //         transactionId: data.id,
  //         status: 'cancelled',
  //         version: data.version
  //       }).then((other_result) => {
  //         console.log('end', other_result)
  //       })
  //    })
  //     console.log(nextresult);
  //   })
  // })
  
  // create order with bundle item
  // doshii.Orders.create({
  //   ...createOrder.BASE,
  //   doshiiLocationId: '8KXM0OD4',
    
  //   order: {
  //     ...createOrder.BASE.order,
  //     ...{
  //       items: [{
  //           ...createOrder.ORDER_ITEM,
  //           name: 'Kids Meal',
  //           type: 'bundle',
  //           unitPrice: '1500',
  //           totalBeforeSurcounts: '1500',
  //           totalAfterSurcounts: '1500',
  //           posId: '0000000276',
  //           includedItems: [{
  //             ...createOrder.INCLUDED_ITEMS,
  //             name: 'Toast',
  //             posId: '0006583',
  //             unitPrice: '400'
  //           }]
  //         }]
  //     }
  //   },
  //   transactions: [{
  //     ...createOrder.TRANSACTION,
  //     amount: '500'
  //   }]
  // }).then((result) => {
  //   console.log(result)
  // })
  // create checkins
  // doshii.Checkins.create({
  //   doshiiLocationId: '8KXM0OD4',
  //   tableNames: ['table5'],
  //   ref: 'External checkin id from originating system',
  //   covers: '3',
  //   checkTables: false
  // }).then((result) => {
  //   console.log(result);
  // })
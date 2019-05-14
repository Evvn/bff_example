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
            id: '',
            locationId: '',
            status: '',
            uri: ''
        }
    },
    order_updated: {
        event: 'order_updated',
        data: {
            id: "",
            orderId: "",
            locationId: "",
            status: "",
            posRef: "",
            posTerminalId: "",
            requestData: {
                accountId: "",
                expiryDate: ""
            },
            uri: ""
        }
    },
    transaction_updated: {
        event: 'transaction_updated',
        data: {
            id: "",
            orderId: "",
            locationId: "",
            status: "",
            posRef: "",
            posTerminalId: "",
            verifyData: {
                imageUri: ""
            },
            uri: ""
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
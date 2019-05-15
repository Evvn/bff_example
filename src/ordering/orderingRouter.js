const orderingRouter = (services, router) => {
  const {
    orderingService,
  } = services;

  router.get('/ordering/menu/:venueName', (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { venueName } = request.params;
      orderingService.getOrderMenuData({
        context: {
          authorizationToken,
          requestId,
          venueName,
        },
        onSuccess: (payload) => {
          response.json(payload);
        },
        onFailure: next,
      });
  });

  router.post('/ordering/payment', (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    orderingService.makeStripeCharge({
      context: {
        body: request.body
      },
      onSuccess: (payload) => {
        response.json(payload);
      },
      onFailure: next,
    });
  });

  router.post('/ordering/sms', (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    orderingService.sendSms({
      context: {
        body: request.body
      },
      onSuccess: (payload) => {
        response.json(payload);
      },
      onFailure: next,
    });
  });

  router.post("/ordering/doshii/:locationId/subscribe", (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { locationId } = request.params;
    orderingService.doshii_SubscribeLocation({
      context: {
        doshiiLocationId: locationId
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });
  });

  router.post("/ordering/doshii/:locationId/unsubscribe", (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { locationId } = request.params
    orderingService.doshii_UnsubscribeLocation({
      context: {
        doshiiLocationId: locationId
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });
  });

  router.post("/ordering/:locationId/createOrder", (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { locationId } = request.params
	  console.log(request.body);
    orderingService.doshii_createOrder({
      context: {
        doshiiLocationId: locationId,
        body: request.body
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });
  });

  router.put("/ordering/doshii/:locationId/cancelOrder/:orderId", (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { locationId, orderId } = request.params;
    orderingService.doshii_cancelOrder({
      context: {
        doshiiLocationId: locationId,
        orderId: orderId
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });
  });

  router.post("/ordering/doshii/:locationId/createCheckin", (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { locationId } = request.params
    orderingService.doshii_createCheckin({
      context: {
        doshiiLocationId: locationId,
        body: request.body
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });
  });

  router.put("/ordering/doshii/:locationId/cancelCheckin/:checkinId", (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { locationId, checkinId } = request.params
    orderingService.doshii_cancelCheckin({
      context: {
        doshiiLocationId: locationId,
        checkinId: checkinId,
        body: request.body
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });
  });

  router.post("/ordering/webhook", (request, response, next) => {
    console.log('did a thing here is teh body', request.body, 'and just incase', JSON.stringify(request.body));
    const { verify } = request.query;
		console.log("TCL: orderingRouter -> verify", verify)
    response.json(verify);
  });
  
  router.post("/ordering/createhook/:event", (request, response, next) => {
    const { event } = request.params;
    orderingService.doshii_create_webhook({
      context: {
        event,
        webhookUrl: 'https://api.mryumqa.com.au:5000/yumbff/ordering/webhook'
      },
      onSuccess: payload => {
        response.json(payload)
      },
      onFailure: next
    });
  });

  router.delete("/ordering/cancelhook/:event", (request, response, next) => {
    const { event } = request.params;
    orderingService.doshii_delete_webhook({
      context: {
        event,
      },
      onSuccess: payload => {
        response.json(payload)
      },
      onFailure: next
    });
  });

  // busted ask doshii peeps wuts up
  router.get("/ordering/gethooks", (request, response, next) => {
    orderingService.doshii_get_webhook({
      context: {},
      onSuccess: payload => {
        response.json(payload)
      },
      onFailure: next
    });
  });

  return router;
};

export default orderingRouter;

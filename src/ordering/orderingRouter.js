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

  router.post("/ordering/doshii/:locationId/createOrder", (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { locationId } = request.params
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

  return router;
};



export default orderingRouter;

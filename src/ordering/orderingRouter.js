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

  return router;
};

export default orderingRouter;

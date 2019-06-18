const orderingRouter = (services, router) => {
  const { orderingService } = services;

  router.get("/ordering/menu/:venueName", (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { venueName } = request.params;
    orderingService.getOrderMenuData({
      context: {
        authorizationToken,
        requestId,
        venueName
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });
  });

  router.post("/ordering/payment", (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    orderingService.makeStripeCharge({
      context: {
        body: request.body
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });
  });

  router.post("/ordering/sms", (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    orderingService.sendSms({
      context: {
        body: request.body
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });
  });

  // further doshii documentation at https://support.doshii.io/hc/en-us/categories/115000413493-Partner-App-API
  // subscribes to a location with the provided locationId
  router.post(
    "/ordering/doshii/:locationId/subscribe",
    (request, response, next) => {
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
    }
  );

  // unsubscribes from a location with the provided locationId
  router.post(
    "/ordering/doshii/:locationId/unsubscribe",
    (request, response, next) => {
      const { authorizationToken, requestId } = response.locals;
      const { locationId } = request.params;
      orderingService.doshii_UnsubscribeLocation({
        context: {
          doshiiLocationId: locationId
        },
        onSuccess: payload => {
          response.json(payload);
        },
        onFailure: next
      });
    }
  );

  // Creates an order for the provided locationId
  // Note: will also create transactions
  router.post(
    "/ordering/:locationId/createOrder",
    (request, response, next) => {
      const { authorizationToken, requestId } = response.locals;
      const { locationId } = request.params;
      // console.log(request.body);
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
    }
  );

  // Updates an order and its' transactions statuses to cancelled
  router.put(
    "/ordering/doshii/:locationId/cancelOrder/:orderId",
    (request, response, next) => {
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
    }
  );

  router.get(
    "/ordering/doshii/:locationId/orders",
    (request, response, next) => {
      const { authorizationToken, requestId } = response.locals;
      const { locationId, orderId } = request.params;
      orderingService.doshii_getAllOrders({
        context: {
          doshiiLocationId: locationId
        },
        onSuccess: payload => {
          response.json(payload);
        },
        onFailure: next
      });
    }
  );

  router.get(
    "/ordering/doshii/:locationId/order/:orderId",
    (request, response, next) => {
      const { authorizationToken, requestId } = response.locals;
      const { locationId, orderId } = request.params;
      orderingService.doshii_getOrder({
        context: {
          doshiiLocationId: locationId,
          orderId: orderId
        },
        onSuccess: payload => {
          response.json(payload);
        },
        onFailure: next
      });
    }
  );

  // creates a table checkin for the supplied locationId
  router.post(
    "/ordering/doshii/:locationId/createCheckin",
    (request, response, next) => {
      const { authorizationToken, requestId } = response.locals;
      const { locationId } = request.params;
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
    }
  );

  // suppose to cancel a checkin, but table verification can't be disabled
  // see - https://sandbox-dashboard.doshii.io/docs/api/app#/Check-Ins/updateCheckin
  // for possible fix
  router.put(
    "/ordering/doshii/:locationId/cancelCheckin/:checkinId",
    (request, response, next) => {
      const { authorizationToken, requestId } = response.locals;
      const { locationId, checkinId } = request.params;
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
    }
  );

  // this route is called by the webhook whenever a event takes place
  // Note: needs to be fleshed out with business logic to handle each event type
  //  and their respective payloads
  // Also needs to respond with a hash from verify query string to complete the
  // webhook registration process
  router.post("/ordering/webhook", (request, response, next) => {
    const { verify } = request.query;
    // console.log(request.body);
    const body = request.body.body ? request.body.body : request.body;
    console.log("##Webhook caught: ", body);
    orderingService.doshii_catch_webhook({
      context: {
        ...body
      },
      onSuccess: payload => {
        // console.log("payload:", payload);
        //response.json(payload);
      },
      onFailure: next
    });

    response.json(verify);
  });

  router.post("/ordering/webhook/self", (request, response, next) => {
    const { verify } = request.query;
    // console.log(request.body);
    const body = request.body.body ? request.body.body : request.body;
    // console.log("##Webhook caught: ", body);
    orderingService.doshii_catch_webhook({
      context: {
        ...body
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });

    response.json(verify);
  });

  // registers a webhook for the specified event type such as "order_created"
  // also need to supply a route from the bff for the webhook to call on that event
  router.post("/ordering/createhook/:event", (request, response, next) => {
    const { event } = request.params;
    orderingService.doshii_create_webhook({
      context: {
        event,
        webhookUrl: "https://api.mryumqa.com.au:5000/yumbff/ordering/webhook"
      },
      onSuccess: payload => {
        // console.log("payload: ", payload);
        response.send("Success");
      },
      onFailure: next
    });
  });

  // deletes the webhook of a specified event type such as "order_created"
  router.delete("/ordering/cancelhook/:event", (request, response, next) => {
    const { event } = request.params;
    orderingService.doshii_delete_webhook({
      context: {
        event
      },
      onSuccess: payload => {
        response.json(payload);
      },
      onFailure: next
    });
  });

  // fetches an array containing information about all registered webhooks
  // Note: registered webhooks apply globally to all locations
  //  the locationId parameter is just required for the header in doshii-sdk
  router.get("/ordering/gethooks/:locationId", (request, response, next) => {
    const { locationId } = request.params;
    orderingService.doshii_get_webhook({
      context: {
        doshiiLocationId: locationId
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

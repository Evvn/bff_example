import bodyParser from 'body-parser'

const menuRouter = (services, router) => {
  const {
    menuService,
  } = services;

  const requestType = 'airtable';

  router.get('/menu/:venueName', (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { venueName } = request.params;
    const {
      intents, params,
    } = request.body;
      menuService.getMenuData({
        context: {
          authorizationToken,
          requestId,
          intents,
          params,
          requestType,
          venueName,
        },
        onSuccess: (payload) => {
          response.json(payload);
        },
        onFailure: next,
      });
  });

  router.post('/venues', bodyParser.json(), (request, response, next) => {
    const { authorizationToken, requestId } = response.locals;
    const { venueName } = request.params;
    const {
      category,
    } = request.body;
      menuService.getVenueList({
        context: {
          authorizationToken,
          requestId,
          category,
          requestType,
        },
        onSuccess: (payload) => {
          response.json(payload);
        },
        onFailure: next,
      });
  });

  return router;
};

export default menuRouter;

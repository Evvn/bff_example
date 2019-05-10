import createOrderingRouter from './orderingRouter';
import createOrderingService from './orderingService';
import doshiiTransformer from './transformers/doshiiTransformer';
import orderMenuTransformer from './transformers/orderMenuTransformer';

const initializeOrderingModule = (extractor, router) => {
  const orderingService = createOrderingService(
    { doshiiTransformer,
      orderMenuTransformer,
    },
    extractor,
  );

  const orderingRouter = createOrderingRouter(
    {
      orderingService,
    },
    router,
  );

  return orderingRouter;
};

export default initializeOrderingModule;

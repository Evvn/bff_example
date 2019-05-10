import createMenuRouter from './menuRouter';
import createMenuService from './menuService';
import airtableTransformer from './airtableTransformer';

const initializeMenuModule = (extractor, router) => {
  const menuService = createMenuService(
    airtableTransformer,
    extractor,
  );

  const menuRouter = createMenuRouter(
    {
      menuService,
    },
    router,
  );

  return menuRouter;
};

export default initializeMenuModule;

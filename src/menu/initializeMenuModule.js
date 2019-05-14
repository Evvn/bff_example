import createMenuRouter from './menuRouter';
import createMenuService from './menuService';
import menuTransformer from './menuTransformer';

const initializeMenuModule = (extractor, router) => {
  const menuService = createMenuService(
    menuTransformer,
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

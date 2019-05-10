const noAuthenticationMiddleware = (req, res, next) => {
  next();
};

export default noAuthenticationMiddleware;

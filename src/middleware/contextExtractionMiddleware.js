import uuid from 'uuid/v4';

const extractBearerToken = (request) => {
  const authHeader = request.get('Authorization') || '';
  return authHeader.replace('bearer ', '');
};

const extractRequestId = (request) => {
  const requestId = request.get('x-myobapi-requestid') || `BFF-GENERATED-${uuid()}`;
  return requestId;
};

const contextExtractionMiddlware = (req, res, next) => {
  res.locals.authorizationToken = extractBearerToken(req);
  res.locals.requestId = extractRequestId(req);
  next();
};

export default contextExtractionMiddlware;

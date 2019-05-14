// eslint-disable-next-line import/prefer-default-export
const doshiiTransformer = {
  testOrdering: data => data,
  subscribe: data => data,
  unsubscribe: data => data,
  createOrder: data => data,
  cancelOrder: data => data,
  createCheckin: data => data,
  cancelCheckin: data => data,
  createWebhook: data => data,
};

export default doshiiTransformer;

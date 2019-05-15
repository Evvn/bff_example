import checkins from './doshiiMapping/checkins.js';
import locations from './doshiiMapping/locations.js';
import members from './doshiiMapping/members.js';
import orders from './doshiiMapping/orders.js';
import reservations from './doshiiMapping/reservations.js';
import rewards from './doshiiMapping/rewards.js';
import tables from './doshiiMapping/tables.js';
import transactions from './doshiiMapping/transactions.js';
import webhook from './doshiiMapping/webhook.js';

const doshiiMapping = {
  ...checkins,
  ...locations,
  ...members,
  ...orders,
  ...reservations,
  ...rewards,
  ...tables,
  ...transactions,
  ...webhook,
};

export default doshiiMapping;

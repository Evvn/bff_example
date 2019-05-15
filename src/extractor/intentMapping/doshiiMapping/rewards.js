import doshiiConnector from '@mryum/doshii-sdk';

const doshii = doshiiConnector({
    clientId: process.env.DOSHII_CLIENT_ID,
    clientSecret: process.env.DOSHII_CLIENT_SECRET,
    env: 'sandbox',
    version: 'v3',
    silent: false
  });

const rewards = {
    [intents.RETRIEVE_ALL_REWARDS]: params => doshii.Rewards.retrieveAll(params),
    [intents.RETRIEVE_REWARD]: params => doshii.Rewards.retrieveOne(params),
    [intents.CREATE_REWARD]: params => doshii.Rewards.create(params),
    [intents.UPDATE_ALL_REWARDS]: params => doshii.Rewards.updateAll(params),
    [intents.UPDATE_REWARD]: params => doshii.Rewards.update(params),
    [intents.REMOVE_REWARD]: params => doshii.Rewards.remove(params),
    [intents.ACCEPT_REWARD]: params => doshii.Rewards.accept(params),
    [intents.REJECT_REWARD]: params => doshii.Rewards.reject(params),
    [intents.ACCEPT_REWARD_POINTS]: params => doshii.Rewards.acceptPoints(params),
    [intents.REJECT_REWARD_POINTS]: params => doshii.Rewards.rejectPoints(params),
  };

  export default rewards;
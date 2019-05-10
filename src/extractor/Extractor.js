import RootMapping from './intentMapping/rootMapping';

const read = ({ intents, onSuccess, onFailure, context, params }) => {
  const { requestType } = context;
    RootMapping[intents[0]](context, onSuccess, onFailure)
};

const Extractor = {
  readMany: read,
  readManyBuffer: read,
  getUrl: read,
  write: ({
    intent, params, onSuccess, onFailure, additionalHeaders,
  }) => {
    try {

    } catch (error) {
      onFailure(error);
    }
  },
};

export default Extractor;

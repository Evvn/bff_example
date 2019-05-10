import doshiiMapping from './doshiiMapping';
import menuMapping from './menuMapping';
import orderMapping from './orderMapping';

const RootMapping = Object.freeze({
  ...doshiiMapping,
  ...menuMapping,
  ...orderMapping,
});

export default RootMapping;

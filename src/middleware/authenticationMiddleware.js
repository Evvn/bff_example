import getPassportAuthentication from '../authentication/getPassportAuthentication';

const authenticationMiddleware = getPassportAuthentication();

export default authenticationMiddleware;

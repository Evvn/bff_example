/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
import cors from 'cors';
import express from 'express-es7';
import logger from 'morgan';
import contextExtractionMiddleware from './middleware/contextExtractionMiddleware';
import excludePaths from './middleware/pathExclusionMiddleware';
import initializeOrderingModule from './ordering/initializeOrderingModule';
import initializeMenuModule from './menu/initializeMenuModule';
import Extractor from './extractor/Extractor';
import AuthenticationMiddleware from './middleware/authenticationMiddleware';
import NoAuthenticationMiddleware from './middleware/noAuthenticationMiddleware';

const authenticationMiddleware = process.env.AUTHENTICATION_TYPE === 'authentication' ? AuthenticationMiddleware : NoAuthenticationMiddleware;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

const unAuthenticatedPaths = ['/health', '/ready'];
app.use(excludePaths(unAuthenticatedPaths)(authenticationMiddleware));
const noContextPaths = ['/health', '/ready'];
app.use(excludePaths(noContextPaths)(contextExtractionMiddleware));

app.get('/health', (req, res) => res.send('ok'));
app.get('/ready', (req, res) => res.send('ok'));

const router = express.Router({
  mergeParams: true,
});

app.use('/yumbff', initializeOrderingModule(Extractor, router));
app.use('/yumbff', initializeMenuModule(Extractor, router));

// error handler
app.use((err, req, res, next) => { //eslint-disable-line
  console.log('*', err.message);
  res.status(err.status || 500);
  // res.statusMessage(`${err.message}` || 'A system error occurred!');
  res.send({ message: `${err.message}` } || { message: 'A system error occurred!' })
});

// 404 handler
app.use((req, res, next) => { //eslint-disable-line
  res.status(404).json({ message: 'Not Found. The resource you are looking for does not exist!' });
});

export default app;

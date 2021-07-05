import app from './app';
import config from './config';
import http from 'http';

/**
 * Listen on provided port, on all network interfaces.
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(config.PORT || '4000');

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Server listening on port ' + port);
});

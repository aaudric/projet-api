import http from 'node:http';
import app from './app.js';
import 'dotenv/config';

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

server.listen(port);

server.on('listening', () => {
  const addr = server.address();
  console.log(`Listening on port ${addr.port}`);
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': {
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    }
    case 'EADDRINUSE': {
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    }
    default:
      throw error;
  }
});

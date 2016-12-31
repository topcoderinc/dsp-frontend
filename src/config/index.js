/* eslint-disable import/no-commonjs */
/**
 * Main config file for the react app
 */
module.exports = {
  api: {
    basePath: process.env.REACT_APP_API_BASE_PATH || 'http://localhost:3500',
  },
  socket: {
    url: process.env.REACT_APP_SOCKET_URL || 'http://localhost:3500',
  },
  AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID || 'h7p6V93Shau3SSvqGrl6V4xrATlkrVGm',
  AUTH0_CLIENT_DOMAIN: process.env.REACT_APP_AUTH0_CLIENT_DOMAIN || 'spanhawk.auth0.com',
  AUTH0_CALLBACK: 'http://localhost:3000',
  
};

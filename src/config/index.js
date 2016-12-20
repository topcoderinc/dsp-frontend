/**
 * Copyright (c) 2016 Topcoder Inc, All rights reserved.
 */

/**
 * Webapp configuration
 *
 * @author       TCSCODER
 * @version      1.0.0
 */

const config = {
  api: {
    basePath: process.env.REACT_APP_API_BASE_PATH || 'http://localhost:3500',
  },
  socket: {
    url: process.env.REACT_APP_SOCKET_URL || 'http://localhost:3500',
  },
  AUTH0_CLIEND_ID: process.env.REACT_APP_AUTH0_CLIEND_ID || '3CGKzjS2nVSqHxHHE64RhvvKY6e0TYpK',
  AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN || 'dronetest.auth0.com',
};

export default config;

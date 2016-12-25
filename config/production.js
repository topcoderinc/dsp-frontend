/* eslint-disable import/no-commonjs */
/**
 * config file for production environment
 */
module.exports = {
  // below env variables are NOT visible in frontend
  PORT: process.env.PORT || 3000,

  // below env variables are visible in frontend
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || 'AIzaSyCrL-O319wNJK8kk8J_JAYsWgu6yo5YsDI',
};

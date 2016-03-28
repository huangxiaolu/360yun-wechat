'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: 'share',
      user: 'root',
      password: '',
      prefix: '360CTA_',
      encoding: 'utf8'
    }
    // mysql: {
    //   host: '10.120.253.177',
    //   port: '3474',
    //   database: 'songguangyu',
    //   user: 'songguangyu',
    //   password: 'Songguangyu2015',
    //   prefix: '360CTA_',
    //   encoding: 'utf8'
    // }
  }
};
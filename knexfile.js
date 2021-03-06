require('dotenv').load();

module.exports = {
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || require('./.env'),
    ssl: false,
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './seeds/'
    }
  }
};

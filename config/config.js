// config.js
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  secret: process.env.SECRET,
  port: process.env.PORT || 5000,
  db: { // Konfigurasi database yang disederhanakan
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: process.env.DB_DRIVER || 'postgres',
    logging: process.env.DB_LOGGING === 'true', // Atau fungsi
  },
};

module.exports = config;
// database.js
const { Sequelize } = require('sequelize');
const config = require('./config');

const dbConfig = config.db;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  logging: dbConfig.logging ? console.log : false, // Lebih baik
  dialectOptions: {
    timezone: 'Asia/Jakarta',
  },
  define: {
    timestamps: true,
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { db: dbConfig, sequelize };
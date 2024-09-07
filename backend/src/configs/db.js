//PostgreSQL Connection and configuration

const { Sequelize } = require('sequelize');

const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;
const dbName = process.env.DATABASE_NAME;

const database = new Sequelize(dbName, username, password, {
    host,
    dialect: 'postgres',
    port: dbPort
  });
  
  module.exports = {
    database
  }
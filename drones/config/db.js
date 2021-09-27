require('dotenv').config()

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE
});

module.exports = sequelize;

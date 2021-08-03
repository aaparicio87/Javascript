const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Cars = require('./Cars');
const PriceRents = require('./PriceRents');
const Users = require('./Users');

const CarRents = db.define('CarRents', {

    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    in_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },

    out_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4 
    }
  },{
    tableName: 'CarRents'
  });

  CarRents.belongsTo(Cars);
  CarRents.belongsTo(PriceRents);
  CarRents.belongsTo(Users);

  module.exports = CarRents;
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const PriceRents = db.define('PriceRents', {

    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    price_rent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
    tableName: 'PriceRents'
  });

  module.exports = PriceRents;
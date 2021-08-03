const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const Colors = require('./Colors');
const Brands = require('./Brands');

const Cars = db.define('Cars', {

    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    possession_years: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    image: {
        type: DataTypes.STRING,
        allowNull:false
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
    tableName: 'Cars'
  });

  Cars.belongsTo(Colors);
  Cars.belongsTo(Brands);
  module.exports = Cars;
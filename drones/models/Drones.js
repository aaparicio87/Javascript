const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const Medications = require('./Medications');


const Drones = db.define('Drones', {

    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    serial: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },

    model: {
        type: DataTypes.ENUM('Lightweight', 'Middleweight', 'Cruiserweight','Heavyweight'),
        allowNull: false
    },

    weight_limit: {
        type: DataTypes.DOUBLE,
        allowNull:false,
        validate: {
            max: 500,
        }
    },

    battery_capacity: {
        type: DataTypes.FLOAT,
        allowNull:false
        
    },

    state: {
        type: DataTypes.ENUM('IDLE','LOADING','LOADED','DELIVERING','DELIVERED','RETURNING'),
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
    tableName: 'Drones'
  });

  Drones.hasMany(Medications, {
    as: 'medications',
    foreignKey: 'medicationId'
  });
  Medications.belongsTo(Drones, {
       as: 'drone', 
       foreignKey: 'droneId'
  });

  module.exports = Drones;
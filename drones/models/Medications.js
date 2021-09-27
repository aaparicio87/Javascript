const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Medications = db.define('Medications', {

    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /[a-z0-9_-]+$/i
        }
    },

    weight: {
      type: DataTypes.DOUBLE,
      allowNull:false,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /[A-Z0-9_]+$/i
      }
  },
  image: {
    type: DataTypes.STRING,
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
    tableName: 'Medications'
  });

  module.exports = Medications;
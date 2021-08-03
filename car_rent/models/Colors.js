const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Colors = db.define('Colors', {

    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: "Name must containg only letters"
            },
            len: {
                args: [2, 255],
                msg: "The name must contain minimun 2 characters"
            }
        }
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
    tableName: 'Colors'
  });

  module.exports = Colors;
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Users = db.define('Users', {

    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    firstName: {
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
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: "Name must containg only letters"
            },
            len: {
                args: [2, 255],
                msg: "The last name must contain minimun 2 characters"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [8, 255],
                msg: "The password must contain minimun 8 characters"
            }
        }
    },
    admin: DataTypes.BOOLEAN,
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
  },{
    tableName: 'Users'
  });

  module.exports = Users;
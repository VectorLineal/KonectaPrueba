const { DataTypes } = require('sequelize');
const { database } = require('../configs/db');

const Employee = database.define('Employee', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    joinDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, { tableName: 'employees' });

  module.exports = { Employee };
  
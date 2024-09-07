const { DataTypes } = require('sequelize');
const { database } = require('../configs/db');
const { Employee } = require("./Employee");

const Request = database.define('Request', {
    code: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sumary: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, { tableName: 'requests' });

  Employee.hasMany(Request, {
    as: 'request',
    foreignKey: 'employeeId',
    onDelete: 'CASCADE'
  });
  Request.belongsTo(Employee, {
    foreignKey: "employeeId",
  });

  module.exports = { Request };
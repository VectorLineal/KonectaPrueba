const { DataTypes } = require('sequelize');
const { database } = require('../configs/db');
const { Employee } = require("./Employee");

const User = database.define('User', {
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { tableName: 'users' });

  Employee.hasOne(User, {
    as: 'user',
    foreignKey: 'employeeId',
    onDelete: 'CASCADE'
  });
  User.belongsTo(Employee, {
    foreignKey: "employeeId",
  });

  module.exports = { User };
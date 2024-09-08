const { DataTypes } = require('sequelize');
const { database } = require('../configs/db');
const { Employee } = require("./Employee");

const User = database.define('User', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn: [['empleado', 'administrador']]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { tableName: 'users' });

  Employee.hasOne(User, {
    as: 'user',
    foreignKey:{
      name: 'employeeId',
      allowNull: false
    },
    onDelete: 'CASCADE'
  });
  User.belongsTo(Employee, {
    foreignKey: "employeeId",
  });

  module.exports = { User };
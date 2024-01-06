const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'  // or 'mysql', 'sqlite', etc.
});

module.exports = sequelize;

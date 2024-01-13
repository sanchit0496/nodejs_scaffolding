const Sequelize = require('sequelize');
const sequelize = new Sequelize('development', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

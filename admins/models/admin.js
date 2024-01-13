const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    age: Sequelize.INTEGER
});

module.exports = User;
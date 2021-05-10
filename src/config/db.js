const { Sequelize } = require('sequelize')
const config = require('dotenv').config();

module.exports = new Sequelize(
    config.parsed.DB_NAME,
    config.parsed.DB_USER,
    config.parsed.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: config.parsed.DB_HOST,
    }
)
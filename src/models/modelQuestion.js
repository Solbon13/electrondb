const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')

const Question = sequelize.define('question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    question: {type: DataTypes.STRING, unique: true,},
    answer: {type: DataTypes.STRING, unique: true},
    solutionOption: {type: DataTypes.STRING, unique: true},
    level: {type: DataTypes.INTEGER, unique: true},
})

module.exports = {
    Question
} 
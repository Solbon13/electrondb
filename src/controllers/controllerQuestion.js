const { Notification } = require('electron')
const { Question } = require('../models/modelQuestion')

class controllerQuestion {
    async create(data) {
        const {question, answer, solutionOption} = data
        try {
            const result = await Question.create({question, answer, solutionOption})
            return result
        } catch (error) {
            new Notification({
                title: 'title',
                body: error.message
            }).show()
            return error   
        }
        
    }

    async getAll() {
        try {
            const results = await Question.findAll({raw:true})
            return results
        } catch (error) {
            new Notification({
                title: 'title',
                body: error.message
            }).show()
            return error    
        }
        
    }
}

module.exports = new controllerQuestion()
const { remote } = require('electron')
const electronMain = remote.require('./electronMain')

let question, gamesLevel, answerUser
let coin = rating = questionNumber = 0
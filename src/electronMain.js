const { BrowserWindow } = require('electron')
const sequelize = require('./config/db')
const { Question } = require('./models/modelQuestion')
const controllerQuestion = require('./controllers/controllerQuestion')

sequelize.sync().then(result=>{
  console.log(result);
})
.catch(err=> console.log(err));

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
    }
  })
  win.loadFile('src/ui/index.html')
}

async function getQuestion() {
  return await controllerQuestion.getAll()
}

//нужно сделать оповещение
async function createQuestion(data) {
  return await controllerQuestion.create(data)
}

module.exports = {
    createWindow,
    getQuestion,
    createQuestion
}
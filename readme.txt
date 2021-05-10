npm init -y // чтоб поинициализировать node
npm i electron // установка electron
в package.json установим скрипт запуска //"start": "electron ." 
также установим страницу запуска //"main": "src/index.js", // точка входа 
создадим папку src и в нем файлы index (точка входа в приложение) electronMain (файл electron)
создадим папку config и нем файл db.js // для коннекта в БД
создадим папку ui и в нем файл index.html (страница отображения или интерфейс)
ну и конечно файл стилей как-же без него index.css
создадим js файл app.js (для взаимодействия с electron)
файл js для главного окна main.js
файл js для роутера route.js
еще дополнительно создадим папки models (для описания таблиц БД) и controllers (для взаимодействия с БД)
npm install --save sequelize // установим sequelize для облегчения работы с БД
npm install --save mysql2 // установим для работы с СУБД mysql
пока вроде все с пакетами и файлами
если понадобится дополнительные файлы будем создавать по мере необходимости
также как и с пакетами
начнем с самого простого
это html документ переходим в него и сделаем стандартную разметку с помощью emmet ! и tab
в body запишем любой текст для того чтобы увидеть что он подгрузился
теперь переходим в electronMain.js
подключаем модуль BrowserWindow из библиотеки electron для создания и управления окнами браузера
const { BrowserWindow } = require('electron')
объявляем функцию по созданию окна
с указанием высоты ширины и указываем какой файл загрузить в окно
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  win.loadFile('src/ui/index.html')
}
экспортируем функцию для возможности использовать в других файлах
module.exports = {
    createWindow
}
кстати давайте предварительно проверим работу нашего приложения
в index.js пропишем console.log('Hello world!')
и запустим команду npm start
в консоли прописалось Hello world это означает что приложение работает
для выхода (остановки) приложения нажмем Ctrl+C
теперь когда мы убедились что приложение работает изменим содержимое файла index.js
подключим нашу ранее созданную функцию createWindow из файла electronMain
const {createWindow} = require('./electronMain')
также подключим app из electron
const {app} = require('electron')
и вызовем функцию после инициализации окна
app.whenReady().then(createWindow)
пробуем запустить приложение
приложение запустилось полет нормальный
если открыть инструмент разработчика можно увидеть предупреждение
инструменты разработчика открываем View->Toggle Developer Tools
давайте попробуем его убрать и это повод причесать html файл
по рекомендации из документа по библиотеке electron добавим в заголок
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
также удалим не нужные meta тэги
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
после этих действий предупреждение исчезло
в html объявим div c id равный appHTML
сюда будем вставлять разметку из js файлов
и подключим файл app.js перед закрывающим тэгом body
в файле app.js запишем
console.log('app')
для проверки подключения файла и обновим окно приложения
для этого делаем активным окно и нажмем сочетание клавиш Ctrl+R
в консоли приложения отобразилось надпись app
консоль приложения это вкладка в инструментах разработчика
убедившись что файл app подключен
подключим остальные файлы js перед закрывающим тэгом body
это main
в app подключим библиотеку для взаимодействия UI с electron
const { remote } = require('electron')
если сейчас попытаться запустить приложение то в консоли будет ошибка
для исправления добавим в electronMain
webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
    }
после свяжем js файл electron c UI
const main = remote.require('./main')

приступим к структуре html
отрисуем в нем все окна обрамив их в div-ы
всем окнам кроме главного назначим в стилях display=none

затем найдем наши div-ы
сделаем это в js файле главного окна так как пробросится всё в последующие файлы
главное последовательность подключения файлов в html
пример
const appHTML = document.getElementById('appHTML')
также сразу напишем функцию отключения и включения звука т.е. паузы и запуска аудио файла
                      и реализуем функцию закрытия окна
сделаем роутеры в route.js
сделав функции скрытия и отображения div-ов
таким же образом оформим файл level создаем его лишь для того чтоб не запутаться в дальнейшем
с переходами разобрались
теперь проверим что UI видит electron
в файле electronMain создадим функцию с console.log
function hello() {
  console.log('www')
}
не забываем импортировать его
в файле setup.js создадим функцию
 function addClick() {
    electronMain.hello()
 }
перезапускаем и проверяем что все работает

возьмемся за БД
подключим в первую очередь пременные окружения
установим пакет npm i dotenv
затем с импортируем его
const config = require('dotenv').config();
обращение к полям через config.parsed)
возможно не верно но пока так
в файле db сделаем подключение к БД
const { Sequelize } = require('sequelize')
module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)
electronMain сделаем функцию проверки подключения к БД
function helloDB() {
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}
создадим таблицу в БД в файле modelQuestion
const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')
const Question = sequelize.define('question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    question: {type: DataTypes.STRING, unique: true,},
    answer: {type: DataTypes.STRING},
    solutionOption: {type: DataTypes.STRING},
})
module.exports = {
    Question
}
загрузим его в electronMain
const { Question } = require('./models/modelQuestion')
синхронизируем БД с приложением
sequelize.sync().then(result=>{
  console.log(result);
})
.catch(err=> console.log(err));
в controllerQuestion сделаем возможность добавления и выборки данных с БД
для этого подключим модель
const { Question } = require('../models/modelQuestion')
создадим класс для группировки
class controllerQuestion {

функцию создания
    async create(data) {
        const {question, answer, solutionOption} = data
        const result = await Question.create({question, answer, solutionOption})
        return result
    }
функцию выборки
    async getAll() {
        const results = await Question.findAll()
        console.log(results)
        return results
    }
}
и экспортируем класс
module.exports = new controllerQuestion()
в главном файле electronMain
импортируем контроллер
const controllerQuestion = require('./controllers/controllerQuestion')
создадим функцию
function getQuestion() {
  return controllerQuestion.getAll()
}
создадим функцию
function createQuestion(data) {
  console.log(controllerQuestion.create(data))
}
и не забываем экспортировать
в файле setup UI установим функцию
 function addClick() {
    const data = {
        question: newQuestion.value,
        answer: newAnswer.value,
        solutionOption: newSolutionOption.value,
    }
    electronMain.createQuestion(data)
 }
теперь у нас появилась возможность для добавления вопросов в БД
                    потом необходимо получать результат добавления

в games добавим функцию получения данных
async function getQuestion(params) {
    question = await electronMain.getQuestion()
    answerUser = ''
    fieldSecret.innerHTML = ''
    for (let char of question[0].answer) {
        fieldSecret.innerHTML += `
        <input
        type="text"
        class="secretSymbol secretCell"
        >`
    }
    secretCell = document.querySelectorAll('.secretCell');
    fieldQuestion.innerHTML = question[0].question
    fieldKey.innerHTML = ''
    for (let i = 0; i < question[0].solutionOption.length; i++) {
        fieldKey.innerHTML += `
        <input
        type="text"
        class="secretSymbol"
        onclick="keyClick(${i})" value=${question[0].solutionOption[i]}>`
    }
}
которая будет вызываться при выборе уровней //level

теперь реализуем логику первого уровня в games
function keyClick(i) {
    // alert(question[0].solutionOption[i])
    for(var j = 0; j < secretCell.length; j++) {
        if(secretCell[j].value === ''){
            answerUser += question[0].solutionOption[i]
            secretCell[j].value = question[0].solutionOption[i]
            if (j === secretCell.length - 1) {
                if (answerUser == question[0].answer){
                    alert('ВЫИГРЫШ')
                }else{
                    alert('ПРОИГРЫШ')
                }
            }
            break
        }
      }
}

также в главном окне main
сделаем перехват нажатия клавиши ESC
document.addEventListener('keydown', function(event) {
    if (event.code == 'Escape') {
      alert('Отменить!')
    }
  });

добавим перехват ошибок при работе с БД
        try {
            const result = await Question.create({question, answer, solutionOption})
            return result
        } catch (error) {
            new Notification({
                title: 'title',
                body: error.message
            }).show()    
        }
импортируем Notification для вывода информации
const { Notification } = require('electron')

реализуем меню в игре по кнопке ESC
document.addEventListener('keydown', function (event) {
    console.log(windowGames.style.display)
    if (event.code == 'Escape' && windowGames.style.display === "flex") {
        fieldQuestionESC.style.display = "flex"
        fieldQuestionKey.style.display = "none"
    }
});

реализуем пропуск вопросов
function skipClick() {
    question.length - 1 > questionNumber
    ? ++questionNumber
    : questionNumber = 0
    renderQuestion()
}

кнопку продолжить в меню игры
function proceedClick() {
    fieldQuestionESC.style.display = "none"
    fieldQuestionKey.style.display = "flex"
}

отделим запрос на сервер и перерисовку игрового поля

добавим очки при выигрыше +1

добавим монет с вероятностью 60%
let success = Math.floor((Math.random() * 100) + 1);
success < 61 && ++coin


забыл при правильном ответе переходить к следующему вопросу

убрать ответ пользователя с глобальных переменных и собирать слово в цикле вставки?


ЗАВТРА
при прохождения уровня отобразить окно результата
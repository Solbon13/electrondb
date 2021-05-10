const {createWindow} = require('./electronMain')
const {app} = require('electron')

app.whenReady().then(createWindow)
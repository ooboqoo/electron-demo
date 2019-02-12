const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', function createWindow () {
  mainWindow = new BrowserWindow()
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

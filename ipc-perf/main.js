const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow
let subWindow

app.on('ready', function createWindow () {
  mainWindow = new BrowserWindow()
  mainWindow.loadFile('pageMain.html')
  // mainWindow.webContents.openDevTools()

  subWindow = new BrowserWindow()
  subWindow.loadFile('pageSub.html')
  // subWindow.webContents.openDevTools()

  // 渲染进程间消息中转性能测试
  ipcMain.on('test-ipc-perf', (event, msg) => {
    if (!msg || !msg.dstId) { return }
    const win = BrowserWindow.fromId(msg.dstId)
    if (win) { win.webContents.send('test-ipc-perf', msg) }
  })

  mainWindow.focus()
  mainWindow.on('closed', () => {
    mainWindow = null
    subWindow.close()
    subWindow = null
  })
})

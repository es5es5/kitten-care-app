const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')

const isDev = process.env.IS_DEV == 'true' ? true : false

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'assets/512x512.png'),
    frame: false,
    width: 500,
    height: 500,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: false,
  })

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`,
  )
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  ipcMain.on('minimizeApp', () => {
    mainWindow.minimize()
  })
  ipcMain.on('maximizeApp', () => {
    // mainWindow.maximize()
  })
  ipcMain.on('setAlwaysOnTop', (event, value) => {
    console.log('setAlwaysOnTop', event, value)
    mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop())
    event.reply('setAlwaysOnTopResponse', mainWindow.isAlwaysOnTop())
  })
  ipcMain.on('closeApp', () => {
    mainWindow.close()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    console.log('app on activate')
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
    setTitleButtons()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log('app window-all-closed')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.whenReady().then(() => {
//   app.on('web-contents-created', (_, contents) => {
//     contents.on('new-window', (event, navigationUrl) => {
//       event.preventDefault()
//       const win = new BrowserWindow({ webContents: contents })
//       win.loadURL(navigationUrl)
//     })
//   })
// })

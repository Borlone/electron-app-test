// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const path = require('path')
require('update-electron-app')()

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: './assets/gchat.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // const contents = mainWindow.webContents;
  // console.log(contents);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // IPC: Renderer to main (one-way)
  // ipcMain.on('set-title', handleChangeTitle);

  // IPC: Renderer to main (two-way)
  // ipcMain.handle('dialog:openFile', handleFileOpen);

  // IPC: Main to renderer
  // ipcMain.on('counter-value', (_event, value) => {
  //   console.log(value) // will print value to Node console
  // })

  // IPC: MessagePorts
  // ipcMain.on('port', (event) => {
  //   // When we receive a MessagePort in the main process, it becomes a MessagePortMain.
  //   const port = event.ports[0];
  //   // MessagePortMain uses the Node.js-style events API, rather than the
  //   // web-style events API. So .on('message', ...) instead of .onmessage = ...
  //   port.on('message', (event) => {
  //     // data is { answer: 42 }
  //     const data = event.data;
  //   });

  //   // MessagePortMain queues messages until the .start() method has been called.
  //   port.start()
  // })

  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// const handleChangeTitle = (event, title) => {
//   const webContents = event.sender;
//   const win = BrowserWindow.fromWebContents(webContents);
//   win.setTitle(title);
// }

// const handleFileOpen = async () => {
//   const { canceled, filePaths } = await dialog.showOpenDialog();
//   return (canceled ? false : filePaths[0]);
// }
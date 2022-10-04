const { app, BrowserWindow } = require('electron')
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')
  }

  app.whenReady().then(() => {
 //Because windows cannot be created before the ready event, 
 //you should only listen for activate events after your app 
 //is initialized.
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })})

  app.on('window-all-closed', () => {
   //On Windows and Linux, exiting all windows generally quits an application entirely.
     if (process.platform !== 'darwin') app.quit()
  })


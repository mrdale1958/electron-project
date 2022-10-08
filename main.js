const { app, BrowserWindow, Menu } = require('electron')
const path = require('path');
const argv = require('argv');
const homeURL = process.argv[3]; // something like argv[1] but what if length argv is 1?
Menu.setApplicationMenu(null);
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      skipTaskbar: true,
      movable: false,
      autoHideMenuBar: true,
      frame: false,
      fullscreen: true,
      kiosk: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });
    win.webContents.openDevTools();
    win.maximize();
    //win.loadFile('index.html');
    win.loadURL(homeURL);


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


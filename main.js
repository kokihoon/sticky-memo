const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const ipcMain = require('electron').ipcMain;
let win

app.on('ready', function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, frame : false})
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.openDevTools()
})

ipcMain.on('sync',  () => {
  win = new BrowserWindow({width: 800, height: 600, frame : false})
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
})
/*
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  //if (win === null) {
    createWindow()
  //}
})
*/

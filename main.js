const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

//const WindowStateManager = require('electron-window-state-manager');

let win
let i = 0;
app.on('ready', createWindow);

function createWindow (event) {
  win = new BrowserWindow({width: 400, height: 300, frame : false})
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // win.setTitle(i+"");
  // if(!fs.existsSync('./data/' +i + '.txt')) {
  //   var data = "";
  //   fs.writeFileSync('./data/' +i + '.txt', data, 'utf8');
  // }
  //
  // i++;
  // console.log(win.getTitle());

  win.webContents.openDevTools()
}


ipcMain.on('save', function save(event, arg) {
  console.log("save");

  event.sender.send('close', 'close')

  // if(fs.existsSync('./data/' +i + '.txt')) {
  //   fs.writeFileSync('./data/' +i + '.txt', arg, 'utf8');
  //   event.sender.send('close', 'close')
  // }
});

ipcMain.on('sync', createWindow);

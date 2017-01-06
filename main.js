const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

let win
app.on('ready', function(){
  fs.readdir("./data", (err, files) => {
    if(files.length>0){
      // console.log("exist files");

      for(file in files){
        createWindow(files[file]);

      }
    }else{
      // console.log("no files");
      createWindow();
    }
  })
});


function createWindow (fileName) {
  if(fileName != null){
    win = new BrowserWindow({width: 400, height: 300, frame : false});
    win.setTitle(fileName);
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }else{
    // console.log("no file name");
    win = new BrowserWindow({width: 400, height: 300, frame : false})
    win.setTitle("");
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.webContents.openDevTools()
}

ipcMain.on('newSticky', function(event, content){
  createWindow();
});

//저장하기
ipcMain.on('save', function save(event, content) {
  var random;
  if(content != ""){
    random = Math.random() * 10000;
    fs.writeFileSync("./data/"+random+".txt", content);
  }
  event.sender.send('saveComplete', random+".txt");
});

//저장하고 종료
ipcMain.on('saveClose', function save(event, content) {
  if(content != ""){
    let random = Math.random() * 10000;
    fs.writeFileSync("./data/"+random+".txt", content);
  }
  event.sender.send('saveCloseComplete', 'saveCloseComplete');
});

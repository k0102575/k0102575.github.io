/* 주제: HTML 파일의 경로를 쉽게 찾기

 */

const {app, BrowserWindow} = require('electron')
const path = require('path')

const url = require('url')

let win

app.on('ready', createWindow)

function createWindow() {
  win = new BrowserWindow({width: 1200, height: 800})
  //win.loadURL('file:///C:/workspace/electron01/step03/index.html') v1
  //win.loadURL('file://' + __dirname + '/index.html')
  //win.loadURL(path.join('file://', __dirname, '/index.html'))
  //함수로 넘길때는 (값,값,값 ) 이렇게 넘겼지만
  // urlObject 객체로 넘겨라

  win.loadURL(url.format({
    protocol: 'file',
    pathname: path.join(__dirname, 'index.html'),
    slashes: true
  }))
  win.webContents.openDevTools()
}

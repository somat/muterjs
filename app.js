const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const dialog = require('electron').dialog

let win

function createWindow() {
  win = new BrowserWindow({width: 400, height: 600})
  win.loadURL(url.format(
    {
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  win.openDevTools()
  win.setMenu(null)

  win.on('closed', () => {
    win = null
  })

}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if(win === null) {
    createWindow()
  }
})

exports.selectFiles = function() {
  return dialog.showOpenDialog(win, {
    filters: [
      {name: 'Media', extensions: ['mp4', 'mp3']}
    ],
    properties: ['openFile', 'multiSelections']
  })
}

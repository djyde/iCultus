const menubar = require('menubar')
const path = require('path')

// tray.setTitle('test')

const mb = new menubar({
  'always-on-top': true,
  resizable: false,
  width: 250,
  height: 250,
  preloadWindow: true,
  icon: path.join(__dirname, './app/assets/images/app.png')
})

mb.on('ready', () => {
  // mb.tray.setTitle('test')
})

mb.on('after-create-window', () => {
  if (process.env.NODE_ENV === 'dev') {
    mb.window.openDevTools()
    mb.window.loadUrl('http://localhost:8080/')
  }
})

exports.mb = mb
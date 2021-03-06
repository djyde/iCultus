const menubar = require('menubar')
const path = require('path')
const app = require('app')

// tray.setTitle('test')

const mb = new menubar({
  // 'always-on-top': true,
  resizable: false,
  width: 250,
  height: 280,
  preloadWindow: true,
  icon: __dirname + '/app/IconTemplate.png'
})

mb.on('ready', () => {
  mb.tray.setToolTip(`${app.getName()} ${app.getVersion()}`)
  mb.tray.setHighlightMode(false)
})

// mb.on('after-create-window', () => {
//   if (process.env.NODE_ENV === 'dev') {
//     mb.window.openDevTools()
//     mb.window.loadUrl('http://localhost:8080/')
//   }
// })

exports.mb = mb
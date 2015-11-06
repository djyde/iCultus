const menubar = require('menubar')
const mb = new menubar({
  'always-on-top': true,
  resizable: false,
  width: 250,
  height: 300
})

mb.on('ready', () => console.log('ready'))

mb.on('after-create-window', () => {
  if (process.env.NODE_ENV === 'dev') {
    mb.window.openDevTools()
    mb.window.loadUrl('http://localhost:8080/')
  }
})
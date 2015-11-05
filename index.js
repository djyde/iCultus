const menubar = require('menubar')
const mb = new menubar({
  openDevTools: true,
  'always-on-top': true,
  devMode: true,
  resizable: false,
  width: 250,
  height: 300
})

mb.on('ready', () => console.log('ready'))
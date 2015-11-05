const menubar = require('menubar')
const mb = new menubar({
  openDevTools: true,
  'always-on-top': true,
  devMode: true
})

mb.on('ready', () => console.log('ready'))
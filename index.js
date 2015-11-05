const menubar = require('menubar')
const mb = new menubar({
  openDevTools: true
})

mb.on('ready', () => console.log('ready'))
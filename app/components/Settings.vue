<template lang="jade">
#settings
  #title.center {{ app.getName() }} {{ app.getVersion() }}
  #pannel
    .field
      label Menubar display:
      input(type="text", v-model="trayDateFormat", placeholder="Empty for only display icon")
      p * Support 
        a(href="javascript:void(0)", @click="visit('http://momentjs.com/docs/#/parsing/string-format/')") moment.js format 
      
    .center
      a.center.btn.primary(href="javascript:void(0)", @click="save") Save
      a.center.btn(href="javascript:void(0)", @click="cancel") Cancel
</template>

<script>

import moment from 'moment'

const shell = window.remote.require('shell')
const app = window.remote.require('app')
const mb = window.remote.require('./').mb

export default {
  data(){
    return {
      app,
      trayDateFormat: localStorage.getItem('trayDateFormat')
    }
  },

  methods: {
    back(){
      this.$parent.view = 'Calendar'
    },

    save(){
      localStorage.setItem('trayDateFormat', this.trayDateFormat)
      if (!this.trayDateFormat) {
        mb.tray.setTitle('')
      } else {
        mb.tray.setTitle(moment().format(this.trayDateFormat))
      }
      this.back()
    },

    cancel(){
      this.back()
    },

    visit(url){
      shell.openExternal(url)
    }
  }
}
</script>

<style scoped>
#settings{
  padding: 1em;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ECECEC;

  #title{
    font-size: 1em;
    padding-bottom: 1em;
  }

  .field{
    label{
      font-weight: bold;
      font-size: 1em;
      margin-bottom: .5em;
      display: block;
    }

    p{
      line-height: .5em;
    }

    input{
      border-radius: 4px;
      border: 1px solid #bdbdbd;
      width: 100%;
      padding: .4em;
      font-size: .8em;
      box-sizing: border-box;
    }

    p{
      font-size: .8em;
    }
  }

  .btn{
    display: inline-block;
    margin-top: 2em;
    text-decoration: none;
    background-color: #fff;
    color: #000;
    padding-left: .5em;
    padding-right: .5em;
    padding-top: .25em;
    padding-bottom: .25em;
    border-radius: 6px;
    margin-left: 1em;
    border: 1px solid #ededed;
    cursor: default;
    &:active{
      background: linear-gradient(to bottom, #67AFF9, #2584FE);
      color: #fff;
    }
    &.primary{
      background: linear-gradient(to bottom, #67AFF9, #2584FE);
      color: #fff;

      &:active{
        background: linear-gradient(to bottom, #4A97FD, #1A67E4);

      }
    }
  }
}
</style>
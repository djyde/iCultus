import Vue from 'vue'
import Calendar from './components/Calendar.vue'
import Settings from './components/Settings.vue'

import 'normalize.css'
import './app.css'

const mb = window.remote.require('./').mb

const cultus = new Vue({
  el: '#app',
  data: {
    view: 'Calendar'
  },
  components: {
    Calendar,
    Settings
  }
})
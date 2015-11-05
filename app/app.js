import Vue from 'vue'
import Calendar from './components/Calendar.vue'

import 'normalize.css'
import './app.css'

const cultus = new Vue({
  el: '#app',
  components: {
    Calendar
  }
})
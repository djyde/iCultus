<template lang="jade">
#calendar
  #head
    #month {{ month }} {{ year }}
    #week
      .grid(v-for="i in 7") {{ weeks[i] }}
    #day
</template>

<script>
  import moment from 'moment'

  let mb = window.remote.require('./').mb

  export default {
    data(){
      return {
        month: moment().format('MMM'),
        year: moment().format('YYYY'),
        weeks: ['日', '一', '二', '三', '四', '五', '六']
      }
    },

    computed: {
      fullTime(){
        return moment().format(' ddd HH:mm')
      }
    },

    methods: {
      initDate(){
        this.year = moment().format('YYYY')
        this.month = moment().format('MMM')
        mb.tray.setTitle(this.fullTime)
      }
    },

    ready(){
      this.initDate()
      setInterval( () => {
        mb.tray.setTitle(moment().format(' ddd HH:mm'))
      }, 10000)

      // mb.on('show', () => this.initDate())
    }
  }
</script>

<style scoped>
  #calendar{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    #head{
      width: 100%;
      height: 18%;
      background: linear-gradient(to bottom, #7BBFE0, #75ABDD);

      #month{
        text-align: center;
        color: #fff;
        padding-top: .5em;
        padding-bottom: .5aem;
      }

      #week{
        margin-top: 1em;
        width: 100%;
        padding-top: .45em;
        padding-bottom: .45em;
        font-size: .6em;
        color: #fff;
        .grid{
          display: inline-block;
          width: 14.28%;
          text-align: center;
        }
      }
    }
  }
</style>
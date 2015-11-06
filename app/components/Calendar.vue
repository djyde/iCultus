<template lang="jade">
#calendar
  #head
    #month
      #display {{ formatMonth }} {{ year }}
      #action
        a.action(href="javascript:void(0)", @click="prev") <  
        a.action(href="javascript:void(0)", @click="next") > 
      
    #week
      .grid(v-for="i in 7") {{ weeks[i] }}
    #day
      .grid.square.last(v-for="i in lastMonthRestDays") {{ lastMonthLastDayNumber - ( lastMonthRestDays - 1 - i) }}
      .grid.square(v-for="i in daysOfMonth") {{ i + 1 }}
      .grid.square.next(v-for="i in nextMonthRestDays") {{ i + 1 }}
</template>

<script>
  import moment from 'moment'

  let mb = window.remote.require('./').mb

  export default {
    data(){
      return {
        today: moment().format('YYYY-MM-DD'),
        weeks: ['日', '一', '二', '三', '四', '五', '六']      
      }
    },

    watch: {
      today(val){
        console.log(val)
      }
    },

    computed: {
      fullTime(){
        return moment(this.today).format(' ddd HH:mm')
      },

      nextMonthRestDays(){
        return 42 - (this.lastMonthRestDays + this.daysOfMonth)
      },

      formatMonth(){
        return moment(this.today).format('MMM')
      },

      month(){
        return moment(this.today).month()
      },

      year(){
        return moment(this.today).year()
      },

      lastMonth(){
        return this.lastMonth = moment(this.today).get('month') - 1
      },

      firstDayWeekNumber(){
        return moment(this.today).startOf('month').day()
      },

      lastMonthLastDayNumber(){
        let todayInstance = moment(moment(this.today))
        return todayInstance.month(this.lastMonth).endOf('month').date()
      },

      lastMonthRestDays(){
        let todayInstance = moment(moment(this.today))
        return todayInstance.month(this.lastMonth).endOf('month').day() === 6 ? 0 : todayInstance.month(this.lastMonth).endOf('month').day() + 1
      },

      daysOfMonth(){
        return moment(this.today).endOf('month').date()
      }
    },

    methods: {
      initTray(){
        mb.tray.setTitle(moment().format(' ddd HH:mm'))
      },

      prev(){
        this.today = moment(this.today).subtract(1, 'month')
      },

      next(){
        this.today = moment(this.today).add(1, 'month')
      }

    },

    ready(){
      this.initTray()
      setInterval( () => {
        mb.tray.setTitle(moment().format(' ddd HH:mm'))
      }, 10000)
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

    .grid{
      display: inline-block;
      width: 14.28%;
      text-align: center;
      
      &.square{
        font-weight: lighter;
        color: #777;
        font-size: .9em;
        box-sizing: border-box;
        padding-top: .8em;
        padding-bottom: .8em;

        &.last{
          background-color: #F5F5F5;
        }

        &.next{
          background-color: #F5F5F5;
        }
      }
    }

    #head{
      width: 100%;
      height: 52px;
      background: linear-gradient(to bottom, #7BBFE0, #75ABDD);

      #month{
        text-align: center;
        color: #fff;
        padding-top: .5em;
        padding-bottom: .5aem;

        #action{
          position: absolute;
          top: .5em;
          right: .5em;
        }
      }

      #week{
        margin-top: 1em;
        width: 100%;
        padding-top: .45em;
        padding-bottom: .45em;
        font-size: .6em;
        color: #fff;
      }

      #day{
        margin-top: .1em;
      }
    }
  }
</style>
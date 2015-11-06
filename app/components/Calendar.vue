<template lang="jade">
#calendar
  #head
    #month
      #date(@click="backToToday") {{ formatMonth }} {{ year }}
      #calendar-app
        img(src="../assets/images/calendar.png", @click="launchCalendar")
      #action
        .action(href="javascript:void(0)", @click="prev", style="transform: rotate(180deg)") ➔
        .action(href="javascript:void(0)", @click="next") ➔
      
    #week
      .grid(v-for="i in 7") {{ weeks[i] }}
  #day
    .grid.square.last(v-for="i in lastMonthRestDays") {{ lastMonthLastDayNumber - ( lastMonthRestDays - 1 - i) }}
    .grid.square(v-for="i in daysOfMonth", :class="{ current: day === i + 1 && isCurrentDay }") {{ i + 1 }}
    .grid.square.next(v-for="i in nextMonthRestDays") {{ i + 1 }}
</template>

<script>
  import moment from 'moment'

  let mb = window.remote.require('./').mb
  let shell = window.remote.require('shell')
  let app = window.remote.require('app')
  
  moment.locale(app.getLocale())

  export default {
    data(){
      return {
        today: moment().format('YYYY-MM-DD'),
        // weeks: ['日', '一', '二', '三', '四', '五', '六']
        weeks: moment.weekdaysShort()
      }
    },

    computed: {
      fullTime(){
        return moment(this.today).format('ddd HH:mm')
      },

      formatMonth(){
        return moment(this.today).format('MMM')
      },

      day(){
        return moment(this.today).date()
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
      },

      nextMonthRestDays(){
        return 42 - (this.lastMonthRestDays + this.daysOfMonth)
      },

      isCurrentDay(){
        return moment().format('YYYY-MM-DD') === moment(this.today).format('YYYY-MM-DD')
      }
    },

    methods: {
      initTray(){
        mb.tray.setTitle(moment().format('ddd HH:mm'))
      },

      prev(){
        this.today = moment(this.today).subtract(1, 'month')
      },

      next(){
        this.today = moment(this.today).add(1, 'month')
      },

      backToToday(){
        this.today = moment().format('YYYY-MM-DD')
      },

      launchCalendar(){
        shell.openItem('/Applications/Calendar.app')
      }

    },

    ready(){
      this.initTray()
      mb.on('show', () => {
        this.backToToday()
      })
      setInterval( () => {
        mb.tray.setTitle(moment().format('ddd HH:mm'))
      }, 10000)
    }
  }
</script>

<style scoped>
  #calendar{
    -webkit-user-select: none;
    cursor: default;
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
        border-radius: 2px;
        font-weight: lighter;
        color: #777;
        font-size: .9em;
        box-sizing: border-box;
        padding-top: .7em;
        padding-bottom: .7em;

        &.last{
          background-color: #F5F5F5;
        }

        &.next{
          background-color: #F5F5F5;
        }

        &.current{
          background: linear-gradient(to bottom, #7BBFE0, #75ABDD);
          color: #fff;
        }
      }
    }

    #head{
      width: 100%;
      height: 55px;
      background: linear-gradient(to bottom, #7BBFE0, #75ABDD);
      position: relative;
      #month{
        text-align: center;
        color: #fff;
        padding-top: .8rem;
        #date{
          font-size: 1.1em;
        }

        #calendar-app{
          position: absolute;
          top: .8em;
          left: .8em;
        }

        #action{
          position: absolute;
          top: .8em;
          right: .5em;
          font-weight: 800;
          .action{
            color: #E3EFF9;
            margin-right: .8em;
            display: inline-block;
            &:hover{
              color: #fff;
            };
          }
        }

        #date{
          font-size: 1.1em;
          display: inline-block;
          cursor: pointer;
        }
      }

      #week{
        position: absolute;
        width: 100%;
        /*padding-top: 4px;*/
        /*padding-bottom: 3px;*/
        bottom: .2em;
        font-size: .75em;
        color: #fff;
      }

      
    }

    #day{
        box-sizing: border-box;
        padding: .2em;
        padding-bottom: 0;
      }
  }
</style>
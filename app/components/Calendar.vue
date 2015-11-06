<template lang="jade">
#calendar
  #head
    #month {{ formatMonth }} {{ year }}
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
        formatMonth: moment().format('MMM'),
        month: moment().month(),
        year: moment().year(),
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        lastMonth: 0,
        firstDayWeekNumber: moment().startOf('month').day(),
        lastMonthLastDayNumber: 0,
        lastMonthRestDays: 0,
        daysOfMonth: moment().endOf('month').date(),
      }
    },

    computed: {
      fullTime(){
        return moment().format(' ddd HH:mm')
      },

      nextMonthRestDays(){
        return 42 - (this.lastMonthRestDays + this.daysOfMonth)
      }
    },

    methods: {
      initDate(){
        this.year = moment().format('YYYY')
        this.month = moment().format('MMM')
        mb.tray.setTitle(this.fullTime)
      },


    },

    ready(){
      this.lastMonth = moment().get('month') - 1;
      this.lastMonthLastDayNumber =  moment().month(this.lastMonth).endOf('month').date()
      this.lastMonthRestDays = moment().month(this.lastMonth).endOf('month').day() === 6 ? 0 : moment().month(this.lastMonth).endOf('month').day() + 1
      // console.log(moment().month(lastMonth).endOf('month').date())
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
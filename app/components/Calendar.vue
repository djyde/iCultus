<template lang="jade">
#calendar
  #head
    #month 十一月 2015
    #week
      .grid(v-for="i in 7") {{ weeks[i] }}

</template>

<script>
  import 'purecss/build/grids-min.css'

  export default {
    data(){
      return {
        weeks: ['日', '一', '二', '三', '四', '五', '六']
      }
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
      background-color: #75ABDD;

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
<template>
  <header class="pageHeader flex-row">
    <div class="wrap flex-row">
      <div class="date">
        <div class="t">{{time}}</div>
        <div class="d">{{weekDay}}<br>{{date}}</div>
      </div>
      <div class="flex-1 logo"><img src="@/assets/img/logo.png" alt="网络指挥平台"></div>
      <div class="options">
        <a class="fullBtn" @click="fullScreen()" :class="{'full':iFullscreen}"><i class="ico"></i>{{fullScreenText}}</a>
      </div>
    </div>
    <div class="light"></div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      iFullscreen:false,
      time:"",
      date:"",
      days:"",
      timer:null
    }
  },
  computed: {
    ...mapState(["user", "token"]),
    fullScreenText(){
      return this.iFullscreen ? "缩小" : "全屏";
    },
    weekDay(){
      let days = "";
      switch(this.days) {
        case 1:
          days = '星期一';
          break;
        case 2:
          days = '星期二';
          break;
        case 3:
          days = '星期三';
          break;
        case 4:
          days = '星期四';
          break;
        case 5:
          days = '星期五';
          break;
        case 6:
          days = '星期六';
          break;
        case 0:
          days = '星期日';
          break;
      }
      return days
    }
  },
  methods: {
    fullScreen(status){
      this.iFullscreen = !this.iFullscreen;
      let fullscreenEnabled = document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled;

      if (fullscreenEnabled) {
        let de = document.documentElement;
        if (!this.iFullscreen) {
          //关闭全屏
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        } else {
          //打开全屏
          if (de.requestFullscreen) {
            de.requestFullscreen();
          } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
          } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
          }
        }
      } else {
        alert('浏览器当前不能全屏');
      }
    },
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    },
    setTime(){
      this.timer = setInterval(()=> {
        let localDate = new Date();
        let year = localDate.getFullYear();
        let Month = (localDate.getMonth() + 1);
        let day = localDate.getDate();
        let hour = localDate.getHours();
        let minute = localDate.getMinutes();
        let seconds = localDate.getSeconds();
        //时分秒
        this.time = this.appendZero(hour)+':'+ this.appendZero(minute)+':'+this.appendZero(seconds);

        //星期
        this.days = localDate.getDay();

        //年月日
        this.date = year+'-'+ this.appendZero(Month)+'-'+this.appendZero(day);
      }, 1000);
    }
  },
  mounted() {
    this.setTime();
  },
  beforeDestroy() {
    if(this.timer){
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="postcss" scoped>
.pageHeader { height:85px; color:#fae0c2; position:relative; overflow:visible;
  &::before { content:''; display:block; width:675px; height:106px; background:resolve('headbg.png') center top no-repeat; position:absolute; left:50%; top:0; transform: translate(-50%,0);}
  > div { position:relative;}
  .logo { text-align:center; position:relative;
    img { position:absolute; left:50%; top:50%; transform: translate(-50%,-50%);}
  }
  .light { position:absolute; left:50%; bottom:-9px; transform:translate(-50%,0);}
  .date,.options { width:260px;}
  .date { text-align:center; font-size:16px; line-height:80px;
    > div { display:inline-block; vertical-align:middle; margin:0 10px;}
    .t { font-size:18px;}
    .d { line-height:1.5;}
  }
  .options { line-height:80px; text-align:right;}
  .fullBtn { display:inline-block; vertical-align:middle; font-size:18px; color:#fae0c2; line-height:30px; padding:5px; margin-right:10px;
    .ico { display:inline-block; width:30px; height:30px; background:resolve('full_ico.png') -30px 0 no-repeat; vertical-align:-9px; margin-right:5px;}
    &.full .ico { background-position:0 0;}
  }
}
</style>
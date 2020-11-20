<template>
  <section class="pageMain wrap flex-1 flex-col">
    <div class="flex-2 flex-row">
      <div class="flex-1 flex-col">
        <div class="mBox flex-1 flex-col">
          <div class="corner"></div><div class="light"></div>
          <div class="hd">
            <div class="title">安全综合态势</div>
          </div>
          <div class="bd box flex-1 flex-col">
            <barline :data="data1" :colors="['#ffee9c','#79ffe2','#fc7e04','#d1b15b','#629dfd']" :grid_left="40" interval="auto" class="flex-1 mycharts" />
          </div>
        </div>
        <div class="mBox flex-1 flex-col">
          <div class="corner"></div><div class="light"></div>
          <div class="hd">
            <div class="title">网络入侵事件分布</div>
          </div>
          <div class="bd box flex-1 flex-col">
            <pie :data="data2" :colors="['#fdfbdf','#f3ce3a','#ff8e32','#eec885','#cb8730','#f5b427']" radius="40%,70%" class="flex-1" legend_position="right-center" legend_orient="vertical" />
          </div>
        </div>
      </div>
      <div class="flex-1 flex-col">
        <div class="mBox noborder flex-1 zhishu">
          <div class="box">
            <div class="num">5.5</div>
            <div class="name">综合风险指数</div>
            <div class="status">较低</div>
          </div>
          <div class="simg"><img src="@/assets/img/jun.png"></div>
        </div>
      </div>
      <div class="flex-1 flex-col">
        <div class="mBox flex-1 flex-col">
          <div class="corner"></div><div class="light"></div>
          <div class="hd">
            <div class="title">僵木蠕趋势</div>
          </div>
          <div class="bd box flex-1 flex-col">
            <barline :data="data3" :colors="['#fdfbdf','#eec885','#ffc035','#cb8730','#ff8e32']" :grid_left="40" interval="auto" class="flex-1 mycharts" />
          </div>
        </div>
        <div class="mBox flex-1 flex-col">
          <div class="corner"></div><div class="light"></div>
          <div class="hd">
            <div class="title">Web安全事件分布</div>
          </div>
          <div class="bd box flex-1 flex-col">
            <pie :data="data4" :colors="['#fdfbdf','#f3ce3a','#ff8e32','#eec885','#cb8730','#f5b427']" radius="40%,70%" class="flex-1" legend_position="left-center" :label="false" legend_orient="vertical" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 flex-row">
      <div class="flex-2 flex-col">
        <div class="mBox flex-1 flex-col">
          <div class="corner"></div><div class="light"></div>
          <div class="hd">
            <div class="title">Web攻击事件</div>
          </div>
          <div class="bd box flex-1 flex-col">
            <div class="flex-1 flex-col rank_list">
              <div class="flex-row list_hd">
                <div class="order">序号</div>
                <div class="flex-1 name">名称</div>
                <div class="ip">IP地址</div>
                <div class="pip">目的IP</div>
                <div class="stage">攻击阶段</div>
                <div class="level">等级</div>
                <div class="date">产生时间</div>
              </div>
              <div class="flex-1" id="rank_list">
                <vue-seamless-scroll :data="data6" :class-option="optionSingleHeightTime" class="list_bd" :style="'height:'+rank_list_height+'px;'" v-if="data6.length">
                  <ul>
                    <li class="flex-row" v-for="(e, i) in data6" :key="i">
                      <div class="order">{{e.order}}</div>
                      <div class="flex-1 name">{{e.name}}</div>
                      <div class="ip">{{e.ip}}</div>
                      <div class="pip">{{e.pip}}</div>
                      <div class="stage">{{e.stage}}</div>
                      <div class="level">{{e.level}}</div>
                      <div class="date">{{e.date}}</div>
                    </li>
                  </ul>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 flex-col">
        <div class="mBox flex-1 flex-col">
          <div class="corner"></div><div class="light"></div>
          <div class="hd">
            <div class="title">系统漏洞事件分析</div>
          </div>
          <div class="bd box flex-1 flex-col">
            <barline :data="data5" :colors="['#eac483']" barWidth="30" class="flex-1" :grid_left="40" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import data1 from '@/static/datas/data1'
import data2 from '@/static/datas/data2'
import data3 from '@/static/datas/data3'
import data4 from '@/static/datas/data4'
import data5 from '@/static/datas/data5'
import data6 from '@/static/datas/data6'

export default {
  middleware: "auth",
  head() {
    return {};
  },
  data() {
    return {
      data1:{},
      data2:{},
      data3:{},
      data4:{},
      data5:{},
      data6:[],
      data6_copy:[],
      rank_list_height:0,
    }
  },
  computed: {
    ...mapState(["user", "token"]),
    optionSingleHeightTime () {
      return {
        singleHeight: 31,
        waitTime: 2500
      }
    }
  },
  mounted() {
    this.data1 = data1;
    this.data2 = data2;
    this.data3 = data3;
    this.data4 = data4;
    this.data5 = data5;

    this.rank_list_height = document.getElementById("rank_list").offsetHeight
    this.data6 = data6;
  },
};
</script>

<style lang="postcss" scoped>
.pageMain { padding-bottom:20px; min-height:700px;}

.zhishu { position:relative;
  .box { text-align:center; width:321px; height:175px; margin:0 auto; background:resolve('yibiao.png') no-repeat; padding-top:70px; position:relative;
    .num { color:#ffffff; font-size:35px; line-height:1.2;}
    .status { font-size:18px;}
    &::after { content:''; display:block; width:;}
  }
  .simg { width:510px; height:307px; position:absolute; left:-20px; bottom:0;}
}

.rank_list { text-align:center; margin-right:20px; margin-left:10px; margin-bottom:10px;
  .list_hd { height:36px; line-height:36px; border-bottom:#d3b47d 2px solid; margin-bottom:8px;}
  .list_bd { overflow:hidden; position:relative;}
  .order { width:90px;}
  .ip,.pip { width:130px;}
  .date { width:150px;}
  .stage { width:45px;}
  .level { width:45px;}
  li { height:30px; line-height:30px; color:#ffffff;}
  li:hover { background-color:rgba(45, 170, 255, .15); color:#00d7ff;}
}
</style>
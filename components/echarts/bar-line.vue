<template>
  <div :id="chartName" class="myChart"></div>
</template>

<script>
import * as util from "@/assets/util";
// const echarts = window.echarts;
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    },
    dataZoom: "",
    y: "",
    y1unit: "",
    y2unit: "",
    colors: {
      type: Array,
      default: function() {
        return [];
      }
    },
    areaColors: {
      type: Array,
      default: function() {
        return [];
      }
    },
    areaColors_status:{
      type: Boolean,
      default: function() {
        return false;
      }
    },
    axisPointer: "",
    boundaryGap:{
      type: Boolean,
      default: function() {
        return true;
      }
    },
    bartype: "",
    linestyle: {
        type: String,
        required: false,
        default: 'solid'
    },
    long: "",
    grid_left: "",
    grid_right: "",
    datazoom: "",
    datazoomend: "",
    orient: {
      type: String,
      default: "horizontal"
    },
    barWidth: {
        type: String,
        required: false,
        default: '20'
    },
    legendShow: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    pagesize: {
      type: Number,
      required: false,
      default: function() {
        return 99;
      }
    },
    interval: {
      type: [Number,String],
      required: false,
      default: function() {
        return 0;
      }
    }
  },
  data() {
    return {
      eChart: null,
      chartName: "chartBarLine" + Math.random() * 1000000,
      legend:true
    };
  },
  watch: {
    data: function() {
      this.drawCharts();
    }
  },
  methods: {
    drawCharts() {
      if (!this.data.series) {
        return false;
      }
      this.eChart.hideLoading();
      let seriesData = [];
      let data_length = this.data.series.length;
      let xAxis_length = this.data.xAxis.length;
      for (let i = 0; i < data_length; i++) {
        const e = this.data.series[i];
        e.barMaxWidth = 30;
        e.itemStyle = {
          normal: {
            //barBorderRadius: 50,
            color: this.colors[i],
            label: {
              show: e.type ==='line' ? false : true, //开启显示
              position: 'insideTop', //在上方显示
              textStyle: { //数值样式
                color: '#ffffff',
                fontSize: 16
              }
            }
          }
        };
        if(e.type==='line'){
            e.linestyle = {
                type: this.linestyle,
                width:1
            }
        }
        if(this.areaColors_status){
            e.areaStyle = {
              color: this.areaColors[i] || "transparent",
              // color: {
              //     type: 'linear',
              //     x: 0,
              //     y: 0,
              //     x2: 0,
              //     y2: 1,
              //     colorStops: [{
              //         offset: 0, color: this.areaColors[i] || "transparent" // 0% 处的颜色
              //     }, {
              //         offset: 1, color: 'transparent' // 100% 处的颜色
              //     }],
              //     global: false // 缺省为 false
              // }
            };
        }
        e.smooth = true;
        e.barMaxWidth = this.barWidth;

        // e.label = {
        //   normal: {
        //     show: true,
        //     position:"top",
        //     //计算总数，显示
        //     formatter: function(params) {
        //       // let idx=params.dataIndex; //获取数据位置
        //       // let total=+rawData[idx]+(+generalData[idx])+(+chemicalData[idx]); //计算总和
        //       return 100 ;
        //     }
        //   }
        // }
        seriesData.push(e);
      }
      //console.log(xAxis_length,'xAxis_length');
      
        //console.log(seriesData)
      let grid_left = this.grid_left || 65,
        grid_right = this.grid_right || 65,
        grid_top = 40,
        grid_bottom = 60;

      let dataZoomShow = false,
        dataZoomEnd = 100;
      if (data_length == 1 && !this.legendShow) {
            this.legend = false;
            grid_top = 15;
      }

      //console.log(xAxis_length);
      // let showCount = 13;
      // if (this.long == "true") {
      //   showCount = 20;
      // }
      // if (xAxis_length > showCount) {
      //   dataZoomShow = true;
      //   dataZoomEnd = 100 / Math.ceil(xAxis_length / showCount);
      // } else {
      //   grid_bottom = 30;
      // }

      // if (this.datazoom) {
      //   dataZoomShow = true;
      //   grid_bottom = 60;
      // }
      // if (this.datazoomend) {
      //   dataZoomEnd = this.datazoomend;
      // }
      grid_bottom = 35;


      let y1unit = this.y1unit || "";
      let y2unit = this.y2unit || "";
      let yAxisSet = [
        {
          type: "value",
          name: "",
          axisLabel: {
            formatter: "{value}" + y1unit
          },
          minInterval:1,
        }
      ];
      if(y1unit == '%'){
        yAxisSet[0].interval = 25
      }
      if (this.y == "2") {
        yAxisSet = [
          {
            type: "value",
            name: "",
            axisLabel: {
              formatter: "{value}" + y1unit
            },
            minInterval:1
          },
          {
            type: "value",
            name: "",
            axisLabel: {
              formatter: "{value}" + y2unit
            },
            minInterval:1
          }
        ];
      } else {
        grid_right = 10;
      }
      // 兼容右侧图例
      if (this.orient === "vertical") {
        grid_top = 8;
        grid_right = 120;
      }

      let xAxisSet = [
        {
          type: "category",
          data: this.data.xAxis,
          axisPointer: {
            type: this.axisPointer || "shadow"
          },
          axisLabel: {
            interval:this.interval,
            rotate: 0,
            formatter:(value, index)=> {
                let text = value;
                if(this.pagesize <= xAxis_length && text.length > 5){
                  text = text.slice(0,5) + '...'
                }
                return text;
            }
          },
          boundaryGap: this.boundaryGap
        }
      ];

      let xset, yset;
      if (this.bartype) {
        xset = yAxisSet;
        yset = xAxisSet;
      } else {
        xset = xAxisSet;
        yset = yAxisSet;
      }

      //console.log(seriesData,'seriesData');

      let tootipUnit = null
      if(y1unit == '%'){
        tootipUnit = '{a}：{c}%<br />{a1}：{c1}%<br />{a2}：{c2}%'
      }
      
      let ChartOption = {
        grid: {
          left: grid_left,
          right: grid_right,
          top: grid_top,
          bottom: grid_bottom
        },
        tooltip: {
          trigger: "axis",
          formatter:tootipUnit
        },
        legend: {
          type: "scroll",
          /* pageIconColor:'#aaaaaa',
                    pageIconInactiveColor:'#334754',
                    pageTextStyle:{
                        color:'#ffffff'
                    }, */
          show: this.legend,
          data: this.data.series.map(e => {
            return e.name;
          }),
          orient: this.orient,
          right: 10,
          top:5
        },
        dataZoom: [
          {
            show: false,
            type: "slider",
            end: dataZoomEnd,
            height: 20,
            showDataShadow: false,
            textStyle: {
              color: "#fff",
              fontSize: "0"
            },
            zoomLock: true
          }
          /* {
                        show:dataZoomShow,
                        type: 'inside',
                        end:dataZoomEnd
                    } */
        ],
        xAxis: xset,
        yAxis: yset,
        series: seriesData
      };
      this.eChart.setOption(ChartOption, true);
      util.on("resize", () => {
        this.eChart.resize();
      });
    }
  },
  mounted() {
    if (!this.eChart) {
      this.eChart = echarts.init(
        document.getElementById(this.chartName),
        "chalk"
      );
      this.eChart.showLoading({
        text: "",
        color: "#ffffff",
        textColor: "#ffffff",
        maskColor: "transparent"
      });
      this.drawCharts();
    }
  }
};
</script>
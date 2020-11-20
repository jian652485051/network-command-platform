<template>
    <div :id="chartName" class="myChart"></div>
</template>

<script>
import * as util from '@/assets/util';
// const echarts = window.echarts
export default {
    props: {
        data:{
            type: Object,
            default:function(){
                return {}
            }
        },
        colors:{
            type: Array,
            default:function(){
                return ["transparent","#37a2da","#67e0e3","#ffdb5c","#ff9f7f","#e062ae","#fe9d81","#f97191","#de64aa","#e490ce","#e5bcf0","#9b97f1","#817be5","#95bffc"]
            }
        },
        orient: {
            type: String,
            default: 'horizontal'
        },
        type:{
            type: Number,
            default: 1
        }
    },
    data () {
        return {
            eChart: null,
            chartName:'chartBarPolar' + Math.random()*1000000,
            legend:true
        }
    },
    watch:{
        'data':function(){
            this.drawCharts();
        }
    },
    methods: {
        drawCharts(){
            this.eChart.hideLoading();
            if(!this.data.series){
                return false;
            }

            //添加全部隐形数据支撑最大值
            this.data.xAxis = ['全部'].concat(this.data.xAxis)
            let datas = this.data.series[0].data;
            let maxData = 0;
            datas.forEach(e => {
              if(Number(e) > maxData){
                maxData = Number(e)
              }
            });
            maxData = maxData*1.25
            datas = [maxData].concat(datas);
            this.data.series[0].data = datas;


            let seriesData = [];
            let data_length = this.data.series.length;
            //console.log(data_length);
            for (let i = 0; i < data_length; i++) {
                const e = this.data.series[i];
                e.coordinateSystem = 'polar';
                e.barMaxWidth = 10;
                e.itemStyle = {
                    barBorderRadius:[5, 5, 0, 0],
                    normal:{
                        color:(params)=>{
                          var colorList = this.colors;
                          return colorList[params.dataIndex]
                        }
                    }  
                };
                seriesData.push(e);
            }
            //console.log(seriesData);

            let radiusAxis_set = {
                    show:true,
                    axisLabel:{
                        show:true,
                        interval:0,
                        fontSize:14,
                        formatter:(value,index)=>{
                          return value +' '+ seriesData[0].data[index] + '人'
                        },
                        color:(value,index)=>{
                          return this.colors[index]
                        },
                        shadowColor:'#ffffff',
                        shadowBlur:5
                    },
                    axisLine:{
                      show:false
                    },
                    axisTick:{
                      show:false
                    },
                    splitLine:{                     //坐标轴在 grid 区域中的分隔线。
                        show:true,                  //是否显示分隔线。默认数值轴显示，类目轴不显示。
                        interval:0,            //坐标轴分隔线的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，可以用数值表示间隔的数据，也可以通过回调函数控制。回调函数格式如下：
                        lineStyle:{
                            color:'#1d468c',
                            type:'dotted'
                        }
                    },
                    type: 'category',
                    data:this.data.xAxis,
                    z: 10,
                }


            let ChartOption = {
                tooltip: {
                    show: false,
                    //trigger: 'axis',
                    //formatter:'{a}：{c}<br />{a1}：{c1}%<br />{a2}：{c2}%'
                },

                angleAxis:{
                  clockwise:true,
                  splitNumber:0,
                  axisLabel:{
                    show:true
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#013852',
                      type:'solid'
                    }
                  },
                  axisTick:{
                    show:true,
                    lineStyle:{
                        color:'#1d468c'
                    }
                  },
                  splitLine:{
                    lineStyle:{
                        color:'#1d468c'
                    }
                  }
                },
                radiusAxis:radiusAxis_set,
                polar:{
                  center:['50%','47%'],
                  radius:'70%'
                },
                series: seriesData
            }
            this.eChart.setOption(ChartOption,true)
            util.on('resize', () => { this.eChart.resize()})
        }
    },
    mounted(){
        if (!this.eChart) {
            this.eChart = echarts.init(document.getElementById(this.chartName),'chalk');
            this.eChart.showLoading({
                text : '',
                color: '#ffffff',
                textColor: '#ffffff',
                maskColor:'transparent',
            });
            this.drawCharts();
        }
    }
}
</script>
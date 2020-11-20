<template>
    <div :id="chartName" class="myChart"></div>
</template>

<script>
import * as util from '@/assets/util';
// const echarts = window.echarts
export default {
    props: {
        data:{
            type:Object,
            default:function(){
                return {}
            }
        },
        shape:{
            type:String,
            default:function(){
                return "polygon"
            }
        },
        color:{
            type:String,
            default:function(){
                return "#00ffff"
            }
        }
    },
    data () {
        return {
            eChart:null,
            chartName:'chartRadar' + Math.random()*1000000
        }
    },
    watch:{
        'data':function(){
            if(this.data.indicator){
                this.drawCharts();
            }
        }
    },
    methods: {
        drawCharts(){
            //console.log(this.data);
            this.eChart.hideLoading();
            if(!this.data.indicator || this.data.indicator.length == 0){
                return false;
            }

            let shapeSet = this.shape;
            let colorSet = this.color;

            let ChartOption = {
                /* title: {
                    text:this.data.total,
                    left: 'center',
                    top: 'center',
                    textStyle:{
                        fontSize:30,
                        color:'#1483fb'
                    }
                }, */
                radar: {
                    indicator: this.data.indicator,
                    center:['50%', '45%'],
                    shape:shapeSet,
                    radius:"60%",
                    name:{
                        color:'#00ebfb',
                        fontSize:12,
                        formatter: function (value) {
                            return value;
                        }
                    },
                    splitLine:{                     //坐标轴在 grid 区域中的分隔线。
                        show:true,                  //是否显示分隔线。默认数值轴显示，类目轴不显示。
                        interval:0,            //坐标轴分隔线的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，可以用数值表示间隔的数据，也可以通过回调函数控制。回调函数格式如下：
                        lineStyle:{
                            color:'#1d468c',
                            type:'solid'
                        }
                    },
                    axisLine:{                     //坐标轴在 grid 区域中的分隔线。
                        lineStyle:{
                            color:'#00c3d4',
                            type:'solid'
                        }
                    },
                    splitArea : {
                      show:true,   
                      areaStyle:{
                        color: ['transparent']  
                      }
                    },
                },
                series:{
                    name: '',
                    type: 'radar',
                    itemStyle: {
                        normal: {
                            color:colorSet, // 图表中各个图区域的边框线拐点颜色
                            lineStyle: {
                                color:colorSet // 图表中各个图区域的边框线颜色
                            }
                        }
                    },
                    data: [
                        {
                            value: this.data.value,
                            areaStyle: {
                                normal: {
                                    opacity: 0.6,
                                    color:colorSet
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    color:'#ffffff',
                                    fontSize:12,
                                    formatter:function(params) {
                                        return params.value;
                                    }
                                }
                            }
                        }
                    ]
                }
            }
            this.eChart.setOption(ChartOption,true)
            this.eChart.on('click', (param) => {
                this.$emit('clicked',param)
            })
            util.on('resize', () => { this.eChart.resize()})
        }
    },
    mounted(){
        if (!this.eChart) {
            this.eChart = echarts.init(document.getElementById(this.chartName));
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
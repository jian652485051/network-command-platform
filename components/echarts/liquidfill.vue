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
                // {
                //   name:'通过率',
                //   value:'0.79'
                // }
                return {}
            }
        },
        ctype:{
            type: String,
            required: false,
            default:function(){
                // return 'number' for static number
                return 'percent'
            }
        }
    },
    data () {
        return {
            eChart: null,
            chartName:'chartLiquidfill' + Math.random()*1000000
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
            if(!this.data.value){
                return false;
            }

            let value = this.data.value;
            let data = [value, value, value, value, value];
            if(this.ctype == 'number' || this.ctype == 'special'){
              data = [0.6,0.6,0.6,0.6,0.6]
            }

            let graphic = []
            if(this.data.name){
              graphic = [{
                    type: 'text',
                    left: 'center',
                    bottom: '15%',
                    style: {
                        fill: '#ffffff',
                        text: this.data.name,
                        font: '14px Microsoft YaHei'
                    }
                }]
            }

            let ChartOption = {
                backgroundColor: 'transparent',

                graphic:graphic,
                series: [{
                    type: 'liquidFill',
                    radius: this.data.name ? '60%' : '80%',
                    center: this.data.name ? ['50%', '40%'] : ['50%', '50%'],
                    data: data,
                    itemStyle: {
                        shadowBlur: 0,
                        normal: {
                            opacity: 0.8
                        }
                    },
                    label: {
                        formatter:(param)=> {
                            let text = (Number(param.value)*100).toFixed() + '%';
                            if(this.ctype == 'number'){
                              text = Number(this.data.value).toLocaleString() + '人';
                            }
                            if(this.ctype == 'special'){
                              text = (Number(this.data.value)).toFixed(2) + '%';
                            }
                            return text
                        },
                        fontSize: this.data.name ? 18 : 22,
                        fontWeight:'normal',
                        color:'#b9babf'
                    },
                    backgroundStyle: {
                        color: 'transparent'
                    },
                    outline: {
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#1d468c'
                        }
                    }
                }]
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
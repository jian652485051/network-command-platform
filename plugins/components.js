import Vue from 'vue'
import Responsive from 'vue-responsive-component';
import nodata from '@/components/NoData.vue'
import login from '@/components/login.vue'

/* echarts */
import barline from '@/components/echarts/bar-line';
import pie from '@/components/echarts/pie';

const components = { 
    nodata,
    login,
    Responsive,

    barline,
    pie,
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

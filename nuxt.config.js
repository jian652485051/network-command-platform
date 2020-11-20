export default {
  ssr:false,           //是否服务端渲染,false为单页面应用

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no' },
      { name: 'renderer', content: 'webkit'},
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1'},
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      { src:'/js/echarts/echarts.min.js', type: 'text/javascript', charset: 'utf-8'},
      { src:'/js/echarts/chalk.js', type: 'text/javascript', charset: 'utf-8'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ff6600' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    {src: '@/plugins/common',ssr: false},
    {src: '@/plugins/responsive',ssr: false},
    '@/plugins/components',
    '@/plugins/filters',
    {src:'@/plugins/seamless-scroll',ssr:false},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    retry: {
      retries: 3
    },
    debug: false
  },

  /*
  ** Build configuration
  */
  build: {
    publicPath:'',
    transpile: [/^element-ui/,'vue-responsive-component'],
    postcss:{
      plugins:{
        'postcss-url':false,
        'postcss-nested': {},
        'cssnano': { preset: 'default' },
        'postcss-assets':{
          relative:true,
          loadPaths: ['assets/img']
        }
      },
      preset:{
        stage:2,
        autoprefixer: {
          grid: false,
          overrideBrowserslist: [
            'last 2 versions'
          ]
        },
        importFrom:['assets/css/root.css']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev }) {
      //每次构建打包时给文件名加上时间戳，保证版本更新时与上版本文件名不一样
      config.output.filename = `js/[name].${new Date().getTime()}.js`;
      config.output.chunkFilename = `js/[name].${new Date().getTime()}.js`;
      
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // config.module.rules.push({
        //   test: /\.postcss$/,
        //   use: [
        //     'vue-style-loader',
        //     'css-loader',
        //     {
        //       loader: 'postcss-loader'
        //     }
        //   ]
        // })
      }
    }
  },
  router: {
    linkActiveClass: '',
    linkExactActiveClass: 'active',
    //middleware:'headers'
  }
}

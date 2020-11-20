<template>
  <div class="layout flex-col" v-if="show">
    <Header v-if="showHead" />
    <nuxt />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/PageHeader.vue";

export default {
  components: {
    Header
  },
  head() {
    return {
      title: "网络指挥平台",
      link: [
        { rel: "icon", type: "image/x-icon", href:"" },
      ],
    };
  },
  data() {
    return {
      show:false
    };
  },
  computed: {
    showHead(){
      //不显示头部的页面
      let excludePages = ['login'];
      return excludePages.indexOf(this.$route.name) < 0 ? true : false;
    }
  },
  methods: {
    initInfo(){
      let token = this.common.getCookie('token') || null;
      if(token){
        this.$store.state.token = token;
      }
      let user = this.common.storage('user') || null;
      if(user){
        this.$store.state.user = user;
      }
    },
    logout() {
      //退出登录
      this.common.delCookie();
      this.$store.state.token = "";
      localStorage.clear()
      setTimeout(() => {
        window.location.href='/login'
      }, 200);
    },
  },
  mounted() {
    //console.log(this.common_data);
    //全局监听退出登录
    this.common.on("logout", () => {
      this.logout();
    });
    setTimeout(() => {
      this.show = true;
    }, 500);
  },
  created() {
    this.initInfo();
  },
};
</script>

<style lang="postcss">
@import "assets/css/root.css";
</style>

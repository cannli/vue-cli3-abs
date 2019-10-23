<template>
  <section class="app-main">
    <breadcrumb class="breadcrumb-container" v-show="breadcrumbShow"/>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
    </transition>
  </section>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    components:{Breadcrumb},
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.path
      },
      breadcrumbShow (){
        const path = this.$route.path
        return path !== '/index'
      }
    }
  }
</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    box-sizing: border-box;
    min-height: calc(100vh - 75px);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding-left: 20px;
    padding-right: 20px;

  }

  .fixed-header + .app-main {
    padding-top: 75px;
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>

<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" v-show="!activeComp"/>
    <!--<logo v-show="activeComp" :collapse="false" :logoBJ="true" class="activeComp_logo"/>-->
   <!-- <breadcrumb class="breadcrumb-container"/>-->
    <div class="activeComp_logo" v-show="activeComp">
      <!-- <img v-if="logo" :src="logo" class="sidebar-logo">-->
      <h1 class="sidebar-title">资产ABS</h1>
    </div>

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="'#ffffff'"
      @select="handleSelect"
      style="display: inline-block">
      <el-menu-item index="1">我的工作台</el-menu-item>
      <el-menu-item v-for="x in myMenuSide" :index="x.pageMenu.toString()" :key="x.pageMenu">{{x.names}}</el-menu-item>
    </el-menu>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import Logo from './Sidebar/Logo'
  import variables from '@/styles/variables.scss'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      Logo
    },
    data() {
      return {
        myMenuSide: [],
        activeIndex: '1',
      }
    },
    watch: {
      menuSide(nVal) {
        this.myMenuSide = Object.values(nVal).filter(item => item[0].pageMenu !== 1).map(val => val[0])
        console.log(this.myMenuSide, 'this.myMenuSide');
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'menuSide'
      ]),
      activeComp() {
        return this.$route.meta.side
      },
      variables() {
        return variables
      },
    },
    mounted() {
      // setTimeout(() => {
      //   console.log(this.menuSide, 'menuSide')
      // }, 0)

    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      handleSelect(key, keyPath) {
        console.log(key);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar .el-menu-item.is-active {
    background: #409EFF !important;
    border-bottom: 4px solid #ffffff;
    font-weight: bold;
  }

  .navbar {
    height: 60px;
    overflow: hidden;
    position: relative;
    background: #00243b;
    border-bottom: 1px solid #185881;
    .activeComp_logo {
      width: 200px;
      display: inline-block;
      vertical-align: top;
      padding: 0 20px;
      .sidebar-title {
        margin: 0;
        color: #8cc5ff;
        line-height: 60px;
      }
    }
    .hamburger-container {
      line-height: 60px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 10px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>

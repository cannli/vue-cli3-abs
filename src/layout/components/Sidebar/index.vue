<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        unique-opened
      >
        <el-submenu
          v-for="item in menuSide[$route.meta.systemName]"
          ref="subMenu" :index="item.names"
          popper-append-to-body
        >
          <template slot="title">
            <item :icon="itemColor[item.routeKey]" :title="item.names"/>
          </template>
          <el-menu-item
            v-for="(subItem,i) in item.details"
            :key="subItem.link"
            :index="subItem.link"
            @click.native=""
            v-show="subItem.active!=false" class="menu-list"
          >
            {{ subItem.names }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Logo from './Logo'
  import variables from '@/styles/variables.scss'
  import Item from './Item'

  export default {
    components: {Logo, Item},
    data(){
      return{
        itemColor:{
          overview: 'eye',
          assertPool: 'dashboard',
          assertPackage: 'form',
          durationManage: 'table',
          projectSystemIcon: 'tree',
          setupAllSet: 'user',
          durationManagement: 'eye-open',
          scenario: 'nested'
        }
      }
    },
    watch: {
      menuSide(nVal) {
        this.myMenuSide = nVal
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'menuSide'
      ]),
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

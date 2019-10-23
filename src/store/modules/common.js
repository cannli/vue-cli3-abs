import Vue from 'vue'
import {getMenuList} from '@/api/common/common'

// menu 后台key 与 前台 一一 对应
const menuKey = {
  project: 1,
  financialManagement: 3,
  financialManagementNew: 4,
  organizational: 5,
  system: 2,
}

// 简析 menus 得到侧边栏 按钮
function menuSideFn(result, dataInterType) {
  let menuSide = {                          // 侧边栏menu
    project: [],                       // 我的项目
    system: [],                        // 系统管理
    financialManagement: [],           // 财务管理（旧）
    financialManagementNew: [],         // 财务管理（新）
    organizational: [],                // 公司管理
    operationsWeekly: []               // 运营周报
  }
  let systemDev = false                // 白名单
  if (result.length > 0) {
    for (let x in result) {
      if (parseInt(result[x].pageMenu) === 2) {
        menuSide.system.push(result[x])
      } else if (parseInt(result[x].pageMenu) === 1) {
        menuSide.project.push(result[x])
      } else if (parseInt(result[x].pageMenu) === 3) {
        menuSide.financialManagement.push(result[x])
      } else if (parseInt(result[x].pageMenu) === 4) {
        menuSide.financialManagementNew.push(result[x])
      } else if (parseInt(result[x].pageMenu) === 5) {
        menuSide.organizational.push(result[x])
      } else if (parseInt(result[x].pageMenu) === 8) {
        systemDev = true
      } else if (parseInt(result[x].pageMenu) === 9) {
        menuSide.operationsWeekly.push(result[x])
      }
    }
    let menusProject = menuSide.project
    if (menusProject.length > 0) {
      for (let i in menusProject) {
        for (let y in menusProject[i].details) {
          if (dataInterType === 'INTERFACE') { // 接口传输
            if (menusProject[i].details[y].link === '/assertPool/assertImport' ||
              menusProject[i].details[y].link === '/assertPool/repaymentPlanImport' ||
              menusProject[i].details[y].link === '/overview/dataAddProject') {
              menusProject[i].details[y].active = false
            }
            if (menusProject[i].details[y].link === '/assertPool/buyBackList') {
              menusProject[i].details[y].active = true
            }
          } else {
            menusProject[i].details[y].active = true
            if (menusProject[i].details[y].link === '/overview/dataAddProject' || menusProject[i].details[y].link === '/assertPool/buyBackList') {
              menusProject[i].details[y].active = false
            }
          }
        }
      }
    }
  }
  return menuSide
}

const state = {
  // 项目id
  projectId: '',
  // 入池数据来源
  dataInterType: '',
  // 项目名字
  projectName: '',
  // 项目类型 车贷 房贷 购物贷
  projectType: '',
  // 如果添加新项目需要更新我的项目下的项目列表
  projectUpdate: Boolean,

  menuSide: {                          // 侧边栏menu
    project: [],                       // 我的项目
    system: [],                        // 系统管理
    financialManagement: [],           // 财务管理（旧）
    financialManagementNew: [],         // 财务管理（新）
    organizational: [],                // 公司管理
    operationsWeekly: [],              // 运营周报
  },

  menuHeader: [],                      // header menu

  // menuObjShow: {               // header 中 tab 的显示跟隐藏
  //   projectSetShow: false,     // 项目设置
  //   project: false,          // 我的项目
  //   financialManagementNew: false,       // 新财务
  //   financialManagement: false,       // 旧财务
  //   organizational: false,            // 公司
  //   operationsWeekly: false,   // 运营周报
  //   system: false,             // 权限
  //   systemDev: false,          // 白名单
  // },
  buttons: [],
  // 白名单
  systemDev: false
}

const getters = {
  getProjectId(state, getters) {
    return state.projectId
  },
  getMenuSide(state) {
    return state.menuSide
  }
}

const mutations = {
  set_menuSide: (state, val) => {
    state.menuSide = val
  },
  set_menuHeader: (state, val) => {
    state.menuHeader = val
  },
  set_button_admin: (state, val) => {
    state.buttons = val
  },

  // 常用的几个参数
  set_projectId: (state, val) => {
    state.projectId = val
  },
  set_dataInterType: (state, val) => {
    state.dataInterType = val
  },
  set_projectName: (state, val) => {
    state.projectName = val
  },
  set_projectType: (state, val) => {
    state.projectType = val
  },
  set_projectUpdate: (state, val) => {
    state.projectUpdate = val
  },
}
// if (result.buttons.length > 0) {
//   buttons.push(...result.buttons)
//   self.$store.commit('menuButtonArr_change', buttons)
// }
const actions = {
  getMenuList(context, bool = false) {
    const projectId = context.getters.getProjectId
    const dataInterType = context.getters.dataInterType
    return new Promise((resolve, reject) => {
      getMenuList({projectId}).then(res => {
        const data = res.data
        const menus = data.menus
        context.commit('set_button_admin', data.buttons)
        context.commit('set_menuSide', menuSideFn(menus, dataInterType))
        //   console.log(context.state.menuSide, 'menuSide')
        if (bool) {
          context.commit('set_projectUpdate', true)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setFlagsData(context, col) {
    Vue.ls.set('dataInterType', col.dataInterType) // 入池数据来源
    Vue.ls.set('projectId', col.projectId)
    Vue.ls.set('projectName', col.projectName)
    Vue.ls.set('projectType', col.projectType)

    context.commit('set_dataInterType', col.dataInterType) // 入池数据来源,用于隐藏资产合同，初始还款计划
    context.commit('set_projectId', col.projectId)
    context.commit('set_projectName', col.projectName)
    context.commit('set_projectType', col.projectType)
  },
  getFlagsData(context) {
    context.commit('set_dataInterType', Vue.ls.get('dataInterType')) // 入池数据来源,用于隐藏资产合同，初始还款计划
    context.commit('set_projectId', Vue.ls.get('projectId'))
    context.commit('set_projectName', Vue.ls.get('projectName'))
    context.commit('set_projectType', Vue.ls.get('projectType'))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

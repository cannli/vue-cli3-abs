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
    operationsWeekly: [],              // 运营周报
  }
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
            if (menusProject[i].details[y].link === '/overview/dataAddProject') {
              menusProject[i].details[y].active = false
            }
            if (menusProject[i].details[y].link === '/assertPool/buyBackList') {
              menusProject[i].details[y].active = false
            }
          }
//              if (menusProject[i].details[y].link === '/durationManage/cashCreate') {
//                menusProject[i].details[y].active = false
//              }
        }
      }
    }
  }
  return menuSide
}

const state = {
  projectId: '',                       // 项目id

  menuSide: {                          // 侧边栏menu
    project: [],                       // 我的项目
    system: [],                        // 系统管理
    financialManagement: [],           // 财务管理（旧）
    financialManagementNew: [],         // 财务管理（新）
    organizational: [],                // 公司管理
    operationsWeekly: [],              // 运营周报
  },

  menuHeader: [],                      // header menu

  menuObjShow: {               // header 中 tab 的显示跟隐藏
    projectSetShow: false,     // 项目设置
    project: false,          // 我的项目
    financialManagementNew: false,       // 新财务
    financialManagement: false,       // 旧财务
    organizational: false,            // 公司
    operationsWeekly: false,   // 运营周报
    system: false,             // 权限
    systemDev: false,          // 白名单
  },
  buttons: [],

  // 入池数据来源
  dataInterType: '',
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
  set_projectId: (state, val) => {
    state.projectId = val
  },
  set_button_admin: (state, val) => {
    state.buttons = val
  },
  set_dataInterType: (state, val) => {
    state.dataInterType = val
  },
}
// if (result.buttons.length > 0) {
//   buttons.push(...result.buttons)
//   self.$store.commit('menuButtonArr_change', buttons)
// }
const actions = {
  getMenuList(context) {
    const projectId = context.getters.getProjectId
    const dataInterType = context.getters.dataInterType
    return new Promise((resolve, reject) => {
      getMenuList({projectId}).then(res => {
        const data = res.data
        const menus = data.menus

        context.commit('set_button_admin', data.buttons)

        context.commit('set_menuSide', menuSideFn(menus, dataInterType))

        //   console.log(context.state.menuSide, 'menuSide')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

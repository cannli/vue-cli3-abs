/**
 * @file: common.
 * @intro: 公共数据据配置.
 * @author: v_cannli
 * @email: 17620317584@163.com.
 * @Date: 2019/10/14.
 */
import fetch from '../../utils/fetch'

// 获取全局 Menu
export function getMenuList(data){
  return fetch({
    url: window.absContextPrivilege + '/menu/getMenuList.do',
    method: 'post',
    data: data
  })
}

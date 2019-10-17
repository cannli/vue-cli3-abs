import fetch from '../utils/fetch'

/*
* 获取project list 数据
* */
export function getProjectList(data) {
  return fetch({
    url: window.absContext + '/project/getProjectList.do',
    method: 'post',
    data: data
  })
}

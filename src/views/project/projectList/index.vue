<template>
  <div>
    <div class="a-mar-top20" style="padding-bottom: 0">
      <titleAnt title="我的项目">
        <div slot="right-content">
          <el-button type="text">新建项目</el-button><!--<!--@clickBotFn="addProject" v-if="menuIsBool(menuButtonArr, '新建项目')"-->
        </div>
      </titleAnt>
      <el-form label-position="top" label-width="80px" :model="formLabel">
        <el-row>
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <el-form-item label="名称">
              <el-autocomplete
                clearable
                style="width: 80%;"
                prefix-icon="el-icon-search"
                v-model.trim="formLabel.queryCondition"
                :fetch-suggestions="querySearch"
                clearable
                placeholder="输入项目名称/项目ID查询">
              </el-autocomplete>
            </el-form-item>
          </el-col>

          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <el-form-item label="项目类型">
              <el-select
                style="width: 80%;"
                v-model="formLabel.projectType"
                filterable
                placeholder="请选择项目类型"
                default-first-option>
                <el-option
                  v-for="item in projectSelectData"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <el-form-item label="开始时间">
              <el-date-picker
                style="width: 80%;"
                v-model="formLabel.startTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <el-form-item label="结束时间">
              <el-date-picker
                style="width: 80%;"
                v-model="formLabel.endTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="18" :lg="12" :xl="12">
            <el-form-item label="项目状态">
              <el-checkbox-group v-model="formLabel.checkList" style="display: inline-block;">
                <el-checkbox :label="item.val" v-for="item in projectStateDataSelect" :key="item.val">{{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>

          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" style="margin-top: 10px;">
            <el-form-item label=' '>
              <el-button type="primary" style="margin-right: 10px;" @click="">查 询</el-button>
              <el-button @click="">重 置</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getProjectList} from '@/api/myProject'

  export default {
    name: "index",
    data() {
      return {
        projectStateDataSelect: [
          {name: '项目立项', val: '1'},
          {name: '资产池建立', val: '3'},
          {name: '资产包封包', val: '4'},
          {name: '产品发行', val: '5'},
          {name: '存续期结束', val: '6'}
        ],
        projectSelectData: [
          {value: "个人消费贷款", key: "PERSONAL_CONSUME"},
          {value: "汽车抵押贷款", key: "CAR_MORTGAGE"},
          {value: "住房抵押贷款", key: "HOUSE_MORTGAGE"}
        ],
        formLabel: {
          queryCondition: '',
          projectType: '',
          startTime: '',
          endTime: '',
          checkList: []
        }
      }
    },
    created() {
      getProjectList()
    },
    methods: {
      querySearch(query, cd) {
        let self = this
        let {projectType, startTime, endTime, checkList} = self.formLabel
        let list = []
        let timeout = null
        let params = {
          queryCondition: query,
          status: checkList.join(','),
          projectType: projectType,         // 项目类型
          startTime: startTime,
          endTime: endTime,
          pageNum: 1,
          pageSize: 10
        }
        getProjectList(params).then(res => {
          list = res.page.list
          for (let i of list) {
            i.value = i.projectName
          }
          console.log(list, 888888)
          cd(list)
        })
      }
    }

  }
</script>

<style scoped>

</style>

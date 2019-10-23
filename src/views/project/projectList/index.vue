<template>
  <div>
    <div class="a-mar-top20" style="padding-bottom: 0">
      <titleAnt title="我的项目">
        <div slot="right-content">
          <el-button type="text">新建项目</el-button><!--<!--@clickBotFn="addProject" v-if="menuIsBool(menuButtonArr, '新建项目')"-->
        </div>
      </titleAnt>
      <el-form label-position="top" label-width="80px" :model="ruleForm" ref="ruleForm">
        <el-row>
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <el-form-item label="名称">
              <el-autocomplete
                clearable
                style="width: 80%;"
                prefix-icon="el-icon-search"
                v-model.trim="ruleForm.queryCondition"
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
                v-model="ruleForm.projectType"
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
                v-model="ruleForm.startTime"
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
                v-model="ruleForm.endTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="18" :lg="12" :xl="12">
            <el-form-item label="项目状态">
              <el-checkbox-group v-model="ruleForm.checkList" style="display: inline-block;">
                <el-checkbox :label="item.val" v-for="item in projectStateDataSelect" :key="item.val">{{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>

          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" style="margin-top: 5px;">
            <el-form-item label=' '>
              <el-button type="primary" @click="">查 询</el-button>
              <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>

      <eltable :tableData="tableData" :tableColumns="tableColumns" @rowClick="rowClick">
        <el-table-column
          label="操作"
          align="right"
          width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="">查看</el-button>
          </template>
        </el-table-column>
      </eltable>
    </div>

    <pagination
      :tableData="tableData"
      :pageNum="pageNum"
      :total="total"
      @getDataList="getData">
    </pagination>

  </div>
</template>

<script>
  import {getProjectList} from '@/api/myProject'
  import eltable from '@/components/table/default.vue'

  export default {
    name: "index",
    components: {eltable},
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
        ruleForm: {
          queryCondition: '',
          projectType: '',
          startTime: '',
          endTime: '',
          checkList: []
        },
        tableData: [],
        tableColumns: [
          {key: 'projectId', name: '项目编号'},
          {key: 'projectName', name: '项目名称'},
          {key: 'assetAmount', name: '资产规模(元)', formatNum: true},
          {key: 'projectTime', name: '立项时间'},
          {key: 'createPeople', name: '创建人'},
          {key: 'projectState', name: '项目状态'},
        ],
        pageNum: 1, // 现在第几页
        total: 0,
        pageSize: 10,
      }
    },
    created() {
      this.getData()
    },
    methods: {
      querySearch(query, cd) {
        let self = this
        let {projectType, startTime, endTime, checkList} = self.ruleForm
        let list = []
        let timeout = null
        let params = {
          queryCondition: query,
          // status: checkList.join(','),
          // projectType: projectType,         // 项目类型
          // startTime: startTime,
          // endTime: endTime,
          pageNum: 1,
          pageSize: 10
        }
        getProjectList(params).then(res => {
          list = res.page.list
          for (let i of list) {
            i.value = i.projectName
          }
          cd(list)
        })
      },
      // get data
      getData(page = 1, pageSizes = this.pageSize) {
        let {queryCondition, projectType, startTime, endTime, checkList} = this.ruleForm
        let params = {
          queryCondition: queryCondition,
          status: checkList.join(','),
          projectType: projectType,         // 项目类型
          startTime: startTime,
          endTime: endTime,
          pageNum: page,
          pageSize: pageSizes
        }
        this.pageSize = pageSizes
        //  this.tableData = []
        getProjectList(params).then(res => {

          this.tableData = res.page.list
          this.pageNum = res.page.pageNum
          this.total = res.page.total
          console.log(this.tableData, 'tableData11')
        })
      },
      rowClick(row) {
        this.$store.dispatch('common/setFlagsData', row)
        this.$store.dispatch('common/getMenuList')
        this.$router.push({path: '/overview/baseInfo'})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

  }
</script>

<style scoped>

</style>

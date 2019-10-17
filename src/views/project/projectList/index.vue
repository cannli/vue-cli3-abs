<template>
  <div>
    <div class="a-mar-top20" style="padding-bottom: 0">
      <titleAnt title="我的项目">
        <div slot="right-content">
          <el-button type="text">新建项目</el-button><!--<!--@clickBotFn="addProject" v-if="menuIsBool(menuButtonArr, '新建项目')"-->
        </div>
      </titleAnt>
    </div>
  </div>
</template>

<script>
  import {getProjectList} from '@/api/myProject'

  export default {
    name: "index",
    created() {
      getProjectList()
    }
  }
</script>

<style scoped>

</style>

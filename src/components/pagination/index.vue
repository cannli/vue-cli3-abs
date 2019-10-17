<template>
  <div class="pagination-foot" v-if="tableData.length!=0">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizesArr"
      :page-size="pageSizeProp"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="disabled">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      total: {
        type: Number,
        default: 0
      },
      tableData: {
        type: Array,
        default: []
      },
      pageNum: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      pageSizeProp: {
        type: Number,
        default: 10
      },
      pageSizesArr: {
        type: Array,
        default: () => [5, 10, 20, 30, 40]
      }
    },
    data () {
      return {
        // 分页
        currentPage: this.pageNum,
        // total: 0,
        pageSize: this.pageSizeProp
      }
    },
    created () {
    },
    mounted () {
      this.$nextTick(() => {
      })
    },
    computed: {},
    watch: {
      pageNum (val) {
        this.currentPage = val
      },
      pageSizeProp (val) {
        this.pageSize = val
      }
    },
    methods: {
      // 分页
      handleSizeChange (val) {
        this.pageSize = val
        this.currentPage = 1
        this.$emit('getDataList', this.currentPage, this.pageSize)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.$emit('getDataList', this.currentPage, this.pageSize)
        // console.log(`当前页: ${val}`)
      }
    },
    beforeUpdate () {
    },
    updated () {
    },
    beforeDestroy () {
    },
    destroyed () {
    }

  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  /*分页*/
  .pagination-foot {
    padding: 20px 0;
    background: #ffffff;
    text-align: center;
  }

</style>
<style>
  .el-pagination .el-select .el-input .el-input__inner {
    margin-top: -4px;
  }

  .el-pagination__editor.el-input .el-input__inner {
    border-radius: 3px;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #00A2FF !important;
  }
</style>

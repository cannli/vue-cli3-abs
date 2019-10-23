<template>

  <el-table :data="myData" border style="width: 100%;" @row-click="rowClick">
    <el-table-column v-for="column in tableColumns" :prop="column.key" :key="column.key" :label="column.name" :width="column.width" :align="column.align||'right'" show-overflow-tooltip>
      <template slot-scope="scope">
        <div v-if="column.formatNum">
          {{ formatNum(scope.row[column.key]) }}
        </div>
        <span v-else>
          {{scope.row[column.key]}}
        </span>
      </template>
    </el-table-column>

    <slot></slot>

  </el-table>

</template>

<script>
  export default {
    name: "default",
    props: {
      tableData: Array,
      tableColumns: Array
    },
    data() {
      return {
        myData: this.tableData
      }
    },
    watch: {
      tableData(nVal) {
        console.log(nVal,'88888888')
        this.myData = nVal
      }
    },
    methods: {
      rowClick(row, column, event){
       this.$emit('rowClick', row)
      }
    }
  }
</script>

<style scoped>

</style>

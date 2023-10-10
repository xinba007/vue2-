<template>
  <div>
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="changePage($event, 'limit')"
      @current-change="changePage($event, 'page')"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "page",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10,20, 50, 100],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  methods: {
    /*切换当前页或每页数量*/
    changePage(val, type) {
      this.$emit(`update:${type}`, val)
      this.$emit("getList")
    },
  },
}
</script>

<style scoped lang="scss">
/deep/.el-pagination{
  padding: 10px!important;
}
</style>

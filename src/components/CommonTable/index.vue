<template>
  <div class="common-table-container">
    <el-table
      highlight-current-row
      stripe
      v-bind="$attrs"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
      v-if="domPermission(columns.isSee)"
    >
      <el-table-column v-if="columns.index" type="index" align="center" width="55" />
      <el-table-column v-if="columns.selection" type="selection" align="center" width="55" />
      <el-table-column
        v-for="(tr, index) in columns.tr"
        :key="index"
        :prop="tr.prop"
        :label="tr.label"
        :width="tr.width || ''"
        :align="tr.align || 'left'"
        show-overflow-tooltip
        v-if="permission(tr.permission)"
      >
        <template slot-scope="{row}">
          <slot v-if="tr.el === 'slot'" :name="tr.prop" :row="row" />
          <section v-else>{{row[tr.prop]}}</section>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <section class="pagination-container" v-if="domPermission(columns.isSee)">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[10, 20, 30]"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query.total"
      ></el-pagination>
    </section>
  </div>
</template>

<script>
/* table通用组件 */
import { checkPermission } from "@/directives/permission";

export default {
  name: "common-table",
  props: {
    columns: {
      type: Object,
      default: () => {}
    },
    query: {
      type: Object,
      default() {}
    }
  },
  methods: {
    permission(roles) {
      if (!roles) return true;
      else if (roles instanceof Array && roles.length > 0)
        return checkPermission(roles);
      return false;
    },
    domPermission(role) {
      if (!role) return true;
      else return checkPermission([role]);
    },
    handleSelectionChange(val) {
      this.$emit("selection-change", val);
    },
    handleSizeChange(size) {
      this.query.limit = size;
      this.$emit("initList");
    },
    handleCurrentChange(page) {
      this.query.page = page;
      this.$emit("initList");
    },
    rowClick(Row, Event, Column) {
      const data = {
        row: Row,
        event: Event,
        column: Column
      };
      this.$emit("row-click", data);
    }
  }
};
</script>
<template>
  <div class="toolbar-container">
    <el-form inline>
      <el-form-item v-for="(bar, i) in columns" :key="i">
        <!-- 数据框，提供回调，回车事件 -->
        <el-input
          v-if="bar.el === 'input' && permission(bar.permission)"
          v-model="query[bar.key]"
          :placeholder="bar.placeholder"
          @keyup.enter.native="$emit(bar.callback)"
          clearable
        ></el-input>
        <!-- 按钮，提供回调 需要属性 label -->
        <el-button
          v-if="bar.el === 'button' && permission(bar.permission)"
          :type="bar.type || 'primary'"
          @click="$emit(bar.callback)"
        >{{bar.label}}</el-button>
        <!-- 提供插槽 需要属性 name -->
        <slot v-if="bar.el === 'slot'" :name="bar.name" :target="query" :field="bar.key" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* 搜索工具栏通用组件 */
import { checkPermission } from "@/directives/permission";

export default {
  name: "tool-bar",
  props: {
    columns: {
      type: Array,
      default: () => []
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
    }
  }
};
</script>

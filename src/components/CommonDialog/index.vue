<template>
  <div class="common-dialog-container">
    <el-dialog :visible.sync="isShow" v-bind="$attrs" append-to-body :before-close="beforeClose">
      <template slot="title">
        <span>{{ title }}</span>
      </template>
      <!-- 表单 -->
      <el-form ref="form" :model="form" v-bind="$attrs">
        <el-form-item
          v-for="(item, i) in columns"
          :key="i"
          :label="item.label"
          :prop="item.key"
          :rules="item.rules"
        >
          <!-- 输入框 -->
          <el-input
            v-if="item.el === 'input'"
            v-model="form[item.key]"
            :placeholder="item.placeholder"
            :maxlength="item.maxlength"
            :minlength="item.minlength"
            :style="{ width: item.width || '80%' }"
          ></el-input>
          <!-- 文本域输入框 -->
          <el-input
            v-if="item.el === 'textarea'"
            type="textarea"
            v-model="form[item.key]"
            :placeholder="item.placeholder"
            :maxlength="item.maxlength"
            :minlength="item.minlength"
            :rows="item.rows || 2"
            :style="{ width: item.width || '80%' }"
          ></el-input>
          <!-- 插槽 -->
          <slot v-if="item.el === 'slot'" :name="item.name" :target="form" :field="item.key" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleValid">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* 公共dialog */
export default {
  data() {
    return {
      isShow: false
    };
  },
  props: {
    /* 表单属性 */
    columns: {
      type: Array,
      default: () => []
    },
    /* 表单提交对象 */
    form: {
      type: Object,
      default() {}
    },
    /* 标题 */
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    beforeClose() {
      this.isShow = false;
      this.$emit("beforeClose");
    },
    /* 表单校验 */
    handleValid() {
      this.$refs.form.validate(valid => {
        if (valid) this.$emit("submit");
      });
    },
    /* 关闭dialog */
    close() {
      this.isShow = false;
    },
    /* 打开dialog */
    show() {
      /* 清除表单校验 */
      this.$nextTick(() => this.$refs.form.clearValidate());
      this.isShow = true;
    }
  }
};
</script>
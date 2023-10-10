<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon icon-class="size" class-name="ali-size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="size==='medium'" command="medium">大</el-dropdown-item>
      <!-- Medium -->
      <el-dropdown-item :disabled="size==='small'" command="small">中</el-dropdown-item>
      <!-- Small -->
      <el-dropdown-item :disabled="size==='mini'" command="mini">小</el-dropdown-item>
      <!-- Mini -->
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    size() {
      return this.$store.getters.size;
    }
  },
  methods: {
    handleSetSize(size) {
      this.$ELEMENT.size = size;
      this.$store.dispatch("setSize", size);
      this.refreshView();
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch("delAllCachedViews", this.$route);

      const { fullPath } = this.$route;

      this.$nextTick(() => {
        this.$router.replace({
          path: "/redirect" + fullPath
        });
      });
    }
  }
};
</script>

<style scoped>
.ali-size {
  font-size: 18px;
  cursor: pointer;
}
</style>


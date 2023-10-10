<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon icon-class="language" class-name="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);
      this.refreshView();
      // this.$notify.success(this.$t("lang.msg"));
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
<style lang="scss" scope>
.language {
  cursor: pointer;
  font-size: 20px;
  display: block;
}
</style>
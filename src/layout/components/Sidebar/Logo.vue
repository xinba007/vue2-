<template>
  <el-menu-item
    v-if="sidebarLogo"
    :class="{'submenu-title-noDropdown':isCollapse}"
    index="0"
    style="pointer-events: none;"
  >
    <svg-icon v-if="isCollapse" icon-class="logo" class-name="logo" />
    <div class="logo-con">
      <img src="https://aurora-1255840532.cos.ap-chengdu.myqcloud.com/logo.png" />
    </div>
  </el-menu-item>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Logo",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      sidebarLogo: state => state.settings.sidebarLogo
    })
  }
};
</script>

<style lang="scss" scoped>
.logo {
  margin-left: 20px;
}
img {
  width: 150px;
}
</style>

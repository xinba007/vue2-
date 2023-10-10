<template>
  <div class="icon-button-container">
    <el-tooltip v-if="title" effect="dark" :content="title" placement="bottom">
      <svg-icon :icon-class="icon" class-name="icon" :class="size" />
    </el-tooltip>
    <svg-icon v-else :icon-class="icon" class-name="icon" />
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      size: Cookies.get("size")
    };
  },
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-button-container {
  margin-right: 15px;
  display: inline;
  .icon {
    cursor: pointer;
    color: #507aef;
  }
  .medium {
    font-size: 22px;
  }
  .small {
    font-size: 19px;
  }
  .mini {
    font-size: 16px;
  }
}
</style>
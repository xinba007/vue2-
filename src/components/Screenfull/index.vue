<template>
  <svg-icon icon-class="screenfull" class-name="screenfull" @click="click" />
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  props: {
    width: {
      type: Number,
      default: 22
    },
    height: {
      type: Number,
      default: 22
    },
    fill: {
      type: String,
      default: "#48576a"
    }
  },
  data() {
    return {
      isFullscreen: false
    };
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    }
  }
};
</script>

<style scoped>
.screenfull {
  font-size: 20px;
  cursor: pointer;
  color: #606266;
}
</style>

<template>
  <el-dialog
    ref="imgMask"
    :visible.sync="dialogVisible"
    :before-close="closeDialog"
    append-to-body
    style="background: none;box-shadow: none"
    :close-on-click-modal="false"
    :show-close="false"
    top="0"
  >
    <div class="container" @click="closeDialog">
      <div class="big_img_box">
        <img :src="fileUrls[selectIndex]" alt="" class="big_img">
      </div>
      <div class="select_bar" v-if="fileUrls.length > 1">
        <img :src="item" alt="" v-for="(item, index) in fileUrls" :key="index" :class="selectIndex == index ? 'border' : ''" @click.stop="selectIndex = index">
      </div>
      <div class="close" @click="closeDialog"><i class="el-icon-circle-close"></i></div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      fileUrls: [],
      selectIndex: 0
    };
  },
  components: {},
  methods: {
    showDialog(fileList, index) {
      this.dialogVisible = true
      this.fileUrls = fileList
      this.selectIndex = index || 0
    },
    closeDialog() {
      this.selectIndex = 0
      this.dialogVisible = false
    },
  },
};
</script>
<style scoped>
/deep/.el-dialog {
  background: none;
  box-shadow: none;
  width: 100%;
  height: 100%;
  margin: 0;
}
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-dialog__body {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 0;
}
</style>
<style lang="scss" scoped>
  .container{
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
  }
  .big_img_box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 100%;
    height: calc(100% - 100px);
  }
  .big_img{
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
  }
  .select_bar{
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 56px;
      height: 56px;
      margin-right: 12px;
      border-radius: 2px;
    }
    .border{
      border: 1px solid #4979FF
    }
  }
  .close{
    position: absolute;
    top: 5px;
    right: 5px;
    i{
      font-size: 30px;
      color: white
    }
  }
</style>
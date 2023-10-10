<template>
  <div class="upload-img-container">
    <el-upload
      :data="uploadData"
      :before-upload="handleBefore"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :action="OSS_URL"
      list-type="picture-card"
    >
      <img v-if="url" :src="url" @click.stop="imgRemove" />
      <i v-else class="el-icon-plus" />
    </el-upload>
  </div>
</template>
<script>
import { getAliOSSUploadSign } from "@/api/upload"; // 获取api
import { OSS_URL } from "config";
export default {
  props: {
    url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      OSS_URL,
      uploadOssObj: {}, // 上传的密钥
      dir: "statice-resource/finance",
      uploadData: {
        OSSAccessKeyId: "",
        signature: "",
        expire: "",
        host: "",
        dir: "",
        key: "",
        name: "",
        success_action_status: "200",
        policy: ""
      }
    };
  },
  methods: {
    imgRemove() {
      this.$confirm("确认删除？")
        .then(() => {
          this.$emit("update:url", "");
        })
        .catch(() => {});
    },
    handleRemove() {
      this.$emit("update:url", "");
    },
    async getOssSign() {
      const { status, body } = await getAliOSSUploadSign(this.dir);
      if (status === 200) this.uploadOssObj = body;
    },
    async handleBefore(e) {
      await this.getOssSign();
      this.uploadData.OSSAccessKeyId = this.uploadOssObj.accessid;
      this.uploadData.signature = this.uploadOssObj.signature;
      this.uploadData.expire = this.uploadOssObj.expire;
      this.uploadData.host = this.uploadOssObj.host;
      this.uploadData.dir = this.uploadOssObj.dir;
      this.uploadData.policy = this.uploadOssObj.policy;
      const timeStamp = parseInt(new Date().getTime() / 1000) + "";
      const uploadFileUr =
        this.uploadData.dir + "/" + timeStamp + "/" + timeStamp;
      this.uploadData.key = uploadFileUr;
      this.uploadData.name = e.name;
    },
    handleSuccess() {
      const _url = OSS_URL + this.uploadData.key;
      this.$emit("update:url", _url);
    }
  }
};
</script>
<style lang="scss">
.upload-img-container {
  display: inline-block;
  img {
    width: 80px;
    height: 80px;
  }
  .el-upload-list {
    display: inline-block;
    .el-upload-list__item {
      display: inline-block;
      height: 80px;
      width: 80px;
    }
  }
  .el-upload--picture-card {
    line-height: 80px;
    width: 80px;
    height: 80px;
  }
}
</style>


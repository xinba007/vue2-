<template>
  <div class="upload-file-container">
    <el-upload
      :data="uploadData"
      :before-upload="handleBefore"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :show-file-list="false"
      :on-error="handleError"
      multiple
      :limit='limit'
      :action="OSS_URL"
      :accept="accept"
      ref="upload"
    >
      <el-button type="primary" :disabled="loading" :loading="loading">{{btnText}}</el-button>
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
    },
    limit: {
        type: Number,
        default: 1
    },
    btnText: {
        type: String,
        default: '上传'
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      OSS_URL,
      uploadOssObj: {}, // 上传的密钥
      dir: "courseware/",
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
    fileRemove() {
      this.$emit("update:url", "");
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
      this.uploadData.name = e.name;
      const uploadFileUr = this.uploadData.dir +'/' +this.uploadData.name;
      this.uploadData.key = uploadFileUr;
      this.loading = true
    },
    handleSuccess() {
      this.loading = false
      const _url = OSS_URL + this.uploadOssObj.dir+ '/' +  encodeURIComponent(this.uploadData.name) ;
      this.$emit("uploadSuccess",{url: _url,name: this.uploadData.name});
      this.$refs.upload.clearFiles()
    },
    handleError(){
      this.loading = false
    }
  }
};
</script>
<style lang="scss">
.upload-file-container {
  display: inline-block;
  .download-container {
    display: flex;
    align-items: center;
    a {
      white-space: nowrap; /*强制span不换行*/
      display: inline-block; /*将span当做块级元素对待*/
      width: 250px; /*限制宽度*/
      overflow: hidden; /*超出宽度部分隐藏*/
      text-overflow: ellipsis; /*超出部分以点号代替*/
      cursor: pointer;
      color: #303133;
    }
  }
  .el-icon-delete {
    cursor: pointer;
  }
}
</style>


<template>
  <div class="update_img_container">
    <div class="add_img" :style="{width: width, height: height }" v-for="(item, index) in urlList" :key="index" v-show="index+1 <= limit">
      <img class="img_src" :src="`${item}`"/>
      <div class="img_operation" v-if="isEdit || isView || isDelete">
        <div class="operation_btn">
          <!-- 编辑 -->
          <i class="el-icon-edit-outline" v-if="isEdit" @click="onAddImg(index, 'edit')"></i>
          <!-- 预览 -->
          <i class="el-icon-zoom-in" v-if="isView" @click="onView(index)"></i>
          <!-- 删除 -->
          <i class="el-icon-delete" v-if="isDelete" @click="onDelete(index)"></i>
        </div>
      </div>
      <el-progress v-if="editOrAdd === 'edit' && !!progress[index] && progress[index] !== 100" class="img_progress" :text-inside="true" :stroke-width="12" :percentage="progress[index]"></el-progress>
    </div>
    <div v-if="showAdd" class="add_img" :style="{width: width, height: height }" @click="onAddImg(urlList.length, 'add')">
      <i class="el-icon-plus add_plus"></i>
      <el-progress v-if="!!progress[urlList.length] && progress[urlList.length] !== 100" class="img_progress" :text-inside="true" :stroke-width="12" :percentage="progress[urlList.length]"></el-progress>
    </div>
    <input class="input_file" ref="inputFile" type="file" @change="onChange"/>
    <GLViewImg ref="viewImg"></GLViewImg>
  </div>
</template>
<script>
import axios from 'axios'
import utils from '@/utils/utils'
import { getToken } from "@/utils/Auth"
import { ProxyUri, OSS_URL } from "config"
export default {
  props: {
    // 宽
    width: {
      type: String,
      default: '80px'
    },
    // 高
    height: {
      type: String,
      default: '80px'
    },
    // 图片list
    urlList: {
      type: [Array, String],
      default: []
    },
    // 是否可以多传，默认是
    showList: {
      type: Boolean,
      default: true
    },
    // 最多上传的图片个数，默认 2
    limit: {
      type: [Number, String],
      default: 2
    },
    // 是否允许编辑
    isEdit: {
      type: Boolean,
      default: true
    },
    // 是否允许查看
    isView: {
      type: Boolean,
      default: true
    },
    // 是否允许删除
    isDelete: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 是否显示添加图片的div
    showAdd() {
      return this.urlList.length < this.limit
    },
    len() {
      return this.progress.length
    }
  },
  data() {
    return {
      dir: 'statice-resource/finance',
      lock: false,
      currentIndex: 0,
      progress: [],
      editOrAdd: '',
      cancelUplaod: [],
      urlNameList: []
    }
  },
  methods: {
    onAddImg(index, type) {
      const progress = this.progress[index]
      if (progress > 0 && progress < 100) {
        return
      }
      this.currentIndex = index
      this.editOrAdd = type
      this.$refs.inputFile.click()
    },
    onView(index) {
      this.$refs.viewImg.showDialog(this.urlList, index)
    },
    onDelete(index) {
      this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.cancelUplaod[index]) {
            this.cancelUplaod[index]()
          }
          this.progress[index] = 0
          this.$delete(this.urlList, index)
          this.$delete(this.urlNameList, index)
          this.$emit('upload:urlList', this.urlList)
          this.$emit('deleteImg', index)
        }).catch(() => {})
    },
    onChange() {
      const that = this
      const file = that.$refs.inputFile.files[0]
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$alert('请上传图片格式，如：jpg、jpeg、png', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
        return
      }
      axios({
        method: "get",
        url: `${ProxyUri}/oss/getAliOSSUploadSign?dir=${that.dir}/${Date.now()}`,
        headers: {
          token: getToken()
        },
      }).then(res => {
        if (res.data.status == 200) {
          const body = res.data.body
          let data = new FormData()
          data.append("name", file.name)
          data.append("key", `${body.dir}/${file.name}`)
          data.append("signature", body.signature)
          data.append("success_action_status", 200)
          data.append("OSSAccessKeyId", body.accessid)
          data.append("policy", body.policy)
          data.append("host", body.host)
          data.append("file", file)
          let CancelToken = axios.CancelToken
          const that = this
          axios({
            method: "post",
            url: "https://classbro-oss.oss-accelerate.aliyuncs.com/",
            data: data,
            headers: {
              token: getToken(),
              "Content-Type": "multipart/form-data",
            },
            cancelToken: new CancelToken(function executor(c) {
              that.cancelUplaod[that.currentIndex] = c
              // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
            }),
            onUploadProgress: progressEvent => {
              if(progressEvent.lengthComputable){
                //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                const progress = (progressEvent.loaded / progressEvent.total * 100 | 0)
                this.$set(this.progress, this.currentIndex, progress)
                console.log(this.progress)
              }
            }
          }).then(_res => {
            const url = `${OSS_URL}${body.dir}/${encodeURIComponent(file.name)}`
            that.$set(that.urlList, that.currentIndex, url)
            that.$set(that.urlNameList, that.currentIndex, {url: url, name: file.name})
            that.$emit('upload:urlList', that.urlList)
            that.$emit('upload:urlNameList', that.urlList)
            if (that.editOrAdd === 'add') {
              that.$emit('addImg', that.urlNameList[that.currentIndex])
            } 
            if (that.editOrAdd === 'edit') {
              that.$emit('editImg', { value: that.urlNameList[that.currentIndex], index: that.currentIndex})
            }
            that.$refs.inputFile.value = ''
          })
        }
      })
    },
  }
}
</script>
<style scoped>
/deep/.el-progress-bar__innerText{
  vertical-align: top;
}
</style>
<style lang="scss" scoped>
.update_img_container{
  .add_img{
    display: inline-block;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 6px;
    border: 1px dashed #d9d9d9;
    background-color: #fbfdff;
    .img_src{
      width: 100%;
    }
    .img_src,
    .img_operation,
    .el-icon-plus{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .img_operation{
      display: none;
      width: 100%;
      height: 100%;
      z-index: 99;
      background-color: rgba(0, 0, 0, .5);
      .operation_btn{
        width: 100%;
        position: absolute;
        top: 50%;
         z-index: 199;
        transform: translateY(-50%);
        text-align: center;
        &:hover{
          i{
            &:hover{
              color: #409eff;
              cursor: pointer;
            }
          }
        }
        i+i{
          margin-left: 5px;
        }
      }
    }
    &:hover{
      i{
        color: #fff;
      }
      .add_plus {
        color: #409eff;
        cursor: pointer;
      }
      .img_operation{
        display: block;
      }
      border: 1px dashed #409eff;
    }
    .img_progress{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      z-index: 299;
    }
  }
  .add_img+.add_img{
    margin-left: 10px;
  }
  .input_file{
    width: 0;
    height: 0;
    position: absolute;
    left: -99999999999px;
  }
}
</style>
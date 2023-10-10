<template>
    <div>
        <p class="title">DropBox：</p>
                <!-- <el-button style='margin-left: 10px;' size='mini' type="primary">修改DropBox下载权限</el-button> -->
                <!-- <div v-show='dropboxList.length == 0'>
                    <p style='padding-left: 20px;'>暂无DropBox</p>
                </div> -->
                <div v-if='dropboxList != 0'>
                    <!-- <el-button style='margin-top: 10px;' type="primary" @click='crowDownDropBox' title='选中你想下载的文件后点击'>
                        选中DropBox批量下载</el-button> -->
                    <el-button style='margin-top: 10px;' type="warning" @click='DownAllDropBox' title='直接下载包含整个课件的压缩包'>
                        下载全部DropBox</el-button>
                    <ul style="margin:0;padding:0 0 0 10px;">
                        <li v-for='item in dropboxList' style="background:#fff;position:relative;" v-show='item.deleteFlag == false'>
                            <div>
                                <el-checkbox @change='chooseDropBoxEvent(item)' style='padding:0 10px;'>
                                </el-checkbox>
                                <a style="text-decoration:none;color:#409EFF;cursor: pointer;" @click='downDropBox(item)' :title="item.name">{{item.name}}</a>
                                <!-- <span>{{item.id}}</span> -->
                                <span style='text-align: right;position:absolute;right:10px;'>{{item.createAt}}
                                    <el-button style='margin-left:20px;' v-if="showChangeExamTime" type="primary" size="small" @click='deleteDropbox(item)'>删除
                                    </el-button>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>
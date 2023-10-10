<template>
    <div class="classInfo">
        <span class="classInfo-title">课堂信息</span>
        <el-table style="background: white;margin-top:8px;box-shadow:0px 1px 9px 0px rgba(0,0,0,0.14);" :data="data" border >
                <el-table-column label="课堂名称" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="课堂说明" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="房间号/课堂ID" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.roomId }} / {{ scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预计开始时间" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.startTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预计结束时间" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.endTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="实际开始时间" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.reaStartTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="实际结束时间" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.reaEndTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="上课时长" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.schooltime }}分</span>
                    </template>
                </el-table-column>
                <el-table-column label="赠送时长" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.presenterTime }}分</span>
                    </template>
                </el-table-column>
                <el-table-column label="课堂状态" width="120">
                    <template slot-scope="scope">
                        <!-- 
                            1-待确认课堂  
                            2-已确认 
                            4-正在上课  
                            8-已结束
                            16-异常课堂   
                            32-讲师取消排课中  
                            64-学生已拒绝排课  
                            128-学生取消排课中  
                            256-讲师拒绝取消  
                            512-课堂已取消 
                         -->
                        <span v-show='scope.row.statused === 1'>待确认课堂</span>
                        <span v-show='scope.row.statused === 2'>已确认</span>
                        <span v-show='scope.row.statused === 4'>正在上课</span>
                        <span v-show='scope.row.statused === 8'>已结束</span>
                        <span v-show='scope.row.statused === 16'>异常课堂</span>
                        <span v-show='scope.row.statused === 32'>讲师取消排课中</span>
                        <span v-show='scope.row.statused === 64'>学生已拒绝排课</span>
                        <span v-show='scope.row.statused === 128'>学生取消排课中</span>
                        <span v-show='scope.row.statused === 256'>讲师拒绝取消</span>
                        <span v-show='scope.row.statused === 512'>课堂已取消</span>
                    </template>
                </el-table-column>
                <el-table-column label="评分" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.rate }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="revise(scope.row,scope.$index)">课堂记录</el-button>
                        <el-button size="mini" @click="rview(scope.row,scope.$index)">回放</el-button>
                        <el-button size="mini" v-if="showChangeExamTime" :disabled="scope.row.statused >16" @click="closeClassRoom(scope.row,scope.$index)">结束课堂</el-button>
                    </template>
                </el-table-column>
            </el-table>
    </div>  
</template>
<script>

export default {
    props:{
        data: Array
    },
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.classInfo{
    margin-top: 14px;
}
.classInfo-title{
    color: #2C2D2F;
    font-size: 14px;
    font-weight: 600;
        
}
</style>
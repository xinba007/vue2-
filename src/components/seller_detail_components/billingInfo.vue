<template>
    <div class="billing">
        <span class="billing-title">账单信息</span>
            <el-table style="background-color: white;margin-top:8px;box-shadow:0px 1px 9px 0px rgba(0,0,0,0.14);" :data="data" border>
                <el-table-column label="订单号" width="280">
                    <template slot-scope="scope">
                        <span v-if='scope.row.parentId !==null'>
                            <img style="width:15px" src="images/ss.svg">
                        </span>
                        <span>{{ scope.row.orderNo }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.nickName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="账单实付金额" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.oopExpenses }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="账单名称" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if='scope.row.type ===1'>课程预付</span>
                        <span v-if='scope.row.type ===2'>欠费账单</span>
                        <span v-if='scope.row.type ===4'>课程尾款</span>
                        <span v-if='scope.row.type ===8'>课程追付</span>
                        <span v-if='scope.row.type ===16'>补款账单</span>
                    </template>
                </el-table-column>
                <el-table-column label="账单类型" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if='scope.row.billType ===1'>系统生成</span>
                        <span v-if='scope.row.billType ===2'>销售创建</span>
                    </template>
                </el-table-column>
                <el-table-column label="账单金额" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.badMoney }} {{ scope.row.current }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="账单状态" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if='scope.row.statused ===1'>待处理</span>
                        <span v-if='scope.row.statused ===2'>学生已处理</span>
                        <span v-if='scope.row.statused ===4'>销售已处理</span>
                        <span v-if='scope.row.statused ===8'>已结束</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createAt }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="拒绝理由" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.exceptionMsg }}</span>
                    </template>
                </el-table-column>
                <!-- --------------------------------------------------------------------------------------- -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.statused ===1" @click="apply(scope.row,scope.$index)">
                            立即支付</el-button>
                        <el-button size="mini" disabled v-if='scope.row.statused ===8 ||scope.row.statused ===4 || scope.row.statused ===2'>
                            立即支付
                        </el-button>
                    </template>
                </el-table-column>
                <!-- --------------------------------------------------------------------------------------- -->
            </el-table>
    </div>

</template>
<script>
export default {
    props:{
        data:Array
    }
}
</script>
<style scoped>
.billing{
    margin-top: 14px;
}
.billing-title{
    color: #2C2D2F;
    font-size: 14px;
    font-weight: 600;
        
}
</style>
<template>
    <div>
        <p>
            <span style="font-weight:600;font-size:18px">关联订单信息</span>
            <el-table style="background: white;" :data="data" border >
                <el-table-column label="订单号" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span style="color:#409EFF;cursor: pointer;" @click="seedetail(scope.row,scope.$index)">{{ scope.row.orderNo }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </p>
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
    },
    mounted(){

    },
    methods:{
        seedetail(row, index) {
            // window.open("seller_detail.html?id=" + row.id + "");
            // window.open("seller_detail.html?id=" + row.id + "");
            console.log('跳转')
        },
    }
}
</script>
<style scoped>

</style>
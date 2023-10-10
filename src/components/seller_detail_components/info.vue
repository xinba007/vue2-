<template>
    <div style="background-color:white;padding:10px">
        <p class="title" style="position:relative">
            <span style="font-weight:600;font-size:18px">订单信息</span>
            <!-- <span >(学期卡订单)</span> -->
            <span style="text-align:center;position: absolute;right:100px; font-size: 16px;color:#ff5e37;font-family: '微软雅黑';cursor: pointer;">小报告</span>
            <span style="text-align:center;position: absolute;right:5px; font-size: 16px;color:#409EFF;font-family: '微软雅黑';cursor: pointer;">生成外链</span>
        </p>
        <div class="item">
            <span>订单号:</span>
            <span>{{data.orderNo}}</span>
        </div>
        <div class="item">
            <span>课程代码:</span>
            <span>{{data.courseCode}}</span>
        </div>
        <div class="item">
            <span>订单状态::</span>
            <span>{{orderStatus[data.statused]}}</span>
        </div>
        <div class="item">
            <span>总消耗金额:</span>
            <span>{{data.reaMonetary}}</span>
        </div>
        <div class="item">
            <span>销售名称:</span>
            <span>{{data.username}}</span>
        </div>
        <div class="item">
            <span>负责师资:</span>
            <span>{{data.nickname}}</span>
        </div>
        <div class="item">
            <span>辅导讲师:</span>
            <span>{{data.nickname1}}</span>
        </div>
        <p style="border-top:1px dashed #409EFF"></p>
        <div class="item">
            <span>订单金额:</span>
            <span>{{data.totalPrice}}</span>
        </div>
        <div class="item">
            <span>材料费:</span>
            <span>{{data.materialCost}}{{data.currency}}</span>
        </div>
        <div class="item">
            <span>课程单价:</span>
            <span>{{data.onePrice}}</span>
        </div>
        <div class="item">
            <span>购买课时:</span>
            <span>{{data.scheduledTime}} H</span>
        </div>
        <div class="item">
            <span>已支付金额:</span>
            <span>{{data.prepayment}}</span>
        </div>
        <div class="item">
            <span>剩余金额:</span>
            <span>{{data.leftMoney}}{{data.currency}}</span>
        </div>
        <!-- <div v-if="isnewgiftshow" class="grid-content bg-purple">
            <span class="label">剩余金额:</span>
            <span v-if='isType1 == true && isEndCourse == false'>{{(Number(getCourseObjData.leftMoney)-Number(getCourseObjData.materialCost)).toFixed(2)}}{{getCourseObjData.currency}}</span>
            <span v-else-if='isType1 == true && isEndCourse == true'>0</span>
            <span v-else>{{(Number(getCourseObjData.leftMoney)-Number(getCourseObjData.materialCost)).toFixed(2)}}{{getCourseObjData.currency}}</span>
        </div>
        <div v-if="!isnewgiftshow" class="grid-content bg-purple">
            <span class="label">剩余金额:</span>
            <span v-if="studPurchaseOrderType!=0 && studPurchaseOrderType != 4 && propStatused != 1024 && propStatused != 2048">{{(Number(getCourseObjData.leftMoney)-Number(getCourseObjData.materialCost)).toFixed(2)}}{{getCourseObjData.currency}}</span>
            <span v-else>{{getCourseObjData.leftMoney}}{{getCourseObjData.currency}}</span>
        </div> -->
        <p style="border-top:1px dashed #409EFF"></p>
        <div class="item">
            <span>学生已上课时:</span>
            <span>{{data.allSchooltime}} MIN</span>
        </div>
        <div class="item">
            <span>字数:</span>
            <span>{{data.wordsNum}}</span>
        </div>
        <div class="item">
            <span>特殊报价:</span>
            <span>{{data.theSpecialOffer}}</span>
        </div>
        <div class="item">
            <span>系统赠送时长:</span>
            <span>{{data.persenterTime}} MIN</span>
        </div>
        <p style="border-top:1px dashed #409EFF"></p>
        <div class="item">
            <span>Deal Deadline:</span>
            <span>{{data.endCourseTime}}</span>
        </div>
        <div class="item">
            <span>Official Deadline:</span>
            <span>{{data.examTime}}</span>
        </div>
        <p style="border-top:1px dashed #409EFF"></p>
        <div class="item">
            <span>讲师已获(G):</span>
            <span>{{data.prices1}}</span>
        </div>
        <div class="item">
            <span>讲师已获(OTG):</span>
            <span>{{data.prices2}}</span>
        </div>
        <div class="item">
            <span>订单讲师时薪:</span>
            <span>{{data.hourlyWage}}</span>
        </div>
        <div class="item">
            <span>Penalty Rate:</span>
            <span>{{data.penaltyRate}}%</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        data: Object
    },
    data(){
        return {
            orderNo:'',
            orderStatus:{
                "1":"未处理（无任何销售接单）",
                "2":"待审核",
                "4":"待确定",
                "8":"待规划（等待教师/运营接单）",
                "16":"规划中(订单第一次超时等待运营接单)",
                "32":"规划中(订单第二次超时等待运营主管强制指派)",
                "64":"规划中(运营接单待指派，正在处理)",
                "128":"待排课",
                "256":"已排课",
                "512":"申请结课中",
                "1024":"已结课",
                "2048":"已强制结课",
                "4096":"已取消",
                "8192":"坏单申请中",
                "16384":"订单作废",
                "32768":"销售被更换",
                "65536":"事故单申请中"
            },
        }
    },
    mounted(){
        console.log(this.data,'数据')
    },
    methods:{
    }
    
}
</script>
<style scoped>
.item{
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
}
.title {
    font-weight: 600;
    font-size: 18px;
    margin: 5px 0 !important;
    border-bottom: 1px solid #99a9bf;
    padding-bottom: 8px;
    height: 25px
}
</style>
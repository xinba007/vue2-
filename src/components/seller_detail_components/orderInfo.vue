<template>
    <div class="order">
        <span class="orderInfo-title">订单信息</span>
        <div class="info">
            <div class="info-item">
                <span  style="margin-top:0px">订单状态</span>
                <span>{{data.status}}</span>
            </div>
            <div class="info-item">
                <span  style="margin-top:0px">销售名称</span>
                <span>{{data.sellerName}}</span>
            </div>
            <div class="info-item">
                <span>课程专业</span>
                <span>{{data.major}}</span>
            </div>
            <div class="info-item">
                <span>课程代码</span>
                <span>{{data.classCode}}</span>
            </div>
            <div class="info-item">
                <span>课程名称</span>
                <span>{{data.className}}</span>
            </div>
            <div class="info-item" v-if="data.classFami != ''">
                <span>课程熟悉度</span>
                <span>{{data.classFami}}</span>
            </div>
            <div class="info-item" v-if="data.classFami != '暂无'">
                <span>Deal Deadline:</span>
                <span>{{data.endCourseTime}}</span>
            </div>
            <div class="info-item" v-if="data.classFami != '暂无'">
                <span>Official Deadline:</span>
                <span>{{data.examTime}}</span>
            </div>
            <div class="info-item" v-if="data.orderType == 65">
                <span>工作量</span>
                <span>{{data.worksNum}} 字
                <i class="el-icon-edit-outline" style="color: rgb(64, 158, 255); font-size: 22px; display:inline;margin-left:26px"></i>
                </span>
                
            </div>

            

            <div class="question-bar" :key="item.key" v-for="item in data.question">
                <span>{{item.question}}</span>
                <textarea v-model="item.answer" readonly></textarea>
            </div>
            <div class="question-bar" v-if="data.remark != '暂无'">
                <span>订单备注</span>
                <textarea v-model="data.remark" readonly></textarea>
            </div>
            <div class="info-item">
                <span>已购课时</span>
                <span>{{data.purchHour}} H</span>
            </div>
            <div class="info-item">
                <span>赠送课时</span>
                <span>{{data.giftHour}} MIN</span>
            </div>
            <div class="info-item">
                <span>已消耗课时</span>
                <span>{{data.spendHour}}</span>
            </div>
            <div class="info-item">
                <span>退还课时</span>
                <span>{{data.backHour}}</span>
            </div>
            <div class="info-item">
                <span>剩余课时</span>
                <span>{{data.leftHour}}</span>
            </div>
        </div>
    </div>
</template>
<script>
                // status      :'暂无',
                // sellerName  :'暂无',
                // major       :'暂无',
                // classCode   :'暂无',
                // className   :'暂无',
                // classFami   :'暂无',
                // purchHour  :'暂无',
                // giftHour   :'暂无',
                // spendHour  :'暂无',
                // backHour   :'暂无',
                // leftHour   :'暂无'  
export default {
    props:['data']
}
</script>
<style scoped>
.question-bar{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 16px;
}
.question-bar span{
    font-size: 12px;
    color: #8C8C8C;
}
.question-bar textarea{
    width: 50%;
    height: 88px;
}
.order{
    margin-top: 16px;
}
.orderInfo-title{
    color: #2C2D2F;
    font-size: 14px;
    font-weight: 600;
}
.info{
    margin-top: 8px;
    width: 100%;
    background-color:white;
    padding: 16px;
    display: flex;
    flex-direction: row;
    box-shadow:0px 1px 9px 0px rgba(0,0,0,0.14);
    flex-flow: row wrap;
    align-content: flex-start;
}
.info-item{
    display: flex;
    flex-direction: column;
    width: 50%;
}
.info-item span:nth-child(1){
    font-size: 12px;
    padding-top: 2px;
    padding-bottom: 2px;
    color: #8C8C8C;
    margin-top: 28px;
}
.info-item span:nth-child(2){
    font-size: 14px;
    margin-top: 14px;
    color: #48494C;
}
</style>
<template>
    <div class="drain">
        <span class="drain-title">引流订单需求</span>
        <div class="drain-info">
            <div class="info-item">
                <span  style="margin-top:0px">学生的定题需求:</span>
                <span>{{data.paperAnswerDemand}}</span>
            </div>
            <div class="info-item">
                <span  style="margin-top:0px">结合topic进行细节讲解:</span>
                <span>{{data.topicAnswerDemand}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['data'],
}
</script>
<style scoped>
.drain{
    margin-top: 16px;
}
.drain-title{
    color: #2C2D2F;
    font-size: 14px;
    font-weight: 600;
}
.drain-info{
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
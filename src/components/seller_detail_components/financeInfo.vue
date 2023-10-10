<template>
    <div class="finance">
        <span class="finance-title">财务信息</span>
        <div class="finance-info">
            <div class="info-item">
                <span  style="margin-top:0px">课时单价</span>
                <span>{{data.unitPrice}}</span>
            </div>
            <div class="info-item">
                <span style="margin-top:0px">已支付金额</span>
                <span>{{data.paid}}</span>
            </div>
            <div class="info-item">
                <span>学期卡支付</span>
                <span>{{data.stuCardPaid}} min</span>
            </div>
            <div class="info-item">
                <span>已消耗金额</span>
                <span>{{data.spendMoney}}</span>
            </div>
            <div class="info-item">
                <span>补偿金额</span>
                <span>{{data.compensate}}</span>
            </div>
            <div class="info-item">
                <span>已退还金额</span>
                <span>{{data.returnMoney}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['data']
            //     finaceInfo:{
            //     unitPrice   :'0',
            //     paid        :'0',
            //     stuCardPaid :'0',
            //     spendMoney  :'0',
            //     compensate  :'0',
            //     returnMoney :'0'
            // },
}
</script>
<style scoped>
.finance{
    margin-top: 16px;
}
.finance-title{
    color: #2C2D2F;
    font-size: 14px;
    font-weight: 600;
}
.finance-info{
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
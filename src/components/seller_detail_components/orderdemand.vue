<template>
    <div>
        <p>
            <span style="font-weight:600;font-size:18px">订单需求</span>
        </p>
            <!-- <div>
            <div class="grid-content bg-purple">
                <span class="label">客户希望复习资料类型:</span>
                <span v-if="studSpecialOrderExt.reviewMaterialType==1">覆盖全部lecture</span>
                <span v-if="studSpecialOrderExt.reviewMaterialType==2">考点/重点优先，突击为主</span>
                <span v-if="studSpecialOrderExt.reviewMaterialType==4">越细越好，希望拓展</span>
            </div>
            <div class="grid-content bg-purple">
                <span class="label">辅导需求:</span>
                <span>{{studSpecialOrderExt.customerExtraDemand}}</span>
            </div>
            </div> -->
            <!-- <div class="grid-content bg-purple">
                <span class="label" v-if="question">辅导需求:</span>
                <p v-if="question.length > 0" v-for='item in question' style="display: block;clear: both;margin: 10px 0">
                <span style="color:#409EFF;font-weight: 600">{{item.question | haveColon}}</span>
                    {{item.answer}}
                </p>
                <span v-if="question.length == 0">
                    {{questionstr}}
                </span>
            </div>
            <div class="grid-content bg-purple">
                <br>
                <div style="margin-top: 10px;" v-for="itemques in question">
                    <span style="color: #409EFF;font-weight: 700;">{{itemques.question}}</span>{{itemques.answer}}</div>
            </div>
            <div class="grid-content bg-purple" style="clear: both">
                <p v-for='item in question' style="display: block;clear: both;margin: 10px 0">
                    <span style="color:#409EFF;font-weight: 600">{{item.question | haveColon}}</span>
                        {{item.answer}}
                </p>
            </div> -->
    </div>
</template>
<script>
props:{
    studPurchaseOrderType:String;
    studSpecialOrderExt:Object
};
export default {
    data(){
        return{

        }
    },
    mounted(){
        // console.log('信息',studPurchaseOrderType)
        // console.log('特殊订单',studSpecialOrderExt)
    }
    
}
</script>
<style scoped>

</style>
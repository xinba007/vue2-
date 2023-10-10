<template>
    <div class="main">
        <span class="title-text">
            <span v-if="isSpecialOrder">子订单类型：</span>
            {{data}}</span>
    </div>
</template>
<script>
export default {
props:['data','isSpecialOrder'],
    data(){
        return{

        }
    },
    mounted(){
        console.log(this.data,"???")
    }
}
</script>
<style scoped>
.main{
    width: 100%;
    height: 40px;
    background-color: white;
    padding-left: 16px;
    padding-top: 12px;
    padding-bottom: 12px;
    box-shadow:0px 1px 9px 0px rgba(0,0,0,0.14);
}
.title-text{
    color: #48494C;
    font-size: 16px;
    font-weight: 600;
}
</style>
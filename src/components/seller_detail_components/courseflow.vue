<template>
    <div class="flow">
        <span class="flow-title">课程流水</span>
        <div class="flow-container">
            <div class="flow-item"  v-for="item in data" :key="item.id">
                <span>
                    {{item.createAt}}
                </span>
                <span>
                    <div v-html="item.description"></div>
                </span>
            </div>
        </div>

    </div>

</template>
<script>
export default {
    props:{
        data:Array
    },
    data(){
        return{
        }
    },
    mounted(){
    },
    methods:{
    }
}
</script>
<style scoped>
.flow{
    margin-top: 16px;
}
.flow-title{
    color: #2C2D2F;
    font-size: 14px;
    font-weight: 600;
}
.flow-container{
    background-color: white;
    height: 880px;
    overflow-y: auto;
    padding: 16px;
    margin-top: 8px;
    box-shadow:0px 1px 9px 0px rgba(0,0,0,0.14);
}
.flow-container div:nth-child(1){
    margin-top: 0px;
}
.flow-item{
    background-color: white;
    margin-top: 28px;
}
.flow-item span:nth-child(1){
    color: #8C8C8C;
    font-size: 12px;
}
.flow-item span:nth-child(2){
    color: #48494C;
    font-size: 14px;
    margin-top: 14px;
    display: block;
}
</style>
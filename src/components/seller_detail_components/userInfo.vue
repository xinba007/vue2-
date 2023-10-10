<template>
    <div class="user">
    <span class="user-title">用户信息</span>
    <div class="user-info">
            <div class="info-item">
                <span style="margin-top:0px">姓名</span>
                <span>{{data.name}}</span>
            </div>     
            <div class="info-item">
                <span  style="margin-top:0px">国家</span>
                <span>{{data.country}}</span>
            </div>       
            <div class="info-item">
                <span>学校</span>
                <span>{{data.school}}</span>
            </div>
            <div class="info-item">
                <span>学历</span>
                <span>{{data.education}}</span>
            </div>
            <div class="info-item">
                <span>在读年级</span>
                <span>{{data.grade}}</span>
            </div>

            <div class="info-item">
                <span>学校系统账号</span>
                <span>{{data.account}}</span>
            </div>
            <div class="info-item">
                <span>学校系统密码</span>
                <span>{{data.password}}</span>
            </div>




            
    </div>
    </div>
    
</template>
<script>
export default {
    props:[
        'data'
    ],

}
</script>
<style scoped>
    .user{
        margin-top: 16px;
        margin-right: 8px;
    }
    .user-title{
        color: #2C2D2F;
        font-size: 14px;
        font-weight: 600;
    }
    .user-info{
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
    .user-item{
        display: flex;
        flex-direction: column;
        width: 50%;
    }
</style>
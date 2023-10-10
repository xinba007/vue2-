<template>
    <div>
        <el-dropdown>
            <img :src="user.thumb ? user.thumb : require('@/assets/avatar.png')" alt="" class="avatar">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >
                    <div class="item" @click="showDialog">
                        <img src="@/assets/edit.png" alt=""> 修改密码
                    </div>
                </el-dropdown-item>
                <el-dropdown-item >
                    <div class="item" @click="loginOut">
                        <img src="@/assets/login/loginout-img.png" alt=""> 退出登录
                    </div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <!-- 修改密码 -->
        <el-dialog
            :visible.sync="dialogVisible"
            width="300px"
            :before-close="closeDialog"
            append-to-body
            title="修改密码"
        >
            <el-form ref="form" :model="form" label-position="top">
                <el-form-item label="新密码" prop="password" :rules="[{required: true,message: '不能为空'}]">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
            </el-form>

            <div class="group-btn">
                <el-button type="primary" plain @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="submit" :loading="loading">确定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
import { RouterPath } from "@/utils/Enum/index";
import { mapGetters } from "vuex";
import { updatePassword } from "@/api/user"
import { setStorage } from "@/utils/index";
export default {
    data(){
        return {
            dialogVisible: false,
            loading: false,
            form: {}
        }
    },
    computed: {
        ...mapGetters(["user"]),
    },
    props: {
        avatar: {
            type: String,
            default: ''
        }
    },
    methods: {
        // 退出登录
        async loginOut() {
            this.$router.push({ path: RouterPath.LOGIN, query: {} });
            this.$store.dispatch("reloadRouterLoadDone");
            this.$store.dispatch("fedLogOut");
            setStorage('companyName',null)
        },

        showDialog(){
            this.dialogVisible = true
        },

        closeDialog(){
            this.form = {}
            this.dialogVisible = false
        },
        submit(){
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true
                    updatePassword(
                        {...this.form,userId: this.user.userId}
                    ).then(res => {
                        if(res.status == 200){
                            this.loading = false
                            this.$message.success('修改成功,请重新登录')
                            this.closeDialog()
                            this.loginOut()
                        }else{
                            this.loading = false
                            this.$message.error(err.msg)
                        }
                    }).catch(err => {
                        this.loading = false
                        this.$message.error(err.msg)
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.el-dropdown{
    display: flex;
    margin: 0 30px;
}
.avatar{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
}
.group-btn{
    display: flex;
    align-items: center;
    justify-content: center;
}
.item{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 5px 0;
}
</style>
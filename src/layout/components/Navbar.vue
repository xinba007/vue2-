<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <section class="line-tool-box">
        <template v-if="device!=='mobile'">
          <!-- 全屏 -->
          <!-- <el-tooltip :content="$t('app.screenFull')" effect="dark" placement="bottom">
            <screenfull class="right-menu-item" />
          </el-tooltip> -->
          <!-- 布局大小 -->
          <el-tooltip :content="$t('app.size')" effect="dark" placement="bottom">
            <size-select class="right-menu-item" />
          </el-tooltip>
          <!-- 国际化 -->
          <el-tooltip :content="$t('app.language')" effect="dark" placement="bottom">
            <lang-select class="right-menu-item hover-effect" />
          </el-tooltip>
          <!-- 退出登录、修改密码 -->
          <userTool/>
        </template>
        <!-- <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <img v-if="avatar" :src="'/avatar/' + avatar" class="user-avatar" />
            <svg-icon v-else icon-class="default-avatar" class-name="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <span style="display:block;" @click="show = true">
              <el-dropdown-item>{{ $t("app.layoutSettings.label") }}</el-dropdown-item>
            </span>
            <router-link to="/user/center">
              <el-dropdown-item>{{ $t("app.personalCenter") }}</el-dropdown-item>
            </router-link>
            <span style="display:block;" @click="open">
              <el-dropdown-item divided>{{ $t("app.signOut.label") }}</el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown> -->
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { RouterPath } from "@/utils/Enum/index";
import {
  Breadcrumb,
  Hamburger,
  // Screenfull,
  SizeSelect,
  LangSelect
} from "@/components";
import userTool from './userTool/index'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    // Screenfull,
    SizeSelect,
    LangSelect,
    userTool
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    show: {
      get() {
        return this.$store.state.settings.showRightPanel;
      },
      set(val) {
        this.$store.dispatch("changeSetting", {
          key: "showRightPanel",
          value: val
        });
      }
    }
  },
  methods: {
    logoutConfirm(){
      this.$confirm('您是否要退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.logout()
        }).catch(() => {          
        });
    },
    open() {
      const { label, tips, ok, cancel } = this.$t("app.signOut.confirm");
      this.$confirm(label, tips, {
        confirmButtonText: ok,
        cancelButtonText: cancel,
        type: "warning"
      }).then(() => {
        this.logout();
      });
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    async logout() {
      this.$router.push({ path: RouterPath.LOGIN, query: {} });
      this.dialogVisible = false;
      this.$store.dispatch("reloadRouterLoadDone");
      this.$store.dispatch("fedLogOut");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .line-tool-box {
      display: flex;
      align-items: center;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          color: #909399;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.loginout-box{
  width: 100px;
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  margin: 0 16px 0 8px;
  img{
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  span{
    font-size: 14px;
    font-weight: 400;
    color: #2C2D2F;
    line-height: 14px;
  }
}
</style>

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :unique-opened="$store.state.settings.uniqueOpened"
      mode="vertical"
      active-text-color="#4979FF"
    >
      <Logo :is-collapse="isCollapse" />
      <sidebar-item
        v-for="route in fmt_permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import Logo from "./Logo";
export default {
  components: { Logo, SidebarItem },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    fmt_permission_routes() {
      return this.permission_routes.filter(item => !item.hidden);
    }
  }
};
</script>

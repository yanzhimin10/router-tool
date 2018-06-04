<template>
  <el-container>
    <el-header :height='headerHeight'>
      <el-row>
        <el-col :span="3">
        	<span>Router Tool</span>
        </el-col>
        <el-col :span="15">
          <el-menu background-color="#B3C0D1" text-color="#333" :default-active="menuActive" class="top-nav" mode="horizontal" @select="handleSelect">
            <el-menu-item index="status">Status</el-menu-item>
            <el-menu-item index="setting">Setting</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <el-main ref="main">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        userLogoUrl: '',
        menuActive: '',
        headerHeight: '60px'
      }
    },
    created() {
      let vue = this;

      this.handleSelect("status");

      this.routerCancel = this.$router.beforeEach(function(to, from, next) {
        let main = vue.$refs.main;
        if (main)
        {
          main.$el.scrollTop = 0;
        }
        next();
      });
    },
    destroyed() {
      if (this.routerCancel) {
        this.routerCancel();
        this.routerCancel = null;
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        let pathMap = {
          status: "status-all",
          setting: "setting-all",
        }
        let dest = pathMap[key];
        if (dest) {
          this.$router.push({name:dest});
        };
      },
    },
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    margin: 0px;
  }

  .el-main {
    padding: 0px 0px 0px 0px;
  }
</style>

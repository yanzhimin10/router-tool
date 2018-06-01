<template>
  <el-container class="dashboard-nav">
    <el-aside width="225px">
      <el-menu
        :default-active="menuActive"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="setting-all">All</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
      menuActive() {
        let path = this.$route.path;
        let pre = '/info/'
        path = path.substring(pre.length);
        path = path.replace('/', '-');
        if (path && path.length > 0) {
          return path;
        };
        return 'setting-all';
      },
    },
    methods: {
      handleSelect(index, indexPath){
        var routeName = index;
        this.$router.push({name:routeName});
      }
    },
  }
</script>

<style scoped>

  .el-menu {
    width: 100%;
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: left;
  }
  
  el-main {
    /*background-color: #E9EEF3;*/
    /*color: #333;*/
    padding: 10px;
  }

  .el-container {
    height: 820px;
  }
</style>

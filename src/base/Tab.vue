<template>
  <div>
    <!--此处放router-link的内容-->
    <router-link to="/home">首页</router-link>
    <router-link to="/detail">详情</router-link>
    <router-link to="/list">列表</router-link>
  </div>
</template>

<script>
    export default {
        name: "Tab"
    }
</script>

<style scoped>
  a{
    color: cadetblue;
  }
  a.router-link-active {
    color: #ffb800;
    padding:  10px;
  }
</style>

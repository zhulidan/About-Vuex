<template>
  <div id="app">
    <router-view></router-view>
    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from './base/Tab';//1、导入Tab组件
  export default {
    name: 'App',
    components:{//说明Tab是App的组件，好处是永远不会有三级组件，因为在一个组件引另一个组件
      Tab
    }//2、注册
  }
</script>

<style>
  <!-- 公共样式 -->
  * {
    padding: 0;
    margin: 0;
  }
  ul, li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  <!-- 去除浏览器input, button默认样式 -->
  input, button {
    -webkit-appearance: none;
  }
</style>

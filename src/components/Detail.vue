<template>
    <div>

      <p>detail</p>
      <br>
      <p>标签切换会改变footerStatus.js，showFooter的值</p>
      <p>模块 footerStatus.js 中【action】showFooter的值为：{{isShow}}</p>
    </div>
</template>

<script>
  import {mapState} from 'vuex'; //先要引入
    export default {
        name: "Detail",
      computed: {
        ...mapState({  //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
          isShow:state=>state.footerStatus.showFooter //注意这些与上面的区别就是state.footerStatus,
          //里面定义的showFooter是指footerStatus.js里state的showFooter
        }),
      },
    }
</script>

<style scoped>

</style>

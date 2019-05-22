<template>
  <div id="app">
    <router-view></router-view>
    <Tab if="isShow"></Tab>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex'; //先要引入
  import Tab from './base/Tab';//1、导入Tab组件
  export default {
    name: 'App',
    components:{//说明Tab是App的组件，好处是永远不会有三级组件，因为在一个组件引另一个组件
      Tab//2、注册
    },
    computed:{
      ...mapState({  //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
        isShow:state=>state.footerStatus.showFooter //注意这些与上面的区别就是state.footerStatus,
        //里面定义的showFooter是指footerStatus.js里state的showFooter
      }),
      //你也可以用下面的mapGetters来获取isShow的值，貌似下面的更简洁
      /*...mapGetters('footerStatus',{ //footerStatus指的是modules文件夹下的footerStatus.js模块
           isShow:'isShow' //第一个isShow是我自定义的只要对应template里v-if="isShow"就行，
                           //第二个isShow是对应的footerStatus.js里的getters里的isShow
        })*/
    },
    watch:{
      $route(to,from){
        console.log(to)
        if(to.name=='detail'){
          this.$store.dispatch('footerStatus/showFooter') //这里改为'footerStatus/showFooter',
                                                          //意思是指footerStatus.js里actions里的showFooter方法
        }else{
          this.$store.dispatch('footerStatus/hideFooter') //同上注释
        }
      }
    }
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

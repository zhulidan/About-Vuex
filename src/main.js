// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'; //引入store
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store， store被注册到实例上，所有组件都会有一个属性 this.$store(this.$store指的就是new Vuex.Store后的实例),最后的状态(state)都会放在实例上
  components: { App },
  template: '<App/>'
});

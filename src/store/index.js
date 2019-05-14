import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={//要设置的全局访问的state对象
  showFooter: true,
  count: 0
  //要设置的初始属性值
};
//创建一个vuex容器，容器是唯一的
const store = new Vuex.Store({
  state
});
export default store;

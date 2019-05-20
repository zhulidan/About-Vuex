import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {//要设置的全局访问的state对象
  //要设置的初始属性值
  showFooter: true,
  count: 0
};
const getters = { //实时监听state值的变化(最新状态)
  isShow(state) {  //方法名随意,主要是来承载变化的showFooter的值
    return state.showFooter;
  },
  getChangedNum() {  //方法名随意,主要是用来承载变化的count的值
    return state.count;
  },
};

const mutations = {
  show(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.showFooter = true;
  },
  hide(state) {  //同上
    state.showFooter = false;
  },
  newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
    state.count+=sum;
  }
};
//创建一个vuex容器，容器是唯一的
const store = new Vuex.Store({
  state,
  getters,
  mutations
});
export default store;

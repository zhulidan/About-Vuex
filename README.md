# 一、vuex的介绍及安装与导入

## 1.1、 vuex的介绍

### 1.1.1、 (zf)
- 平级组件交互：找共同的父级解决 跨组件交互：eventBus 写起来很混乱（eventBus的原理是发布订阅）
- vuex 主要借鉴了 flux（flux框架的模式一种思想） redux（是react的一部分），vuex只能在vue中使用（单独为vue开发的）
 - vuex 为了大型项目，主要是状态管理（这里的状态指的是数据），将数据统一管理
 - vuex的大体原理：vuex的特点就是，相当于把数据放在一个盒子里，盒子里装着的是数据，数据称为 状态 (state)，这里存的是所有的数据，不管是父组件，子组件，兄弟组件等，所有的组件把数据都放在 状态(state) 里，就是所有人都操作同一个数据，假设数据变了，因为所有组件用的都是同一个数据，所以页面会同时刷新，我们就不需要传递了，我们用的都是同一个状态(state)
 - 什么时候用vuex：多个组件，而且多个组件要共享这个状态
 
### 1.1.2、 (官网)
- Vuex 是一个专为 Vue.js 应用程序开发的 **状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
- 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同：
  
    1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
  
    2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用

### 1.1.3、 (个人)
- 在SPA单页面组件的开发中 Vue的vuex和React的Redux 都统称为同一状态管理，个人的理解是全局状态管理更合适；简单的理解就是你在state中定义了一个数据之后，你可以在所在项目中的任何一个组件里进行获取、进行修改，并且你的修改可以得到全局的响应变更

## 1.2、 vuex的安装
- npm(官网) 
```
    npm install vuex --save
```

## 1.3、 vuex的引入
### 1.3.1、 官网
- 在一个模块化的打包系统中，您必须显式地通过 Vue.use() 来安装 Vuex：(官网)
``` 
    import Vue from 'vue'
    import Vuex from 'vuex'
    
    Vue.use(Vuex)
```
### 1.3.2、vuex的引入与使用(博客)
- 在src文件目录下新建一个名为store的文件夹，为方便引入并在store文件夹里新建一个index.js,里面的内容如下:
```javascript
  import Vue from 'vue';
  import Vuex from 'vuex';
  Vue.use(Vuex);
  //创建一个vuex容器，容器是唯一的
  const store = new Vuex.Store();
 
  export default store;
```
- 接下来，在 main.js里面引入store，然后再全局注入一下，这样一来就可以在任何一个组件里面使用this.$store了：
```javascript
  import store from './store'//引入store
   
  new Vue({
    el: '#app',
    router,
    /** 
    * 1. store被注册到实例上，所有组件都会有一个属性 this.$store(this.$store指的就是new Vuex.Store后的实例),最后的状态(state)都会放在实例上
    * 2. 使用store ，容器与实例关联起来   
    * 3. 完整写法 store: store 简写 store
    **/
    store,           
    template: '<App/>',
    components: { App }
  })
```
> 注：
  1. 项目的初始化步骤在这些省略，vuex的导入与使用，1.3.2中已有，在这里不在展示代码了
  2. 博客地址：https://segmentfault.com/a/1190000015782272

# 二、vuex的核心概念
## 2.1、 state
### 2.1.1、官网有关state
1. 单一状态树
      - Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。
2. 创建一个 store
    - 创建过程直截了当——仅需要提供一个初始 state 对象
  ```javascript
     // 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
     const store = new Vuex.Store({
       state: {
         count: 0
       }
     })
  ```
3. 在 Vue 组件中获得 Vuex 状态
   - 由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在 **计算属性** 中返回某个状态
 ```javascript
    // 创建一个 Counter 组件
    const Counter = {
      template: `<div>{{ count }}</div>`,
      computed: {
        count () {
          return store.state.count
        }
      }
    }
 ```  
  - 每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。
  - 然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。
  
  - Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：
```javascript
  const app = new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: { Counter },
    template: `
      <div class="app">
        <counter></counter>
      </div>
    `
  })
```
  - 在根实例中注册 store 选项，该 store 实例会注入到 **根组件** 下的所有子组件中，且子组件能通过 this.$store 访问到。

### 2.1.2、state（博客）
- 回到store文件的index.js里面，我们先声明一个state变量，并赋值一个空对象给它，里面随便定义两个初始属性值；然后再在实例化的Vuex.Store里面传入一个空对象，并把刚声明的变量state仍里面：
```javascript
  import Vue from 'vue';
  import Vuex from 'vuex';
  Vue.use(Vuex);
   const state={//要设置的全局访问的state对象
       showFooter: true,
       count: 0
       //要设置的初始属性值
   };
   const store = new Vuex.Store({
         state
   });
   
  export default store;
```
- 实际上做完上面的三个步骤后，你已经可以用this.$store.state.showFooter或this.$store.state.changebleNum在任何一个组件里面获取showfooter和changebleNum定义的值了
### 2.1.3、项目中此时有关 state 的代码
- /src/store/index.js
```javascript
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
```
- /src/main.js
```javascript
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
```
- /src/components/Home.vue
```javascript
  <template>
    <div>
      {{counts}}
    </div>
  </template>
  <script>
    export default {
      name: "Home",
      computed: {
        counts() {
          return this.$store.state.count
        }
      }
    }
  </script>
```

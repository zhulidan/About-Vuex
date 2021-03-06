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
## 2.1、 State
### 2.1.1、state - 官网
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
4. mapState 辅助函数
  - 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
  ```javascript
    // 在单独构建的版本中辅助函数为 Vuex.mapState
    import { mapState } from 'vuex'
    
    export default {
      // ...
      computed: mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,
    
        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',
    
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
          return state.count + this.localCount
        }
      })
    }
  ```
  - 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
  ```javascript
    computed: mapState([
      // 映射 this.count 为 store.state.count
      'count'
    ])
  ```
  ##### 对象展开运算符
   - mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。但是自从有了对象展开运算符（现处于 ECMAScript 提案 stage-4 阶段），我们可以极大地简化写法：
  ```javascript
    computed: {
      localComputed () { /* ... */ },
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState({
        // ...
      })
    }
  ```
 5. 组件仍然保有局部状态
  - 使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。
  
6. 对象展开运算符
  - Rest属性收集剩余的自己的可枚举属性键，这些键尚未被解构模式拾取。这些键及其值将复制到新对象上。
  ```javascript
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    x; // 1
    y; // 2
    z; // { a: 3, b: 4 }
  ```
  - 对象初始值设定项中的Spread属性将自己的可枚举属性从提供的对象复制到新创建的对象上。
  ```javascript
    let n = { x, y, ...z };
    n; // { x: 1, y: 2, a: 3, b: 4 }
  ```
  
### 2.1.2、state - 博客
- vuex中的数据源，我们需要保存的数据就保存在这里，可以在页面通过 this.$store.state来获取我们定义的数据；
- 回到store文件的index.js里面，我们先声明一个state变量，并赋值一个空对象给它，里面随便定义两个初始属性值；然后再在实例化的Vuex.Store里面传入一个空对象，并把刚声明的变量state扔里面：
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
- 实际上做完上面的三个步骤后，你已经可以用this.$store.state.showFooter或this.$store.state.count在任何一个组件里面获取showfooter和count定义的值了
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

## 2.2、 Getter
### 2.2.1、getter - 官网
1. Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
2. Getter 接受 state 作为其第一个参数：
```javascript
  const store = new Vuex.Store({
    state: {
      todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
      ]
    },
    getters: {
      doneTodos: state => {
        return state.todos.filter(todo => todo.done)
      }
    }
  })
```
3. 通过属性访问
  - Getter 会暴露为 **store.getters** 对象，你可以以属性的形式访问这些值：
```javascript
  store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```
  - Getter 也可以接受其他 getter 作为第二个参数：
  ```javascript
    getters: {
      // ...
      doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
      }
    }
  ```
  ```javascript
    store.getters.doneTodosCount // -> 1
  ```
  - 我们可以很容易地在任何组件中使用它：
  ```javascript
    computed: {
      doneTodosCount () {
        return this.$store.getters.doneTodosCount
      }
    }
  ```
> 注意：getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。  

4. 通过方法访问
  - 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
  ```javascript
    getters: {
      // ...
      getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
      }
    }
  ```  
  ```javascript
    store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
  ```
> 注意：getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。  
5. mapGetters 辅助函数
  - mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
  ```javascript
    import { mapGetters } from 'vuex'
    
    export default {
      // ...
      computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
          'doneTodosCount',
          'anotherGetter',
          // ...
        ])
      }
    }
  ```
  - 如果你想将一个 getter 属性另取一个名字，使用对象形式：
  ```javascript
    mapGetters({
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    })
  ```
### 2.2.1、getter - 博客
- vue计算属性computed一样，来实时监听state值的变化(最新状态)，并把它也仍进Vuex.Store里面
- Getter相当于vue中的computed计算属性，getter 的返回值会根据它的依赖被**缓存**起来，且只有当它的依赖值发生了改变才会被重新计算，这里我们可以通过定义vuex的Getter来获取，Getters 可以用于监听、state中的值的变化，返回计算后的结果
```javascript
  import Vue from 'vue';
  import Vuex from 'vuex';
  Vue.use(Vuex);
   const state={   //要设置的全局访问的state对象
       showFooter: true,
       changableNum:0
       //要设置的初始属性值
     };
  const getters = {   //实时监听state值的变化(最新状态)
      isShow(state) {  //方法名随意,主要是来承载变化的showFooter的值
         return state.showFooter
      },
      getChangedNum(){  //方法名随意,主要是用来承载变化的changableNum的值
         return state.changebleNum
      }
  };
  const store = new Vuex.Store({
         state,
         getters
  });
  export default store;
```
### 2.2.3、项目中此时有关 getter 的代码
- /src/store/index.js
```javascript
  import Vue from 'vue';
  import Vuex from 'vuex';
  
  Vue.use(Vuex);
  const state = {//要设置的全局访问的state对象
    showFooter: true,
    count: 0
    //要设置的初始属性值
  };
  const getters = { //实时监听state值的变化(最新状态)
    isShow(state) {  //方法名随意,主要是来承载变化的showFooter的值
      return state.showFooter;
    },
    getChangedNum() {  //方法名随意,主要是用来承载变化的count的值
      return state.count;
    }
  };
  //创建一个vuex容器，容器是唯一的
  const store = new Vuex.Store({
    state,
    getters
  });
  export default store;
```
- /src/components/Home.vue
```javascript
  <template>
    <div>
      <p>count: {{counts}}</p>
      <p>showFooter：{{gettersCount}}</p>
    </div>
  </template>
  <script>
    export default {
      name: "Home",
      computed: {
        counts() {
          return this.$store.state.count
        },
        gettersCount(){
          return this.$store.getters.isShow
        }
      }
    }
  </script>
```

## 2.3、 Mutation
### 2.3.1、mutation - 官网
- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
```javascript
  const store = new Vuex.Store({
    state: {
      count: 1
    },
    mutations: {
      increment (state) {
        // 变更状态
        state.count++
      }
    }
  })
```
- 你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
```javascript
  store.commit('increment')
```
##### 提交载荷
  - 你可以向 store.commit 传入额外的参数，即 mutation 的载荷（payload）：
  ```javascript
    // ...
    mutations: {
      increment (state, n){
        state.count += n
      }
    }
  ```
  ```javascript
    store.commit('increment', 10)
  ```
  - 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：
  ```javascript
    // ...
    mutations: {
      increment (state, payload) {
        state.count += payload.amount
      }
    }
  ```
  ```javascript
    store.commit('increment', {
      amount: 10
    })
  ```
##### 对象风格的提交方式
  - 提交 mutation 的另一种方式是直接使用包含 type 属性的对象：
  ```javascript
    store.commit({
      type: 'increment',
      amount: 10
    })
  ```
  - 当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：
  ```javascript
    mutations: {
      increment (state, payload) {
        state.count += payload.amount
      }
    }
  ```
##### Mutation 需遵守 Vue 的响应规则
  - 既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：
    1. 最好提前在你的 store 中初始化好所有所需属性。
    2. 当需要在对象上添加新属性时，你应该
      - 使用 Vue.set(obj, 'newProp', 123), 或者
      - 以新对象替换老对象。例如，利用 stage-3 的对象展开运算符我们可以这样写：
   ```javascript
    state.obj = { ...state.obj, newProp: 123 }
   ```
##### Mutation 必须是同步函数    
  - 一条重要的原则就是要记住 mutation 必须是 **同步函数**。为什么？请参考下面的例子：
  ```javascript
    mutations: {
      someMutation (state) {
        api.callAsyncMethod(() => {
          state.count++
        })
      }
    }
  ```
  - 现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。
 ##### 在组件中提交 Mutation
  - 你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
  
  ```javascript
    import { mapMutations } from 'vuex'
    
    export default {
      // ...
      methods: {
        ...mapMutations([
          'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    
          // `mapMutations` 也支持载荷：
          'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
        ]),
        ...mapMutations({
          add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
        })
      }
    }
  ```
 
  
### 2.3.2、mutation - 博客
- mutattions也是一个对象，这个对象里面可以放改变state的初始值的方法，具体的用法就是给里面的方法传入参数state或额外的参数,然后利用vue的双向数据驱动进行值的改变，同样的定义好之后也把这个mutations扔进Vuex.Store里面，如下：
```javascript
  import Vue from 'vue';
  import Vuex from 'vuex';
  Vue.use(Vuex);
   const state={   //要设置的全局访问的state对象
       showFooter: true,
       changableNum:0
       //要设置的初始属性值
     };
  const getters = {   //实时监听state值的变化(最新状态)
      isShow(state) {  //承载变化的showFooter的值
         return state.showFooter
      },
      getChangedNum(){  //承载变化的changebleNum的值
         return state.changableNum
      }
  };
  const mutations = {
      show(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
          state.showFooter = true;
      },
      hide(state) {  //同上
          state.showFooter = false;
      },
      newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
         state.changableNum+=sum;
      }
  };
   const store = new Vuex.Store({
         state,
         getters,
         mutations
  });
  export default store;
```
- 这时候你完全可以用 this.$store.commit('show') 或 this.$store.commit('hide') 以及 this.$store.commit('newNum',6) 在别的组件里面进行改变showfooter和changebleNum的值了，但这不是理想的改变值的方式；因为在 Vuex 中，mutations里面的方法 都是 **同步** 事务，意思就是说：比如这里的一个this.$store.commit('newNum',sum)方法,两个组件里用执行得到的值，每次都是一样的，这样肯定不是理想的需求

### 2.3.3、项目中此时有关 mutation 的代码
- /src/store/index.js
```javascript
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
  // 定义mutation
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
  const store = new Vuex.Store({
    state,
    getters,
    mutations//注册
  });
  export default store;
```
- /src/components/Home.vue
```javascript
  <template>
    <div>
      <p>【state】count的值为： {{counts}}</p>
      <p>【getter】showFooter的值为{{gettersCount}}</p>
      <p>【mutation】<button @click="getValue">count的值+6</button></p>
    </div>
  </template>
  <script>
    export default {
      name: "Home",
      computed: {
        counts() {
          return this.$store.state.count
        },
        gettersCount(){
          return this.$store.getters.isShow
        },
      },
      methods:{
        getValue(){
           this.$store.commit('newNum',6)
        }
      }
    }
  </script>
```

## 2.4、 Action
### 2.4.1、action - 官网
- Action 类似于 mutation，不同在于：
  - Action 提交的是 mutation，而不是直接变更状态。
  - Action 可以包含任意异步操作。
- 让我们来注册一个简单的 action：
```javascript
  const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    actions: {
      increment (context) {
        context.commit('increment')
      }
    }
  })
```  
- Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。
- 实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：
```javascript
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
```
##### 分发 Action
  - Action 通过 store.dispatch 方法触发：
  ```javascript
    store.dispatch('increment')
  ```
  - 乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：
  ```javascript
    actions: {
      incrementAsync ({ commit }) {
        setTimeout(() => {
          commit('increment')
        }, 1000)
      }
    }
  ```
  - Actions 支持同样的载荷方式和对象方式进行分发：
  ```javascript
    // 以载荷形式分发
    store.dispatch('incrementAsync', {
      amount: 10
    })
    
    // 以对象形式分发
    store.dispatch({
      type: 'incrementAsync',
      amount: 10
    })
  ```  
  - 来看一个更加实际的购物车示例，涉及到调用异步 API 和分发多重 mutation：
  ```javascript
    actions: {
      checkout ({ commit, state }, products) {
        // 把当前购物车的物品备份起来
        const savedCartItems = [...state.cart.added]
        // 发出结账请求，然后乐观地清空购物车
        commit(types.CHECKOUT_REQUEST)
        // 购物 API 接受一个成功回调和一个失败回调
        shop.buyProducts(
          products,
          // 成功操作
          () => commit(types.CHECKOUT_SUCCESS),
          // 失败操作
          () => commit(types.CHECKOUT_FAILURE, savedCartItems)
        )
      }
    }
  ```
  - 注意我们正在进行一系列的异步操作，并且通过提交 mutation 来记录 action 产生的副作用（即状态变更）

##### 组合 Action
  - Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？
  - 首先，你需要明白 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：
  ```javascript
    actions: {
      actionA ({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('someMutation')
            resolve()
          }, 1000)
        })
      }
    }
  ```
  - 现在你可以：
  ```javascript
    store.dispatch('actionA').then(() => {
      // ...
    })
  ```
  - 在另外一个 action 中也可以：
  ```javascript
    actions: {
      // ...
      actionB ({ dispatch, commit }) {
        return dispatch('actionA').then(() => {
          commit('someOtherMutation')
        })
      }
    }
  ```
  - 最后，如果我们利用 async / await，我们可以如下组合 action：
  ```javascript
    // 假设 getData() 和 getOtherData() 返回的是 Promise
    
    actions: {
      async actionA ({ commit }) {
        commit('gotData', await getData())
      },
      async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
      }
    }
  ```
  > 注：一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

##### 在组件中分发 Action
  - 你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
  
  ```javascript
    import { mapActions } from 'vuex'
    
    export default {
      // ...
      methods: {
        ...mapActions([
          'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    
          // `mapActions` 也支持载荷：
          'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
        ]),
        ...mapActions({
          add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        })
      }
    }
  ```

### 2.4.2、action - 博客
- 在vuex官方API还提供了一个actions，这个actions也是个对象变量，最大的作用就是里面的Action方法 可以包含任意异步操作，这里面的方法是用来异步触发mutations里面的方法，actions里面自定义的函数接收一个context参数和要变化的形参，context与store实例具有相同的方法和属性，所以它可以执行context.commit(' '),然后也不要忘了把它也扔进Vuex.Store里面：
```javascript
  import Vue from 'vue';
  import Vuex from 'vuex';
  Vue.use(Vuex);
   const state={   //要设置的全局访问的state对象
       showFooter: true,
       changableNum:0
       //要设置的初始属性值
     };
  const getters = {   //实时监听state值的变化(最新状态)
      isShow(state) {  //承载变化的showFooter的值
         return state.showFooter
      },
      getChangedNum(){  //承载变化的changebleNum的值
         return state.changableNum
      }
  };
  const mutations = {
      show(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
          state.showFooter = true;
      },
      hide(state) {  //同上
          state.showFooter = false;
      },
      newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
         state.changableNum+=sum;
      }
  };
   const actions = {
      hideFooter(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
          context.commit('hide');
      },
      showFooter(context) {  //同上注释
          context.commit('show');
      },
      getNewNum(context,num){   //同上注释，num为要变化的形参
          context.commit('newNum',num)
       }
  };
    const store = new Vuex.Store({
         state,
         getters,
         mutations,
         actions
  });
  export default store;
```
- 而在外部组件里进行全局执行actions里面方法的时候，你只需要用执行
```javascript
  this.$store.dispatch('hideFooter'); 
  this.$store.dispatch('showFooter');
  this.$store.dispatch('getNewNum',6); //6要变化的实参
```
### 2.4.3、项目中此时有关 action 的代码
- /src/store/index.js
```javascript
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
  const actions = {
    hideFooter(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
      context.commit('hide');
    },
    showFooter(context) {  //同上注释
      context.commit('show');
    },
    getNewNum(context,num){   //同上注释，num为要变化的形参
      context.commit('newNum',num)
    }
  };
  //创建一个vuex容器，容器是唯一的
  const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  });
  export default store;
```
- /src/components/Home.vue
```javascript
  <template>
    <div>
      <p>【state】count的值为： {{counts}}</p>
      <p>【getter】showFooter的值为{{gettersCount}}</p>
      <p>【mutation】<button @click="getValue">count的值+6</button></p>
      <p>【action】<button @click="getShowVal">切换showFooter得值</button></p>
    </div>
  </template>
  <script>
    export default {
      name: "Home",
      computed: {
        counts() {
          return this.$store.state.count
        },
        gettersCount(){
          return this.$store.getters.isShow
        },
      },
      methods:{
        getValue(){
           this.$store.commit('newNum',6)
        },
        getShowVal(){
          this.gettersCount ? this.$store.dispatch('hideFooter') : this.$store.dispatch('showFooter')
        }
      }
    }
  </script>
```

## 2.5、 Module
### 2.5.1、module - 官网
- 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
- 为了解决以上问题，Vuex 允许我们将 store 分割成 **模块（module）** 。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
```javascript
  const moduleA = {
    state: { ... },
    mutations: { ... },
    actions: { ... },
    getters: { ... }
  }
  
  const moduleB = {
    state: { ... },
    mutations: { ... },
    actions: { ... }
  }
  
  const store = new Vuex.Store({
    modules: {
      a: moduleA,
      b: moduleB
    }
  })
  
  store.state.a // -> moduleA 的状态
  store.state.b // -> moduleB 的状态
```

##### 模块的局部状态
  - 对于模块内部的 mutation 和 getter，接收的第一个参数是 **模块的局部状态对象**。
  ```javascript
    const moduleA = {
      state: { count: 0 },
      mutations: {
        increment (state) {
          // 这里的 `state` 对象是模块的局部状态
          state.count++
        }
      },
    
      getters: {
        doubleCount (state) {
          return state.count * 2
        }
      }
    }
  ```
  - 同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：
  ```javascript
    const moduleA = {
      // ...
      actions: {
        incrementIfOddOnRootSum ({ state, commit, rootState }) {
          if ((state.count + rootState.count) % 2 === 1) {
            commit('increment')
          }
        }
      }
    }
  ```
  - 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：
  ```javascript
    const moduleA = {
      // ...
      getters: {
        sumWithRootCount (state, getters, rootState) {
          return state.count + rootState.count
        }
      }
    }
  ```
##### 命名空间
  - 默认情况下，模块内部的 action、mutation 和 getter 是注册在 **全局命名空间** 的——这样使得多个模块能够对同一 mutation 或 action 作出响应。 
  - 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：
  ```javascript
    const store = new Vuex.Store({
      modules: {
        account: {
          namespaced: true,
    
          // 模块内容（module assets）
          state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
          getters: {
            isAdmin () { ... } // -> getters['account/isAdmin']
          },
          actions: {
            login () { ... } // -> dispatch('account/login')
          },
          mutations: {
            login () { ... } // -> commit('account/login')
          },
    
          // 嵌套模块
          modules: {
            // 继承父模块的命名空间
            myPage: {
              state: { ... },
              getters: {
                profile () { ... } // -> getters['account/profile']
              }
            },
    
            // 进一步嵌套命名空间
            posts: {
              namespaced: true,
    
              state: { ... },
              getters: {
                popular () { ... } // -> getters['account/posts/popular']
              }
            }
          }
        }
      }
    })
  ``` 
  - 启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit。换言之，你在使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。更改 namespaced 属性后不需要修改模块内的代码。
  
##### 在带命名空间的模块内访问全局内容（Global Assets）
  - 如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。
  - 若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
  ```javascript
    modules: {
      foo: {
        namespaced: true,
    
        getters: {
          // 在这个模块的 getter 中，`getters` 被局部化了
          // 你可以使用 getter 的第四个参数来调用 `rootGetters`
          someGetter (state, getters, rootState, rootGetters) {
            getters.someOtherGetter // -> 'foo/someOtherGetter'
            rootGetters.someOtherGetter // -> 'someOtherGetter'
          },
          someOtherGetter: state => { ... }
        },
    
        actions: {
          // 在这个模块中， dispatch 和 commit 也被局部化了
          // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
          someAction ({ dispatch, commit, getters, rootGetters }) {
            getters.someGetter // -> 'foo/someGetter'
            rootGetters.someGetter // -> 'someGetter'
    
            dispatch('someOtherAction') // -> 'foo/someOtherAction'
            dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
    
            commit('someMutation') // -> 'foo/someMutation'
            commit('someMutation', null, { root: true }) // -> 'someMutation'
          },
          someOtherAction (ctx, payload) { ... }
        }
      }
    }
  ```
   
##### 在带命名空间的模块注册全局 action
  - 若需要在带命名空间的模块注册全局 action，你可添加 root: true，并将这个 action 的定义放在函数 handler 中。例如：
  ```javascript
    {
      actions: {
        someOtherAction ({dispatch}) {
          dispatch('someAction')
        }
      },
      modules: {
        foo: {
          namespaced: true,
    
          actions: {
            someAction: {
              root: true,
              handler (namespacedContext, payload) { ... } // -> 'someAction'
            }
          }
        }
      }
    }
  ```    
 
##### 带命名空间的绑定函数
  - 当使用 mapState, mapGetters, mapActions 和 mapMutations 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：
  ```javascript
    computed: {
      ...mapState({
        a: state => state.some.nested.module.a,
        b: state => state.some.nested.module.b
      })
    },
    methods: {
      ...mapActions([
        'some/nested/module/foo', // -> this['some/nested/module/foo']()
        'some/nested/module/bar' // -> this['some/nested/module/bar']()
      ])
    }
  ```    
  - 对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：
  ```javascript
    computed: {
      ...mapState('some/nested/module', {
        a: state => state.a,
        b: state => state.b
      })
    },
    methods: {
      ...mapActions('some/nested/module', [
        'foo', // -> this.foo()
        'bar' // -> this.bar()
      ])
    }
  ```
  - 而且，你可以通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：
  ```javascript
    import { createNamespacedHelpers } from 'vuex'
    
    const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
    
    export default {
      computed: {
        // 在 `some/nested/module` 中查找
        ...mapState({
          a: state => state.a,
          b: state => state.b
        })
      },
      methods: {
        // 在 `some/nested/module` 中查找
        ...mapActions([
          'foo',
          'bar'
        ])
      }
    }
  ``` 
  
##### 给插件开发者的注意事项
  - 如果你开发的插件（Plugin）提供了模块并允许用户将其添加到 Vuex store，可能需要考虑模块的空间名称问题。对于这种情况，你可以通过插件的参数对象来允许用户指定空间名称：
  ```javascript
    // 通过插件的参数对象得到空间名称
    // 然后返回 Vuex 插件函数
    export function createPlugin (options = {}) {
      return function (store) {
        // 把空间名字添加到插件模块的类型（type）中去
        const namespace = options.namespace || ''
        store.dispatch(namespace + 'pluginAction')
      }
    }
  ```  

##### 模块动态注册
  1. 在 store 创建之后，你可以使用 store.registerModule 方法注册模块：
  ```javascript
    // 注册模块 `myModule`
    store.registerModule('myModule', {
      // ...
    })
    // 注册嵌套模块 `nested/myModule`
    store.registerModule(['nested', 'myModule'], {
      // ...
    })
  ```
  
   - 之后就可以通过 store.state.myModule 和 store.state.nested.myModule 访问模块的状态。
   - 模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，vuex-router-sync 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。
   - 你也可以使用 store.unregisterModule(moduleName) 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）
  2. 保留 state
   - 在注册一个新 module 时，你很有可能想保留过去的 state，例如从一个服务端渲染的应用保留 state。你可以通过 preserveState 选项将其归档：store.registerModule('a', module, { preserveState: true })。
     
   - 当你设置 preserveState: true 时，该模块会被注册，action、mutation 和 getter 会被添加到 store 中，但是 state 不会。这里假设 store 的 state 已经包含了这个 module 的 state 并且你不希望将其覆写。

##### 模块重用
  - 有时我们可能需要创建一个模块的多个实例，例如：
    - 创建多个 store，他们公用同一个模块 (例如当 runInNewContext 选项是 false 或 'once' 时，为了在服务端渲染中避免有状态的单例)
    - 在一个 store 中多次注册同一个模块
  - 如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时 store 或模块间数据互相污染的问题。
  - 实际上这和 Vue 组件内的 data 是同样的问题。因此解决办法也是相同的——使用一个函数来声明模块状态（仅 2.3.0+ 支持）：
  ```javascript
    const MyReusableModule = {
      state () {
        return {
          foo: 'bar'
        }
      },
      // mutation, action 和 getter 等等...
    }
  ```      

### 2.5.1、module - 博客
- modules 模块化 以及 组件中引入 mapGetters、mapActions 和 mapStates的使用
- 因为在大多数的项目中，我们对于全局状态的管理并不仅仅一种情况的需求，有时有多方面的需求，比如写一个商城项目，你所用到的全局state可能是关于购物车这一块儿的也有可能是关于商品价格这一块儿的；像这样的情况我们就要考虑使用vuex中的 modules 模块化了，
##### 具体怎么使用modules呢？咱们继续一步一步的走：
1. 首先，在store文件夹下面新建一个modules文件夹，然后在modules文件里面建立需要管理状态的js文件，既然要把不同部分的状态分开管理，那就要把它们给分成独立的状态文件了，如下图：
 ![avatar](/src/assets/path.jpg)
2. 而对应的store文件夹下面的index.js 里面的内容就直接改写成：
 ```javascript
    import Vue from 'vue';
    import Vuex from 'vuex';
    import footerStatus from './modules/footerStatus'
    import collection from './modules/collection'
    Vue.use(Vuex);
    
    export default new Vuex.Store({
        modules:{
             footerStatus,
             collection
        }
    });
  ```
3. 相应的js，其中的 namespaced:true 表示当你需要在别的文件里面使用( mapGetters、mapActions 接下来会说 )时，里面的方法需要注明来自哪一个模块的方法:
  ```javascript
    //collection.js
    
    const state={
        collects:[],  //初始化一个colects数组
    };
    const getters={
      renderCollects(state){ //承载变化的collects
        return state.collects;
      }
    };
    const mutations={
         pushCollects(state,items){ //如何变化collects,插入items
            state.collects.push(items)
         }
     };
    const actions={
        invokePushItems(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
            context.commit('pushCollects',item);
        }
    };
    export default {
         namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
         state,
         getters,
         mutations,
         actions
    }
  ```
  ```javascript
    //footerStatus.js
     
    const state={   //要设置的全局访问的state对象
         showFooter: true,
         changableNum:0
         //要设置的初始属性值
       };
    const getters = {   //实时监听state值的变化(最新状态)
        isShow(state) {  //承载变化的showFooter的值
           return state.showFooter
        },
        getChangedNum(){  //承载变化的changebleNum的值
           return state.changableNum
        }
    };
    const mutations = {
        show(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
            state.showFooter = true;
        },
        hide(state) {  //同上
            state.showFooter = false;
        },
        newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
           state.changableNum+=sum;
        }
    };
     const actions = {
        hideFooter(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
            context.commit('hide');
        },
        showFooter(context) {  //同上注释
            context.commit('show');
        },
        getNewNum(context,num){   //同上注释，num为要变化的形参
            context.commit('newNum',num)
         }
    };
    export default {
        namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
        state,
        getters,
        mutations,
        actions
    }
  ```
4. 这样一改就有了关于两个模块的state管理文件了 footerStatus.js和collection.js，现在你要运行当前的代码话，项目会报错！因为我们把上面的代码模块化分开了，引用的地方还没有改。接下来咱们一起来看看 
    - mapState,mapGetters,mapActions的使用，首先 在需要用的 组件里面先导入 import {mapState,mapGetters,mapActions} from 'vuex';咱们先修正一下隐藏或显示页面底部的tabs选项卡（就是上面举的临时例子）的组件代码
```javascript
       
  <template>
    <div id="app">
      <router-view/>
      <FooterBar v-if="isShow" />
    </div>
  </template>
 
  <script>
  import {mapState,mapGetters,mapActions}   from 'vuex'; //先要引入
  import FooterBar from '@/components/common/FooterBar'
  import config from './config/index'
  export default {
    name: 'App',
    components:{
      FooterBar:FooterBar
    },
    data(){
      return {
      }
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
          if(to.name=='book'||to.name=='my'){
             this.$store.dispatch('footerStatus/showFooter') //这里改为'footerStatus/showFooter',
                                                           //意思是指footerStatus.js里actions里的showFooter方法
          }else{
             this.$store.dispatch('footerStatus/hideFooter') //同上注释
          }
        }
    }
  }
  </script>
 ``` 
5. 现在项目代码应该就不会报错了，好,最后咱们再来看一下mapActions的用法，实际上上面的this.$store.dispatch('footerStatus/showFooter')已经算是一种执行相应模块的action里的方法了，但有时会牵扯的事件的触发及传值，那就会有下面的mapActions用法了,还记得上面的另一个模块collection.js吗？来看一下里面的actions中的方法结构：
  ```javascript
    const state={
        collects:[],  //初始化一个colects数组
    };
    const getters={
      renderCollects(state){ //承载变化的collects
        return state.collects;
      }
    };
    const mutations={
         pushCollects(state,items){ //如何变化collects,插入items
            state.collects.push(items)
         }
     };
    const actions={
        invokePushItems(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
            context.commit('pushCollects',item);
        }
    };
  ```
   - 需要传值来实时变动state.collects里的数据，那肯定要在执行它的地方进行传值了，所以下面用到它的地方我们用了个@click来执行这个invokePushItems方法了，并且传入相应的对象数据item,如下：
   ```javascript
    <template>
      <div >
          <section class="joinState">
               <div class="joinStateHead">
                    <span class="h3">全国改性料通讯录</span>
                    <span class="joinStatus" @click="invokePushItems(item)">加入收藏列</span>
               </div>
          </section>
      </div>
    </template>
    
    <script>
    import { mapActions } from 'vuex'
    export default {
      components:{
         conditionFilter
      },
      name: 'bookDetail',
      data () {
        return {
          msg: '',
          item:{
             id:'01',
             productName: '苹果',
             price:'1.6元/斤'
           }
        }
      },
      mounted() {
        this.$store.dispatch('footerStatus/hideFooter')
      },
      methods:{
          ...mapActions('collection',[ //collection是指modules文件夹下的collection.js
              'invokePushItems'  //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
          ])
      }
    
    }
    </script>
   ```
6. 这样一来，在这个组件里面操作的 collecttion.js 中的state的数据，在其他的任何的一个组件里面都会得到相应的更新变化了，获取状态的页面代码如下：
   ```javascript
    <template>
      </div>
        <div>
            <ul>
                <li v-for="(val,index) in arrList" :key="index">
                    <h5>{{val.productName}}</h5>
                     <p>{{val.price}}</p>
                </li>
            </ul>
        </div>
    </template>
    
    <script>
    import {mapState,mapGetters,mapActions} from 'vuex';
        export default {
            name: 'book',
            data() {
                return {
                }
            },
        computed:{
            // ...mapState({  //用mapState来获取collection.js里面的state的属性值
            //    arrList:state=>state.collection.collects
            // }),
            ...mapGetters('collection',{ //用mapGetters来获取collection.js里面的getters
                arrList:'renderCollects'
            })
    
        }
        }
    </script>
   ```

- 至此，vuex中的常用的一些知识点使用算是简单的分享完了，当然了，相信这些只是一些皮毛！只能说是给予刚接触vuex的初学者一个参考与了解吧！有哪里不明白的或不对的，留言下，咱们可以一起讨论、共同学习！

> 注：项目中有关vuex modules的代码在这里不在展示，就是此时项目中的代码

> 注：有关vuex核心概念的代码分配
  - Home：包含 state  getter mutation action modules
  - Detail: 包含 modules 中 mapState的使用
  - List：包含 modules 中 mapGetters,mapActions 的使用
  - store文件下都是有关vuex的代码

# 三、项目结构
## 3.1、 项目结构
- Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：
  1. 应用层级的状态应该集中到单个 store 对象中。
  2. 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
  3. 异步逻辑都应该封装到 action 里面。
- 只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。
- 对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：
```
  ├── index.html
  ├── main.js
  ├── api
  │   └── ... # 抽取出API请求
  ├── components
  │   ├── App.vue
  │   └── ...
  └── store
      ├── index.js          # 我们组装模块并导出 store 的地方
      ├── actions.js        # 根级别的 action
      ├── mutations.js      # 根级别的 mutation
      └── modules
          ├── cart.js       # 购物车模块
          └── products.js   # 产品模块
``` 
  

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name:'home',
      component: () => import('../components/home')
    },
    {
      path: '/detail',
      name:'detail',
      component: () => import('../components/Detail')
    },
    {
      path: '/list',
      name:'list',
      component: () => import('../components/list')
    }
  ]
})

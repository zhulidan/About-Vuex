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
      component: () => import('../components/home')
    },
    {
      path: '/detail',
      component: () => import('../components/Detail')
    }
  ]
})

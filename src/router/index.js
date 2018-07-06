import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/test',
      component: resolve => require(['../components/page/Test.vue'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
              path: '/index',
              component: resolve => require(['../components/page/BlogIndex.vue'], resolve)
        },
        // {
        //       path: '/map',
        //       component: resolve => require(['../components/page/Map.vue'], resolve)
        // },
        {
          path: '/about',
          component: resolve => require(['../components/page/blog/About.vue'], resolve)
         },
         {
          path: '/ma',
          component: resolve => require(['../components/page/blog/ManageArticle.vue'], resolve)
         }
      ]
    }
  ]
})

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [         //子路由

    ],
  },
  {
    path: '/articlelist',
    name: 'ArticleList',
    component: () => import('../views/ArticleList.vue')
  },

  {
    path: '/finishedtealist',
    name: 'FinishedTeaList',
    component: () => import('../views/FinishedTeaList.vue')
  },
  {
    path: '/geographiclist',
    name: 'GeographicList',
    component: () => import('../views/GeographicList.vue')
  },
  {
    path: '/chinamap',
    name: 'ChinaMap',
    component: () => import('../views/chinaMap.vue')
  },
  {
    path: '/finishedtea/:id',
    name: 'FinishedTea',
    component: () => import('../views/FinishedTea.vue')
  },
  {
    path: '/teaclass/:id',
    name: 'TeaClass',
    component: () => import('../views/TeaClass.vue')
  },
  {
    path: '/articlecontent/:id',
    name: 'ArticleContent',
    component: () => import('../views/ArticleContent.vue')
  },
  {
    path: '/geographic/:id',
    name: 'Geographic',
    component: () => import('../views/Geographic.vue')

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

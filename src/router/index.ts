import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
// import boy from '../components/ComicBoy.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/comic',
    name: 'Comic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Comic.vue')
  },
  {
    path: "/content",
    name: 'Content',
    component: () => import('../views/Content.vue')
  },
  {
    path: "/login",
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: "/register",
    name: 'Register',
    component: () => import('../views/register.vue')
  },
  {
    path: "/collect",
    name: 'Collect',
    component: () => import('../views/Collect.vue')
  },
  {
    path: "/history",
    name: 'History',
    component: () => import('../views/History.vue')
  },
  {
    path: "/list",
    name: 'List',
    component: () => import('../views/List.vue'),
    children: [
      {
        path: "shaonian",
        name: "shaonain",
        component: () => import('../components/ComicBoy.vue')
      },
      {
        path: "shaonv",
        name: "shaonv",
        component: () => import('../components/ComicGirl.vue')
      },
      {
        path: "qingnain",
        name: "qingnian",
        component: () => import('../components/ComicYouth.vue')
      },
      {
        path: "nvxing",
        name: "nvxing",
        component: () => import('../components/ComicWomen.vue')
      },
      {
        path: "new",
        name: "new",
        component: () => import('../components/new.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

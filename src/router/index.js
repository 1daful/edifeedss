import { authGuard } from '@/api/auth/authGuard'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    navigational: true,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
    navigational: true,
    props: true
  },
  {
    path: '/bee',
    name: 'Bee',
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
    navigational: true,
    props: true
  },
  {
    path: '/goat',
    name: 'Goat',
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
    navigational: true,
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/Profile.vue'),
    navigational: true,
    props: true,
    beforeEnter: authGuard,
    child: [
      {
          path: '/profile:',
          name: 'About',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
          navigational: true,
          props: true
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
        navigational: true,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

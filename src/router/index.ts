import { authGuard } from '@/api/auth/authGuard'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import SignIn from "../pages/SignIn.vue";

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
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    props: (route: { query: { myUrl: any } }) => ({myUrl: route.query.myUrl}),
    meta: {
      noHeader: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../pages/SignUp.vue'),
    props: true
  },
  {
    path: '/password-recovery',
    name: 'PasswordRecovery',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/PasswordRecovery.vue'),
    navigational: true,
    props: true
  },
  {
    props: (route: { params: { myUrl: any } }) => ({myUrl: route.params.myUrl}),
    path: '/access_token=:myUrl',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Auth.vue'),
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

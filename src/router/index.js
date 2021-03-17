import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import PageNotFound from '../views/404.vue'
import AddProduct from '@/components/AddProduct'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import('../views/Register.vue')
  // },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    children: [
      {
        path: '/products/add',
        name: 'AddProduct',
        component: AddProduct
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (from.name === 'Login' && to.name === 'Products' && !localStorage.access_token) {
    console.log('masuk tidak ada access token')
    next({ name: 'Login' })
  } else if (from.name === 'Login' && to.name === 'Products' && localStorage.access_token) {
    console.log('masuk ada access token')
    next()
  } else {
    next()
  }
})

export default router

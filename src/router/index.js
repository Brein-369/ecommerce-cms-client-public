import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import PageNotFound from '../views/PageNotFound.vue'
import AddProduct from '@/components/AddProduct'
import Categories from '@/views/Categories.vue'
import AddCategory from '@/components/AddCategory'

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
    path: '/categories',
    name: 'Categories',
    component: Categories,
    children: [
      {
        path: '/categories/add',
        name: 'AddCategory',
        component: AddCategory
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
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Products' && !localStorage.access_token) {
    console.log('masuk tidak ada access token')
    next({ name: 'Login' })
  } else if (to.name === 'Products' && localStorage.access_token) {
    console.log('masuk ada access token')
    next()
  } else if (to.name === 'Login' && localStorage.access_token) {
    console.log('keluar ada access token')
    next({ name: 'Products' })
  } else if (to.name === '/' && !localStorage.access_token) {
    console.log('baru masuk tidak ada access_token')
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router

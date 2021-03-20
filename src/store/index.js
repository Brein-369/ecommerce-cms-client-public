import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios/axios'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allProducts: [],
    editedProduct: {},
    allCategory: [],
    editedCategory: {}
  },
  mutations: {
    getAllProducts (state, payload) {
      state.allProducts = payload
    },
    showEditProduct (state, payload) {
      state.editedProduct = payload
    },
    getAllCategory (state, payload) {
      console.log('masuk get all category mutation<<<')
      state.allCategory = payload
    },
    showEditCategory (state, payload) {
      state.editedCategory = payload
    }
  },
  actions: {
    // context bisa didestruct VVV
    // getAllProducts ({dispatch, commit, state}, payload) {
    postLogin (context, payload) {
      console.log('masuk action LOGIN')
      axios({
        url: '/login',
        method: 'post',
        data: payload
      }).then(response => {
        console.log(response.data, 'masuk then login client')
        localStorage.setItem('access_token', response.data.access_token)
        router.push({ name: 'Products' })
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    getAllProducts (context, payload) {
      axios.get('/products', {
        headers: {
          access_token: localStorage.access_token
        }
      }).then(response => {
        context.commit('getAllProducts', response.data)
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    doAddProduct (context, payload) {
      // pakai return jadi bisa dichaining di componentnya
      return axios.post('/products', payload,
        {
          headers: {
            access_token: localStorage.access_token
          }
        }).then(response => {
        console.log(response.data)
        // go to action get all product
        context.dispatch('getAllProducts')
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    deleteProduct (context, id) {
      return axios.delete('/products/' + id, {
        headers: {
          access_token: localStorage.access_token
        }
      }).then(response => {
        console.log(response.data)
        // go to action get all product
        context.dispatch('getAllProducts')
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    showEditProduct (context, id) {
      console.log(id, 'masuk show edit product action<<<<')
      axios.get('/products/' + id, {
        headers: {
          access_token: localStorage.access_token
        }
      }).then(response => {
        console.log(response.data)
        context.commit('showEditProduct', response.data)
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    editProduct (context, payload) {
      console.log(payload.id, 'masuk do edit product action<<<<')
      axios.put('/products/' + payload.id, payload, {
        headers: {
          access_token: localStorage.access_token
        }
      }).then(response => {
        console.log(response.data)
        context.dispatch('getAllProducts')
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    getAllCategory (context) {
      console.log('masuk get all category')
      axios.get('/category', {
        headers: {
          access_token: localStorage.access_token
        }
      }).then(response => {
        console.log(response.data)
        context.commit('getAllCategory', response.data)
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    doAddCategory (context, payload) {
      return axios.post('/category', payload, {
        headers: {
          access_token: localStorage.access_token
        }
      }).then(response => {
        console.log(response.data)
        context.dispatch('getAllCategory')
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    showEditCategory (context, id) {
      console.log('masuk store showedit', id)
      axios.get('/category/' + id, {
        headers: {
          access_token: localStorage.access_token
        }
      }).then(response => {
        context.commit('showEditCategory', response.data)
        console.log(response.data)
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    editCategory (context, payload) {
      console.log(payload, 'payload dispatch')
      axios.patch('/category/' + payload.id, payload, {
        headers: {
          access_token: localStorage.access_token
        }
      }).then(response => {
        console.log(response.data)
        context.dispatch('getAllCategory')
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    deleteCategory (context, id) {
      axios.delete('/category/' + id, {
        headers: {
          access_token: localStorage.access_token
        }
      }).then(response => {
        console.log(response.data)
        context.dispatch('getAllCategory')
      }).catch(err => {
        console.log(err.reponse.data)
      })
    }
  },
  modules: {
  }
})

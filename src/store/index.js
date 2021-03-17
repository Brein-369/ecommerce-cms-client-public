import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios/axios'
// import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allProducts: [],
    editedProduct: {},
    allCategory: []
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
    }
  },
  actions: {
    // context bisa didestruct VVV
    // getAllProducts ({dispatch, commit, state}, payload) {
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
    }
  },
  modules: {
  }
})

import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce-cms-admin.herokuapp.com/'
})

export default instance

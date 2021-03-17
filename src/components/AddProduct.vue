<template>
  <div class="d-flex justify-content-center text-left">
    <form class="w-50">
      <div class="form-icon">
        <span><i class="icon icon-user"></i></span>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control item" id="name" v-model="nameInput" placeholder="Sepatu Adidas Stan Smith">
      </div>
      <div class="form-group">
        <label for="name">Image URL</label>
        <input type="text" class="form-control item" id="img_url" v-model="img_urlInput" placeholder="https://img.my-best.id/">
      </div>
      <div class="form-group">
        <label for="name">Price</label>
        <input type="number" class="form-control item" id="price" v-model="priceInput" min="1" placeholder="1499000000">
      </div>
      <div class="form-group">
        <label for="name">Stock</label>
        <input type="number" class="form-control item" id="stock" v-model="stockInput" min="1" placeholder="10">
      </div>
      <label for="category">Category</label>
      <div class="form-group">
        <select class="form-control" id="sel1" v-model="categoryInput">
          <option v-if="!categoryInput" selected>--select category--</option>
          <option v-for="eachCategory in allCategory" :key="eachCategory.id" :value="eachCategory.id">{{ eachCategory.name }}</option>
        </select>
      </div>
      <div class="form-group text-center">
        <button type="button" class="btn btn-secondary mx-3" @click.prevent="goToProducts">Close</button>
        <button type="button" class="btn btn-success mx-3" @click.prevent="doAddProduct">Add Product</button>
      </div>
    </form>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'AddProduct',
  data () {
    return {
      nameInput: '',
      img_urlInput: '',
      priceInput: '',
      stockInput: '',
      categoryInput: ''
    }
  },
  methods: {
    goToProducts () {
      this.$router.push('/products')
    },
    doAddProduct () {
      const payload = {
        name: this.nameInput,
        image_url: this.img_urlInput,
        price: this.priceInput,
        stock: this.stockInput,
        CategoryId: Number(this.categoryInput)
      }
      this.$store.dispatch('doAddProduct', payload)
        .then(() => {
          this.nameInput = ''
          this.img_urlInput = ''
          this.priceInput = ''
          this.stockInput = ''
          this.$router.push('/products')
        })
    },
    getAllCategory () {
      this.$store.dispatch('getAllCategory')
    }
  },
  computed: {
    allCategory () {
      return this.$store.state.allCategory
    }
    // ...mapState(['allCategory'])
  },
  created () {
    this.getAllCategory()
  }
}
</script>

<style>
</style>

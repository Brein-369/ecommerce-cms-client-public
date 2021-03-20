<template>
  <div class="d-flex justify-content-center text-left">
    <form class="w-50">
      <div class="form-icon">
        <span><i class="icon icon-user"></i></span>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control item" id="name" v-model="nameCategoryInput" placeholder="alat dapur">
      </div>
      <div class="form-group text-center">
        <button type="button" class="btn btn-secondary mx-3" @click.prevent="goToCategories">Close</button>
        <button type="button" class="btn btn-success mx-3" @click.prevent="doAddCategory">Add Category</button>
      </div>
    </form>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'AddCategory',
  data () {
    return {
      nameCategoryInput: ''
    }
  },
  methods: {
    goToCategories () {
      this.$router.push('/categories')
    },
    doAddCategory () {
      const payload = {
        name: this.nameCategoryInput
      }
      this.$store.dispatch('doAddCategory', payload)
        .then(() => {
          this.nameCategoryInput = ''
          this.$router.push('/categories')
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

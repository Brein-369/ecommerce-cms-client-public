<template>
  <div class="Categories">
    <Navbar></Navbar>
    <div class="container">
      <div class="title">
        <h1>Manage Categories</h1>
      </div>
      <div class="col-md-12 mb-3">
        <h3><small>*please note that if you delete a category, the product related will also be deleted</small></h3>
      </div>
      <div class="text-center">
        <button class="btn btn-success mx-auto w-25">
        <i class="material-icons" @click.prevent="goToAddCategory">Add Category Here</i></button>
      <router-view></router-view>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 ml-auto mr-auto my-5">
          <div class="table-responsive">
            <table class="table table-shopping">
              <thead>
                <tr>
                  <th></th>
                  <th class="text-center">Category Name</th>
                  <th class="text-center">Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <CategoryItem v-for="eachCategory in allCategories" :key="eachCategory.id"
                :eachCategory = "eachCategory"
                ></CategoryItem>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import CategoryItem from '@/components/CategoryItem.vue'
import { mapState } from 'vuex'
export default {
  name: 'Categories',
  data () {
    return {
    }
  },
  components: { Navbar, CategoryItem },
  methods: {
    checkLocalStorage () {
      if (!localStorage.access_token) {
        this.$router.push({ name: 'Login' })
      }
    },
    getAllCategories () {
      this.$store.dispatch('getAllCategory')
    },
    goToAddCategory () {
      this.$router.push('/categories/add')
    }
  },
  computed: {
    // cara pertama mengambil data dari state store
    allProducts () {
      // store.state bukan function jadi tidak diinvoke
      return this.$store.state.allProducts
    },
    ...mapState({
      allCategories: 'allCategory'
    })
  },
  created () {
    this.checkLocalStorage()
    this.getAllCategories()
  }
}
</script>

<style scoped>
html * {
  -webkit-font-smoothing: antialiased;
}
body {
  background: #fff !important;
}
a {
  color: #3e3947 !important;
  text-decoration: none;
}

a:hover {
  color: #89229b !important;
  text-decoration: none !important;
}
a:focus {
  color: #89229b !important;
  text-decoration: none !important;
}
.container h3 {
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 300;
  color: #3c4858;
}
.container h4 {
  font-size: 18px;
  line-height: 1.5;
  margin: 10px 0;
  font-weight: 300;
  color: #3c4858;
}

small {
  font-size: 75% !important;
  color: #777;
}

.btn-group {
  position: relative;
  margin: 10px 1px;
  display: inline-flex;
  vertical-align: middle;
}
.btn-group .btn {
  padding: 6.5px 20px !important;
}
.btn.btn-round {
  border-radius: 30px !important;
}

.btn-group .btn.btn-round {
  border-radius: 30px !important;
}

.btn-group > .btn:not(:last-child):not(.dropdown-toggle) {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.btn-group > .btn:not(:first-child) {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
.btn {
  padding: 12px 30px !important;
  margin: 5px 1px;
  font-size: 12px !important;
  box-shadow: 0 2px 2px 0 hsla(0, 0%, 60%, 0.14),
    0 3px 1px -2px hsla(0, 0%, 60%, 0.2), 0 1px 5px 0 hsla(0, 0%, 60%, 0.12);
}
.btn .material-icons {
  position: relative;
  display: inline-block;
  top: 0;
  margin-top: -1.2em;
  margin-bottom: -1em;
  font-size: 1.1rem;
  vertical-align: middle;
}
.btn.btn-sm {
  border-radius: 3px !important;
}

.btn.btn-just-icon.btn-sm {
  height: 30px;
  min-width: 30px;
  width: 30px;
}

.btn.btn-just-icon {
  font-size: 24px;
  height: 41px;
  min-width: 41px;
  width: 41px;
  padding: 0 !important;
  overflow: hidden;
  position: relative;
  line-height: 41px;
}

.btn.btn-just-icon.btn-round {
  border-radius: 50% !important;
}

.btn.btn-link {
  background: transparent;
  box-shadow: none;
  color: #999;
}

.btn.btn-info {
  color: #fff !important;
  background-color: #00bcd4 !important;
  border-color: #00bcd4;
  box-shadow: 0 2px 2px 0 rgba(0, 188, 212, 0.14),
    0 3px 1px -2px rgba(0, 188, 212, 0.2), 0 1px 5px 0 rgba(0, 188, 212, 0.12) !important;
}

.btn.btn-info:hover {
  box-shadow: 0 14px 26px -12px rgba(0, 188, 212, 0.42),
    0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 188, 212, 0.2) !important;
  background: #00aec5 !important;
}

.btn.btn-info.btn-link {
  background-color: transparent !important;
  color: #00bcd4 !important;
  box-shadow: none !important;
}
.btn.btn-success {
  color: #fff !important;
  background-color: #4caf50 !important;
  border-color: #4caf50;
  box-shadow: 0 2px 2px 0 rgba(76, 175, 80, 0.14),
    0 3px 1px -2px rgba(76, 175, 80, 0.2), 0 1px 5px 0 rgba(76, 175, 80, 0.12) !important;
}

.btn.btn-success:hover {
  box-shadow: 0 14px 26px -12px rgba(76, 175, 80, 0.42),
    0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(76, 175, 80, 0.2) !important;
  background: #47a44b !important;
}
.btn.btn-success.btn-link {
  background-color: transparent !important;
  color: #4caf50 !important;
  box-shadow: none !important;
}

.btn.btn-danger.btn-link {
  background-color: transparent !important;
  color: #f44336 !important;
  box-shadow: none !important;
}

.btn.btn-just-icon.btn-sm .material-icons {
  font-size: 17px;
  line-height: 29px;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 16px;
  background-color: transparent;
}

.table thead tr th {
  font-size: 17px;
  font-weight: 300;
}

.table > thead > tr > th {
  padding: 12px 8px;
  vertical-align: middle;
  border-color: #ddd;
  font-weight: 300;
}

.table > tbody > tr > td {
  padding: 12px 8px;
  vertical-align: middle;
  border-color: #ddd;
  font-weight: 300;
  font-size: 14px;
  color: #3c4858;
}

.table .td-actions .btn {
  margin: 0;
  padding: 5px;
}

.table .form-check {
  margin: 0;
  padding-left: 0;
}

.table .td-total {
  font-weight: 500;
  font-size: 17px;
  padding-top: 20px;
  text-align: right;
}

.table .td-price {
  font-size: 26px;
  font-weight: 300;
  margin-top: 5px;
  text-align: right;
}
.table-shopping > thead > tr > th {
  font-size: 12px;
  text-transform: uppercase;
  color: #555;
}
.table-shopping .td-name {
  min-width: 200px;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.42857143;
}

.table-shopping .td-name small {
  color: #999;
  font-size: 18px;
  font-weight: 300;
}

.table-shopping .img-container {
  width: 120px;
  max-height: 160px;
  overflow: hidden;
  display: block;
}

.table-shopping .img-container img {
  width: 100%;
}

.table-shopping > tbody > tr > td {
  font-size: 14px;
}

.table-shopping .td-number {
  text-align: right;
  min-width: 150px;
  font-size: 18px;
}

.table-shopping .td-number small {
  margin-right: 3px;
}

.table .form-check .form-check-sign {
  top: -13px;
  left: 0;
  padding-right: 0;
}

.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9 !important;
}

/*animation*/

@keyframes checkbox-on {
  0% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0 0 20px, 0px 32px 0 20px,
      -5px 5px 0 10px, 15px 2px 0 11px;
  }
  50% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0 0 20px, 0px 32px 0 20px,
      -5px 5px 0 10px, 20px 2px 0 11px;
  }
  100% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0 0 20px, 0px 32px 0 20px,
      -5px 5px 0 10px, 20px -12px 0 11px;
  }
}

</style>

<template>
  <tr>
    <td>
      <div class="img-container">
        <img
          :src="item.image_url"
          alt="..."
        />
      </div>
    </td>
    <td class="td-name">
      <p>{{ item.name }}</p>
    </td>
    <td class="td-number text-center">{{filteredPrice}}</td>
    <td class="td-number text-center">{{item.stock}} <small>unit</small></td>
    <!--kenapa return result di computed showCategoryName tidak bisa dikasi [0].name, bisanya ditaruh di template ?-->
    <td class="td-number text-center">{{showCategoryName[0].name}}</td>
    <td class="td-number text-center">
      <div class="btn-group">
        <button class="btn btn-round btn-info btn-sm" @click.prevent="deleteItem">
          <i class="material-icons">remove</i>
        </button>
        <button class="btn btn-round btn-info btn-sm" data-toggle="modal" data-target="#modalBox" @click.prevent="showEditItem">
          <i class="material-icons">edit</i>
        </button>
      </div>
        <div class="modal fade" id="modalBox" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body text-left">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="editName" v-model="showEditProduct.name" placeholder="Sepatu Adidas Stan Smith" required>
                <label for="img_url">Image Url</label>
                <input type="text" class="form-control" id="editImg_url" v-model="showEditProduct.image_url" placeholder="https://img.my-best.id/press_component/item_part_images/a9784919a998c8b61557bc422acdf173.jpg?ixlib=rails-4.2.0&auto=compress&q=70&lossless=0&w=640&h=640&fit=clip" required>
                <label for="price">Price</label>
                <input type="number" class="form-control" id="editPrice" v-model="showEditProduct.price" min="1" placeholder="1499000000" required>
                <label for="stock">Stock</label>
                <input type="number" class="form-control" id="editStock" v-model="showEditProduct.stock" min="1" placeholder="10" required>
                <label for="category">Category</label>
                <div class="form-group">

                  <select class="form-control" v-model="showEditProduct.CategoryId">
                    <option v-for="eachCategory in allCategory" :key="eachCategory.id" :value="eachCategory.id">{{ eachCategory.name }}</option>
                  </select>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click.prevent="doEditItem" data-dismiss="modal">Edit Product</button>
              </div>
            </div>
          </div>
        </div>
    </td>
  </tr>
  <!-- <tr>
    <td colspan="3"></td>
    <td class="td-total">Total</td>
    <td class="td-price text-center"><small>Rp</small>12346</td>
    <td colspan="3" class="text-right">
    <button type="button" class="btn btn-info btn-round">
        Complete Checkout
        <i class="material-icons">=></i>
    </button>
    </td>
  </tr> -->
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductItem',
  props: ['item'],
  data () {
    return {
      CategoryName: this.showCategoryName
    }
  },
  methods: {
    deleteItem () {
      const id = this.item.id
      console.log(id)
      this.$store.dispatch('deleteProduct', id)
    },
    showEditItem () {
      const id = this.item.id
      console.log(id)
      this.$store.dispatch('showEditProduct', id)
      this.$store.dispatch('getAllCategory')
    },
    doEditItem () {
      // const id = this.item.id
      console.log('categoryID', this.showEditProduct.CategoryId)
      const payload = {
        name: this.showEditProduct.name,
        image_url: this.showEditProduct.img_url,
        price: this.showEditProduct.price,
        stock: this.showEditProduct.stock,
        CategoryId: this.showEditProduct.CategoryId,
        id: this.showEditProduct.id
      }
      this.$store.dispatch('editProduct', payload)
    }
  },
  computed: {
    filteredPrice () {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.item.price)
    },
    // cara kedua mengambul data dari state store
    ...mapState({
      showEditProduct: 'editedProduct',
      allCategory: 'allCategory'
    }),
    showCategoryName () {
      console.log(this.allCategory)
      if (this.item.CategoryId) {
        const result = this.allCategory.filter(e => {
          return e.id === this.item.CategoryId
        })
        return result
      } else {
        return 'Category has not been set'
      }
    }
    // filteredCategory () {
    //   const result = this.allCategory.filter(e => {
    //     return e.id !== this.item.CategoryId
    //   })
    //   return result
    // },
    // showCategoryNameByItem () {
    //   if (this.item.CategoryId) {
    //     const result = this.allCategory.filter(e => {
    //       return e.id === this.item.CategoryId
    //     })
    //     return result[0].name
    //   } else {
    //     return 'Category has not been set'
    //   }
    // }
  },
  created () {
    this.$store.dispatch('getAllCategory')
  }
}
</script>

<style scoped>

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

.btn.btn-danger {
  color: #fff !important;
  background-color: #f44336 !important;
  border-color: #f44336;
  box-shadow: 0 2px 2px 0 rgba(244, 67, 54, 0.14),
    0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12) !important;
}

.btn.btn-danger:hover {
  box-shadow: 0 14px 26px -12px rgba(244, 67, 54, 0.42),
    0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(244, 67, 54, 0.2) !important;
  background-color: #f33527 !important;
}

.btn.btn-danger.btn-link {
  background-color: transparent !important;
  color: #f44336 !important;
  box-shadow: none !important;
}
.btn.btn-just-icon .material-icons {
  margin-top: 0;
  position: absolute;
  width: 100%;
  transform: none;
  left: 0;
  top: 0;
  height: 100%;
  line-height: 41px;
  font-size: 20px;
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

</style>

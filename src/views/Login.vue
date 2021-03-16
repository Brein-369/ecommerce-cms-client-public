<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 login-section-wrapper my-auto ">
          <div class="brand-wrapper pb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw9oD8Zih6GWb-pFHWny-i8Yu8kwheW833ag&usqp=CAU" alt="logo" class="logo ml-5">
          </div>
          <div class="login-wrapper my-auto  pl-5 my-2">
            <h1 class="login-title">Log in CMS</h1>
            <form action="#!">
              <div class="form-group text-left">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" v-model="emailInput" placeholder="email@example.com">
              </div>
              <div class="form-group mb-4 text-left">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" v-model="passwordInput" placeholder="enter your passsword">
              </div>
              <button class="btn btn-primary text-center my-2 w-25" @click.prevent="postLogin">Login</button>
            </form>
            <!-- <a href="#!" class="forgot-password-link text-center mt-3">Forgot password?</a> -->
            <!-- <p class="login-wrapper-footer-text pt-5">Don't have an account? <a @click.prevent="goToRegister" class="text-reset">Register here</a></p> -->
          </div>
        </div>

        <div class="col-sm-6 px-0 d-none d-sm-block text-right">
          <img src="https://images.pexels.com/photos/972804/pexels-photo-972804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" style="width:700px; background-position:right" alt="login image" class="login-img">
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from '@/axios/axios'
export default {
  name: 'login',
  data () {
    return {
      emailInput: '',
      passwordInput: ''
    }
  },
  methods: {
    // goToRegister () {
    //   this.$router.push({ name: 'Register' })
    // }
    postLogin () {
      axios.post('/login', {
        email: this.emailInput,
        password: this.passwordInput
      }).then(response => {
        console.log(response.data)
        localStorage.setItem('access_token', response.data.access_token)
        this.$router.push({ name: 'Products' })
      }).catch(err => {
        console.log(err.response.data)
      })
    }
  }
}
</script>

<style>

</style>

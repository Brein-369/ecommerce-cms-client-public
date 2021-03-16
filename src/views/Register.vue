<template>
    <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 login-section-wrapper my-auto ">
          <div class="brand-wrapper pb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw9oD8Zih6GWb-pFHWny-i8Yu8kwheW833ag&usqp=CAU" alt="logo" class="logo pl-5">
          </div>
          <div class="login-wrapper my-auto  pl-5 my-2">
            <h1 class="login-title">Register</h1>
            <form action="#!">
              <div class="form-group text-left">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="email@example.com">
              </div>
              <div class="form-group mb-4 text-left">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="enter your passsword">
              </div>
              <input name="login" id="login" class="btn btn-success text-center my-2 w-25" type="button" value="Register">
            </form>
            <p class="login-wrapper-footer-text pt-5">Already have an account? <a @click.prevent="goToLogin" class="text-reset">Login here</a></p>
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
// export default {
//   name: 'Register',
//   methods: {
//     goToLogin () {
//       this.$router.push({ name: 'Login' })
//     }
//   }
// }
</script>

<style>

</style>

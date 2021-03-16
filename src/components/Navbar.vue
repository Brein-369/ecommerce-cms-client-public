<template>
  <div id="nav">
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav"
        >&times;</a
      >
      <router-link to="/products">Home</router-link>
      <a href="#" @click.prevent="doLogout">Logout</a>
      <!-- <router-link to="/products" @click.prevent="doLogout">Logout</router-link> -->
    </div>

    <span style="font-size: 30px; cursor: pointer" @click.prevent="openNav"
      >&#9776; Sidebar</span>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    openNav () {
      document.getElementById('mySidenav').style.width = '250px'
    },
    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    },
    doLogout () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
body {
  font-family: "Lato", sans-serif;
}
span {
  position: fixed;
  top: 0;
  left: 0
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>

	
오후 2:06






<template>
  <div class=" container d-flex justify-content-between align-items-center mb-5 border border-0 rounded-4" style="height: 800px; background-color: #EEF9FD">
      <div class="col-sm-6 px-5">
        <form @submit.prevent="logIn" style="width: 25rem;" >
          <i class="fas fa-crow fa-2x" style="color: #709085;"></i>
          <h3 class="mb-4 fw-bold" style="letter-spacing: 1px;">Log In</h3>

          <div class="form-outline mb-4">
            <label class="form-label" for="form2Example18">Username</label>
            <input type="text" id="username" v-model="username" class="form-control form-control-lg" />
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="form2Example28">Password</label>
            <input type="password" id="password" v-model="password" class="form-control form-control-lg" />
          </div>


          <div class="mb-4">
            <button class="btn btn-lg fw-bold" type="submit" style="background-color: #7EBCD0; color: white;" >LogIn</button>
          </div>

          <p>Don't have an account? <a class="link-info" @click="notAccount" >Register here</a></p>
        </form>
      </div>

      <div class="col-sm-6">
        <img :src="randomPoster"
          alt="Login image" style="width: 80%" class="border border-0 rounded-4">
      </div>
  </div>
</template>

<script>
export default {
  name:'LoginView',
  data(){
    return {
      username: null,
      password: null,
    }
  },
  computed: {
    randomPoster() { return this.$store.getters.randomPoster}
  },
  methods: {
    logIn() {
      const username = this.username
      const password = this.password

      const payload = {
        username: username,
        password: password,
      }
      this.$store.dispatch('logIn', payload)
    },
    notAccount() {
      this.$router.push({name: 'SignUpView'})
    }
  }
}
</script>

<style scoped>
img {
  object-fit: cover;
  min-height:100%;
  opacity: 0.7;
}

</style>
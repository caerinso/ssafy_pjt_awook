<template>
  <div class="container d-flex justify-content-between align-items-center mb-5 border border-0 rounded-4" style="height: 800px; background-color: #EEF9FD">
    <div class="col-sm-6 px-5">
      <form @submit.prevent="signUp" style="width: 25rem;" >
        <i class="fas fa-crow fa-2x me-3" style="color: #709085;"></i>
        <h3 class="fw-bold mb-4" style="letter-spacing: 1px;">Sign in</h3>

        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example18">Username</label><br>
          <input type="text" id="username" v-model="username" class="form-control form-control-lg" />
        </div>

        <div class="form-outline mb-4" >
          <label class="form-label" for="form2Example28">Password1</label><br>
          <input type="password" id="password1" v-model="password1" class="form-control form-control-lg" @input='pwLength'/>
          <p style="color: red;">{{ this.warning1 }}</p>
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example28">Password2</label><br>
          <input type="password" id="password2" v-model="password2" class="form-control form-control-lg" @input="samePassword"/>
          <p style="color: red;">{{ this.warning2 }}</p>
        </div>

        <button class="btn btn-lg fw-bold" type="submit" style="background-color: #7EBCD0; color: white;" >Sign Up</button>
      </form>
    </div>

      <div class="col-sm-6">
        <img  :src="randomPoster" 
          alt="Login image" style="width: 80%" class="border border-0 rounded-4">
      </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      warning1: '비밀번호는 8자 이상이어야 합니다.',
      warning2: '비밀번호가 다릅니다.',
    }
  },
  computed: {
    randomPoster() { return this.$store.getters.randomPoster}
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      const payload = {
        username: username,
        password1: password1,
        password2: password2,
      }
      this.$store.dispatch('signUp', payload)
    },
    pwLength() {
      if (this.password1.length < 8) {
        this.warning1 = '비밀번호는 8자 이상이어야 합니다.'
      } else {
        this.warning1 = ''
      }
    },
    samePassword() {
      if (this.password1 != this.password2) {
        this.warning2 = '비밀번호가 다릅니다.'
      } else {
        this.warning2 = ''
      }
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
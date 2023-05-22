<template>
  <div class="container">
    <h1 v-if="isLogin" class="fw-bold mb-4">{{user?.username}}, Welcome To AWOOK-BOX!</h1>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'

export default {
  name: 'MainView',
  components: {
    MovieList
  },
  computed: {
    isLogin() {return this.$store.getters.isLogin},
    user() {return this.$store.getters.user},
  },
  created(){
    this.$store.dispatch('getMovies', false)
    this.$store.dispatch('getActors')
    this.$store.dispatch('getGenres')
  }
}
</script>

<style scoped>
  

</style>

<template>
  <div class="mb-5 container">
    <h3 class="fw-bold">Same Actor Movies</h3>
    <h5>{{ sameActorMoviesCount }}개의 영화가 있습니다.</h5>
      
    <div class="row d-flex">
      <MovieListItem
        v-for="movie in sameActorMovies"
        :key="movie.id"
        :movie='movie'
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
export default {
  name: 'SameActorMovies',
  computed: {
    sameActorMovies() {
      return this.$store.getters.sameActorMovies
    },
    sameActorMoviesCount() {
      return this.$store.getters.sameActorMovies.length
    }
  },
  components: {
    MovieListItem,
  }
}
</script>

<style>

</style>
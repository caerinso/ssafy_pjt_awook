<template>
  <div class="mb-5 container">
    <h3 class="fw-bold">Similar Genre Movies</h3>
    <h5>{{ similarGenreMoviesCount }}개의 영화가 있습니다.</h5>
      
    <div class="row d-flex">
      <MovieListItem
        v-for="movie in similarGenreMovies"
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
    similarGenreMovies() {
      return this.$store.getters.similarGenreMovies
    },
    similarGenreMoviesCount() {
      return this.$store.getters.similarGenreMovies.length
    }
  },
  components: {
    MovieListItem,
  }
}
</script>

<style>

</style>
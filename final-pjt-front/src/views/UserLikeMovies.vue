<template>
  <div class="mb-5 container">
    <h3 class="fw-bold">좋아요한 영화</h3>
    <h5>{{ likeMoviesCount }}개의 영화를 좋아합니다.</h5>
      
    <div class="row d-flex">
      <MovieListItem
        v-for="movie in [...likeMovies].reverse()"
        :key="movie.id"
        :movie='movie'
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
export default {
  name: 'UserLikeMovies',
  computed: {
    likeMovies() {return this.$store.getters.likeMovies},
    likeMoviesCount() {return this.$store.getters.likeMovies.length},
  },
  components: {
    MovieListItem,
  }
}
</script>

<style>

</style>
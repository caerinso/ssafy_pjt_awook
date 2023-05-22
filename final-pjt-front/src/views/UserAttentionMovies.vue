<template>
  <div class="mb-5 container">
    <h3 class="fw-bold">관심목록</h3>
    <h5>{{ attentionMoviesCount }}개의 영화가 있습니다.</h5>
      
    <div class="row d-flex">
      <MovieListItem
        v-for="movie in [...attentionMovies].reverse()"
        :key="movie.id"
        :movie='movie'
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
export default {
  name: 'UserAttentionMovies',
  computed: {
    attentionMovies() {return this.$store.getters.attentionMovies},
    attentionMoviesCount() {return this.$store.getters.attentionMovies.length},
  },
  components: {
    MovieListItem,
  }
}
</script>

<style>

</style>
<template>
  <div class="row d-flex">
    <h3 v-if="!recommendMoviesList.length" class="fw-bold">영화를 추천받기 위해서는 좋아요한 영화나 관심목록에 영화가 있어야합니다.</h3>
    <MovieListItem
      v-for="movie in recommendMoviesList"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
export default {
  name: 'RecommendMovieList',
  components: {
    MovieListItem
  },
  computed: {
    recommendMoviesList() { return this.$store.getters.recommendMoviesList }
  },
}
</script>

<style>

</style>
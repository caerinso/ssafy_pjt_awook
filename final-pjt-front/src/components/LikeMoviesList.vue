<template>
  <div class="mb-5">
    <h3 class="fw-bold">좋아요한 영화</h3>
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <h5>{{ likeMoviesCount }}개의 영화를 좋아합니다.</h5>
      <router-link :to="{name: 'UserLikeMovies'}" style="text-decoration:none; color:#022835;">전체보기</router-link>
    </div>
    <hr>
    <div class="row d-flex">
      <h5 v-if="!likeMovies.length" class="fw-bold">좋아하는 영화에 좋아요를 눌러주세요.</h5>
      <MovieListItem
        v-for="movie in likeMovies.slice(-5).reverse()"
        :key="movie.id"
        :movie='movie'
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
export default {
  name: 'LikeMoviesList',
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
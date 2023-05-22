<template>
  <div class="mb-5">
    <h3 class="fw-bold">관심목록</h3>
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <h5>{{ attentionMoviesCount }}개의 영화가 있습니다.</h5>
      <router-link :to="{name: 'UserAttentionMovies'}" style="text-decoration:none; color:#022835;">전체보기</router-link>
    </div>
    <hr>
    <div class="d-flex">
      <h5 v-if="!attentionMovies.length" class="fw-bold">관심목록을 추가해주세요.</h5>
      <MovieListItem
        v-for="movie in attentionMovies.slice(-5).reverse()"
        :key="movie.id"
        :movie='movie'
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
export default {
  name: 'AttentionMovieList',
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
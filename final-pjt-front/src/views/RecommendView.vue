<template>
  <div class="container mb-5">
    <h1 class="mb-3 fw-bold">추천 영화</h1>
    <button @click="getRecommendMoviesList" type="btn" class="btn btn-dark mb-5 fw-bold">영화 추천받기</button>
    <RecommendMovieList/>
  </div>
</template>

<script>
import RecommendMovieList from '@/components/RecommendMovieList'
export default {
  name: 'RecommendView',
  methods: {
    getRecommendMoviesList() {
      this.$store.dispatch('getRecommendMoviesList')
    }
  },
  created() {
    this.$store.dispatch('getRecommendMovies')
  },
  components: {
    RecommendMovieList,
  }
}
</script>

<style>

</style>
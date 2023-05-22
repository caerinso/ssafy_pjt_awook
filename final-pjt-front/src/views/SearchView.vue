<template>
  <div class="container mb-5">
    <h3 class="fw-bold mb-3">검색된 영화 목록</h3>
    <div class="row d-flex">
      <MovieListItem
      v-for="movie in searchedMovies"
      :key="movie.id"
      :movie="movie"
      />
    </div>
  </div>
  
</template>

<script>
import MovieListItem from '@/components/MovieListItem';
export default {
  name:'SearchView',
  components:{
    MovieListItem
  },
  computed:{
    searchedMovies(){
      return this.$store.state.searchedMovies
    }
  }
}
</script>

<style>
</style>
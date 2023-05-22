<template>
  <div class="mb-5">
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <h3 class="fw-bold">Same Actor Movie List</h3>
      <router-link :to="{name: 'SameActorMovies'}" style="text-decoration:none; color:#022835;">전체보기</router-link>
    </div>
    <div class="d-flex">
      <h5 v-if="!sameActorMovies.length" class="fw-bold">해당하는 영화가 없습니다.</h5>
      <MovieListItem
        v-for="movie in sameActorMovies.slice(0,5)"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
export default {
  name: 'SameActorMovieList',
  computed: {
    sameActorMovies() { return this.$store.getters.sameActorMovies }
  },
  components: {
    MovieListItem,
  },
}
</script>

<style>

</style>
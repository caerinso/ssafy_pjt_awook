<template>
  <div class="row my-3 d-flex justify-content-center">
    <MovieSearchingItem
      v-for="movie in this.searchingMovies"
      :key="movie.title"
      :movie="movie"
    />
  </div>
</template>

<script>
import MovieSearchingItem from "@/components/MovieSearchingItem";
export default {
  name: "MovieSearching",
  comments: {
    MovieSearchingItem,
  },
  computed: {
    searchingMovies() {return this.$store.state.searchingMovies},
  },
  components: { MovieSearchingItem },
};
</script>

<style></style>
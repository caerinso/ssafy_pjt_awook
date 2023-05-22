<template>
  <div class="card mb-3 mx-2" data-bs-dismiss="modal" data-bs-toggle="tooltip" data-bs-placement="top" :title="movie.title" @click="goDetail" style="width:200px">
    <img :src="moviePoster" class="rounded" style="width:100%">
    <div class="card-body">
      <h5 class="card-title fw-bold">{{movie.title}}</h5>
      <p class="card-text">{{movie.release_date}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieSearchingItem",
  props: {
    movie: Object,
  },
  computed: {
    moviePoster() {
      return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.movie.poster_path}`
    },
  },
  methods: {
    goDetail() {
      this.$store.dispatch('getMovies', this.movie.id)
      this.$router.push({name: 'DetailView', params: {movie: this.movie, id: this.movie.id}})
    }
  }
};
</script>

<style></style>
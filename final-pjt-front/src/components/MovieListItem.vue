<template>
  <div class="card mb-5 mx-2" style="width: 245px; height: 470px;" data-bs-toggle="tooltip" data-bs-placement="top" :title="movie.title" @click="goDetail">
    <img :src="moviePoster" class="rounded">
    <div class="card-body">
      <p class="card-title fw-bold" style="text-overflow: ellipsis;">{{movie.title}}</p>
      <p class="card-text">{{movie.release_date}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'MovieListItem',
  props:{
    movie: Object
  },
  computed: {
    moviePoster() {
      return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.movie.poster_path}`
    },
  },
   methods: {
    goDetail() {
      this.$store.dispatch('getMovies', this.movie.id)
      this.$router.push({name: 'DetailView', params: {id: this.movie.id}})
    }
  }
}
</script>

<style>
.card:hover {
  background-color: #DDF3FA;
  transform: scale(1.025);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 10px
}
</style>


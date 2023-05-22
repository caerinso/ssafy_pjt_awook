<template>
  <div class="mb-5">
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <h3 class="fw-bold">Similar Overview Movie List</h3>
      <router-link :to="{name: 'SimilarOverviewMovies', params: {id: detailMovie.id}}" style="text-decoration:none; color:#022835;">전체보기</router-link>
    </div>
    <div class="d-flex">
      <h5 v-if="!similarOverviewMovies.length" class="fw-bold">해당하는 영화가 없습니다.</h5>
      <MovieListItem
        v-for="movie in similarOverviewMovies.slice(0,5)"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
import MovieListItem from '@/components/MovieListItem'
export default {
  name: 'SimilarOverviewMovieList',
  components: {
    MovieListItem,
  },
  data(){
    return{
      similarOverviewMovies:[]
    }
  },
  props: {
    detailMovie: Object,
  },
  methods:{
    similarOverview() {
      axios({
        url: `${API_URL}/api/v1/similarOverview/${this.detailMovie.id}/`,
        headers: this.authHead
      })
      .then(res => {
        console.log(res)
        this.similarOverviewMovies = res.data
      })
      .catch((err) => console.log(err))
    }
  },
  created() {
    this.similarOverview()}
}
</script>

<style>
</style>
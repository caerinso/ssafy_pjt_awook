<template>
  <div class="mb-5 container">
    <h3 class="fw-bold">Similar Genre Movies</h3>
    <h5>{{ similarOverviewMoviesCount }}개의 영화가 있습니다.</h5>
      
    <div class="row d-flex">
      <MovieListItem
        v-for="movie in similarOverviewMovies"
        :key="movie.id"
        :movie='movie'
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
import MovieListItem from '@/components/MovieListItem'
export default {
  name: 'SimilarOverviewMovies',
  components: {
    MovieListItem,
  },
  data(){
    return{
      similarOverviewMovies:[],
      similarOverviewMoviesCount: null,
    }
  },
  methods:{
    similarOverview() {
      axios({
        url: `${API_URL}/api/v1/similarOverview/${ this.$route.params.id}/`,
        headers: this.authHead
      })
      .then(res => {
        console.log(res)
        this.similarOverviewMovies = res.data
        this.similarOverviewMoviesCount = res.data.length
      })
      .catch((err) => console.log(err))
    }
  },
  created() {
    this.similarOverview()
  }
}
</script>

<style>

</style>
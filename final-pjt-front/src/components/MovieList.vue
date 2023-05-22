<template>
  <div>
    <select class="form-select mb-4 fw-bold" style="background-color: #7EBCD0; width: 20%; color:" aria-label=".form-select-sm example" @change="selectGenre">
      <option value="0" style="background-color: white;">전체</option>
      <option value="12" style="background-color: white;">모험</option>
      <option value="14" style="background-color: white;">판타지</option>
      <option value="16" style="background-color: white;">애니메이션</option>
      <option value="18" style="background-color: white;">드라마</option>
      <option value="27" style="background-color: white;">공포</option>
      <option value="35" style="background-color: white;">코미디</option>
      <option value="36" style="background-color: white;">역사</option>
      <option value="37" style="background-color: white;">서부</option>
      <option value="53" style="background-color: white;">스릴러</option>
      <option value="80" style="background-color: white;">범죄</option>
      <option value="99" style="background-color: white;">다큐멘터리</option>
      <option value="878" style="background-color: white;">SF</option>
      <option value="9648" style="background-color: white;">미스터리</option>
      <option value="10402" style="background-color: white;">음악</option>
      <option value="10749" style="background-color: white;">로맨스</option>
      <option value="10751" style="background-color: white;">가족</option>
      <option value="10752" style="background-color: white;">전쟁</option>
      <option value="10770" style="background-color: white;">TV 영화</option>
    </select>

    <div class="row d-flex">
      <MovieListItem
        v-for="movie in genreMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem';
import _ from 'lodash'
export default {
    name: "MovieList",
    components: { MovieListItem },
    computed:{
      movies(){
        return this.$store.getters.movies
      },
      genres() {
        return this.$store.getters.allGenres
      }
    },
    data() {
      return {
        genreMovies: [],
      }
    },
    methods: {
      selectGenre(event) {
        if (event.target.value === '0') {
          this.genreMovies = _.shuffle(this.movies).slice(0, 50)
        } else {
          for (const genre of this.genres) {
            if (event.target.value === genre.id.toString()) {
              this.genreMovies = _.shuffle(genre.movie_set).slice(0, 50)
              break
            }
          }
        }
      }
    },
    created() {
      this.genreMovies = _.shuffle(this.movies).slice(0, 50)
    }
}
</script>

<style>

</style>
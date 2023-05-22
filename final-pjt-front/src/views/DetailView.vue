<template>
  <div>
    <div class="mb-5 d-flex align-items-center" style="height: 700px; background-color: #022835; color: white;">
      <div class="container d-flex">
        <img :src="moviePoster" style="width:30%; height: 100%;" class="ms-4 me-5 rounded">
        <div style="width: 60%; height: 100%">
          <h3 class="fw-bold mb-3 mt-3">{{ movie?.title }} ( {{ movie?.id }} )</h3>
          <h5 class="mb-3">{{ movie?.release_date }} | <GenreList :movie="movie" /></h5>
          <h5 class="mb-3">
            <span class="me-3">평점 : {{ movie?.vote_average }} </span> 
            <button @click="attentionMovies" class="me-3">
              <i v-if="movieattention" class="fa-solid fa-bookmark"  data-toggle="tooltip" data-placement="bottom" title="관심목록 제거"></i>
              <i v-if="!movieattention" class="fa-regular fa-bookmark" data-toggle="tooltip" data-placement="bottom" title="관심목록 추가"></i>
            </button>  
            <button @click="likesMovie">
              <i v-if="movielike" class="fa-solid fa-heart"  data-toggle="tooltip" data-placement="bottom" title="좋아요 취소"></i>
              <i v-if="!movielike" class="fa-regular fa-heart" data-toggle="tooltip" data-placement="bottom" title="좋아요"></i>
            </button>
          </h5>
          <h5 class="fw-bold">개요</h5>
          <p class="mb-4">{{ movie?.overview }}</p>
          <h5 class="fw-bold mb-3">주요 출연진</h5>
          <ActorList :movie="movie" class="fw-bold"/>
        </div>
      </div>
    </div>

    
    <div class="container">
      <div class="embed-responsive embed-responsive-16by9 mb-5">
        <h3 class="fw-bold mb-3">예고편 보기</h3>
        <iframe :src="movieYoutube" frameborder="0" class="embed-responsive-item" style="width: 100%; height: 750px"></iframe>
      </div>

      <div>
        <CommentForm :movie="movie" class="mb-5"/>
        <CommentList :movie="movie" class="fw-bold mb-5"/>
      </div>
      <SimilarGenreMovieList/>  
      <SameActorMovieList/>
      <SimilarOverviewMovieList :detailMovie="movie"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentList from '@/components/CommentList'
import CommentForm from "@/components/CommentForm"
import SimilarGenreMovieList from '@/components/SimilarGenreMovieList'
import SameActorMovieList from '@/components/SameActorMovieList'
import SimilarOverviewMovieList from '@/components/SimilarOverviewMovieList'
import ActorList from '@/components/ActorList'
import GenreList from '@/components/GenreList'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'DetailView',
  components: {
    CommentList,
    CommentForm,
    ActorList,
    GenreList,
    SimilarGenreMovieList,
    SameActorMovieList,
    SimilarOverviewMovieList,
  },
  computed: {
    movie() {
      return this.$store.getters.movie
    },
    moviePoster() {
      return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.movie?.poster_path}`
    },
    movieYoutube() {
      return `http://www.youtube.com/embed/${this.movie?.youtube_key}`
    },
    authHead() {
      return this.$store.getters.authHead
    },
    user() {
      return this.$store.getters.user
    },
  },
  data() {
    return {
      movielike: false,
      movieattention: false,
    }
  },
  methods: {
    likesMovie() {
      if (this.user) {
        axios({
          method: "post",
          url: `${API_URL}/api/v1/movies/${this.movie.id}/likes/`,
          data: {
            user_id: this.user.pk,
          },
          headers: this.authHead
        })
          .then(res => {
            console.log(res)
            this.movielike = !this.movielike
            this.$store.dispatch('getMovies', this.movie.id)
          })
          .catch((err) => console.log(err));
      } else {
        alert('로그인이 필요한 서비스입니다.')
        this.$router.push({name: 'LoginView'})
      }
    },
    attentionMovies() {
      if (this.user) {
        axios({
          method: "post",
          url: `${API_URL}/api/v1/movies/${this.movie.id}/attention/`,
          data: {
            user_id: this.user.pk,
          },
          headers: this.authHead
        })
          .then(res => {
            console.log(res)
            this.movieattention = !this.movieattention
            this.$store.dispatch('getMovies', this.movie.id)
          })
          .catch((err) => console.log(err));
      } else {
        alert('로그인이 필요한 서비스입니다.')
        this.$router.push({name: 'LoginView'})
      }
    },
  },
  created() {
    this.$store.dispatch('getMovies', this.$route.params.id)
    if (this.movie.like_users.includes(this.user.pk)) {
      this.movielike = true
    } else {
      this.movielike = false
    }
    if (this.movie.attention_users.includes(this.user.pk)) {
      this.movieattention = true
    } else {
      this.movieattention = false
    }
    window.scrollTo({top:0, left:0, behavior:'instant'});
  },
}
</script>

<style>
</style>
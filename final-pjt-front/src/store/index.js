import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate'

const API_URL = 'http://127.0.0.1:8000'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    movies:[],
    movie:null,
    randomPoster: null,
    allActors:[],
    allGenres:[],
    similarGenreMovies: [],
    sameActorMovies: [],
    searchedMovies: [],
    searchingMovies: [],
    recommendMovies: [],
    recommendMoviesList: [],
    likeMovies: [],
    attentionMovies: [],
    userComments: [],
    likeComments: [],
  },
  getters: {
    isLogin: (state) => state.token? true: false,
    authHead: (state) => ({Authorization: `Token ${state.token}`}),
    user: (state) => state.user,
    isAuthor: (state) => state.user?.username === state.article.username,
    movies: (state) => state.movies,
    movie: (state) => state.movie,
    allActors: (state) => state.allActors,
    allGenres: (state) => state.allGenres,
    similarGenreMovies: (state) => state.similarGenreMovies,
    sameActorMovies: (state) => state.sameActorMovies,
    searchedMovies: (state) => state.searchedMovies,
    searchingMovies: (state) => state.searchingMovies,
    recommendMovies: (state) => state.recommendMovies,
    recommendMoviesList: (state) => state.recommendMoviesList,
    likeMovies: (state) => state.likeMovies,
    attentionMovies: (state) => state.attentionMovies,
    userComments: (state) => state.userComments,
    likeComments: (state) => state.likeComments,
    randomPoster: (state) => state.randomPoster,
  },
  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_USER: (state, user) => state.user = user,
    GET_MOVIES(state, movies) {
      state.movies = movies
      const randomMovie = _.sample(movies)
      state.randomPoster = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${randomMovie.poster_path}`
    }, 
    GET_ACTORS: (state, actors) => state.allActors = actors, 
    GET_GENRES: (state, genres) => state.allGenres = genres, 
    GET_MOVIE_DETAIL: (state, movie) => state.movie = movie,
    GET_SIMILAR_GENRE_MOVIE(state, moviedata) {
      state.similarGenreMovies = []
      for (const movie of state.movies) {
        if (movie.id === moviedata.id) continue
        let count = 0
        for (const genre of movie.genres) {
          if (moviedata.genres.includes(genre)) {
            count++
          }
        }
        if (count > 1) {
          state.similarGenreMovies.push(movie)
        }
      }
    },
    GET_SAME_ACTOR_MOVIE(state, moviedata) {
      state.sameActorMovies = []
      for (const movie of state.movies) {
        if (movie.id === moviedata.id) continue
        for (const actor of movie.actors) {
          if (moviedata.actors.includes(actor)) {
            state.sameActorMovies.push(movie)
            break
          }
        }
      }
    },
    MOVIE_SEARCH(state, movieTitle) {
      state.searchedMovies = [];
      for (let movie of state.movies) {
        if (movie.title.includes(movieTitle)) {
          this.state.searchedMovies.push(movie);
        }
      }
    },
    MOVIE_SEARCHING(state, movieTitle) {
      state.searchingMovies = [];
      for (let movie of state.movies) {
        if (movie.title.includes(movieTitle)) {
          this.state.searchingMovies.push(movie);
        }
      }
    },
    GET_LIKE_MOVIES(state) {
      state.likeMovies =[]
      for (const movie of state.movies) {
        for (const admin of movie.like_users) {
          if (admin === state.user.pk){
            state.likeMovies.push(movie)
            break
          }
        }
      }
    },
    GET_ATTENTION_MOVIES(state) {
      state.attentionMovies =[]
      for (const movie of state.movies) {
        for (const admin of movie.attention_users) {
          if (admin === state.user.pk){
            state.attentionMovies.push(movie)
            break
          }
        }
      }
    },
    GET_USER_COMMENTS(state) {
      state.userComments =[]
      for (const movie of state.movies){
        for (const comment of movie.comment_set) {
          if (comment.user_id == state.user.pk){
            state.userComments.push(comment)
          }
      }
    }
    },
    GET_LIKE_COMMENTS(state) {
      state.likeComments =[]
      for (const movie of state.movies) {
        for (const comment of movie.comment_set) {
          for (const admin of comment.like_users) {
            if (admin == state.user.pk){
              state.likeComments.push(comment)}
              break
          }
        }
      }
    },
    GET_RECOMMEND_MOVIES(state) {
      let genredict = {}
      state.recommendMovies = []
      for (const likemovie of state.likeMovies) {
        for (const likegenre of likemovie.genres) {
          if (genredict[likegenre]) {
            genredict[likegenre] += 1
          } else {
            genredict[likegenre] = 1
          }
        }
      }
      for (const attentionmovie of state.attentionMovies) {
        for (const attentiongenre of attentionmovie.genres) {
          if (genredict[attentiongenre]) {
            genredict[attentiongenre] += 1
          } else {
            genredict[attentiongenre] = 1
          }
        }
      }
      let mostgenre = 0
      let mostgenrekey = []
      const genredictkeys = Object.keys(genredict)
      for (const genre of genredictkeys) {
        const genredictvalue = genredict[genre]
        if (mostgenre < genredictvalue) {
          mostgenre = genredictvalue
          mostgenrekey = [genre]
        } else if (mostgenre === genredictvalue) {
          mostgenrekey.push(genre)
        }
      }
      const recommendgenre = _.sample(mostgenrekey)
      for (const allgenre of state.allGenres) {
        if (recommendgenre === allgenre.id.toString()) {
          state.recommendMovies = allgenre.movie_set
          break
        }
      }
      state.recommendMoviesList = _.sampleSize(state.recommendMovies, 5)
    },
    GET_RECOMMEND_MOVIES_LIST(state) {
      state.recommendMoviesList = _.sampleSize(state.recommendMovies, 5)
    }
  },
  actions: {
    signUp({commit}, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
      .then((res) => {
        console.log(res)
        commit
        // commit('SAVE_TOKEN', res.data.key)
        alert('회원가입이 완료되었습니다. 로그인 페이지로 넘어갑니다.')
        router.push({name: 'LoginView'})
      })
      .catch(err => {
        if (err.response.status === 400) {
          alert(JSON.stringify(err.response.data))
        }
      })
    },
    logIn({ commit, dispatch }, { username, password }) {
      const payload = { username, password }
      axios({
        url: `${API_URL}/accounts/login/`,
        method: 'post',
        data: payload
      })
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          dispatch('getUserInfo')
          alert(`${username}님 환영합니다`)
          router.push({name: 'MainView'})
        })
        .catch(err => {
          if (err.response.status === 400) {
            alert(JSON.stringify(err.response.data))
          }
        })
    },
    logout({commit, getters}) {
      axios({
        url: `${API_URL}/accounts/logout/`,
        method: 'post',
        headers: getters.authHead,
      })
        .then((res) => {
          console.log(res)
          commit('SET_TOKEN', null),
          commit('SET_USER', null)
          router.push({name: 'MainView'})
        }
        )
        .catch(err => console.log(err))
    },
    getUserInfo({ commit, getters }) {
      axios({
        url: `${API_URL}/accounts/user/`,
        method: 'get',
        headers: getters.authHead
      })
        .then(res => {
          commit('SET_USER', res.data)
        })
        .catch(err => console.log(err))
    },
    pwChange({getters}, newPassword) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/password/change/`,
        headers: getters.authHead,
        data: {
          new_password1: newPassword,
          new_password2: newPassword,
        }
      })
        .then((res) => {
          console.log(res)
          this.dispatch('getUserInfo')
          alert('비밀번호가 변경되었습니다')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMovies({commit}, movieId){
      axios({
        method:'get',
        url: `${API_URL}/api/v1/movies`
      })
        .then(res => {
          commit('GET_MOVIES', res.data)
        })
        .catch(err => console.log(err))
      if (movieId) {
        axios({
          url: `${API_URL}/api/v1/movies/${movieId}/`
        })
          .then(res => {
            commit('GET_MOVIE_DETAIL', res.data)
            commit('GET_SIMILAR_GENRE_MOVIE', res.data)
            commit('GET_SAME_ACTOR_MOVIE', res.data)
            commit('GET_LIKE_MOVIES')
            commit('GET_ATTENTION_MOVIES')
            commit('GET_USER_COMMENTS')
            commit('GET_LIKE_COMMENTS')
          })
          .catch(err => console.log(err))
      }
    },
    movieSearch({commit}, movieTitle) {
      commit('MOVIE_SEARCH', movieTitle)
      router.push({name: 'SearchView'})
    },
    movieSearching({commit}, movieTitle) {
      commit('MOVIE_SEARCHING', movieTitle)
    },
    getActors({commit}){
      axios({
        method:'get',
        url: `${API_URL}/api/v1/actors`
      })
      .then(res =>
        commit('GET_ACTORS', res.data))
      .catch(err => console.log(err))
    },
    getGenres({commit}){
      axios({
        method:'get',
        url: `${API_URL}/api/v1/genres`
      })
      .then(res =>
        commit('GET_GENRES', res.data))
      .catch(err => console.log(err))
    },
    getRecommendMovies({commit}) {
      commit('GET_RECOMMEND_MOVIES')
    },
    getRecommendMoviesList({commit}) {
      commit('GET_RECOMMEND_MOVIES_LIST')
    },
    getUserProfile({commit}) {
      commit('GET_LIKE_MOVIES')
      commit('GET_ATTENTION_MOVIES')
      commit('GET_USER_COMMENTS')
      commit('GET_LIKE_COMMENTS')
    },
  },
  modules: {
  }
})

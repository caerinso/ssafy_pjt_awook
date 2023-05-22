<template>
  <div>
    <header>
      <nav style="background-color: #B0DCEB" class="sticky-top mb-4">
        <div class="container" id="top-nav">
          <router-link to="/" class="mx-3"><img src="@/assets/logo.png" class="h-100"></router-link>
          
          <div class="d-flex align-items-center justify-content-between mx-4" style="width: 15%;">
            <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-toggle="tooltip" data-placement="bottom" title="영화 검색">
              <i class="fa-solid fa-magnifying-glass fa-2x" id="icon"></i>
            </button>
            <!-- 로그인 안되었을 때 -->
            <router-link to="/login" v-if="!isLogin" data-toggle="tooltip" data-placement="bottom" title="로그인"><i class="fa-solid fa-arrow-right-to-bracket fa-2x" id="icon"></i></router-link>
            <router-link :to="{ name: 'SignUpView'}" id="icon" v-if="!isLogin" data-toggle="tooltip" data-placement="bottom" title="회원 가입" class="fs-3 fw-bold text-decoration-none">Signup</router-link>
  
            <!-- 로그인 되었을 때 -->
            <router-link to="/recommend" v-if="isLogin" data-toggle="tooltip" data-placement="bottom" title="영화 추천받기"><i class="fa-solid fa-video fa-2x" id="icon"></i></router-link> 
            <button @click="logout" v-if="isLogin" data-toggle="tooltip" data-placement="bottom" title="로그아웃"><i class="fa-solid fa-arrow-right-from-bracket fa-2x" id="icon"></i></button> 
            <router-link :to="{name: 'ProfileView'}" v-if="isLogin" data-toggle="tooltip" data-placement="bottom" title="프로필"><i class="fa-solid fa-user fa-2x" id="icon"></i></router-link>
          </div>
        </div>
      </nav>
    </header>


    <body id="page-container">
      <router-view/>
      <i class="fa-solid fa-circle-arrow-up fa-3x" id="upBtn" @click="goTop" data-toggle="tooltip" data-placement="right" title="위로"></i> 
    
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title fw-bold ms-3" id="staticBackdropLabel">Movie Search</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <input type="text" v-model="movieTitle" @input="movieSearch" @keyup.enter="movieListSearch" class="form-control rounded me-3"  placeholder="검색하실 영화 제목을 입력해주세요" style="width: 50%">
            <button data-bs-dismiss="modal" @click="movieListSearch" data-toggle="tooltip" data-placement="right" title="검색하기"><i class="fas fa-search fa-2x"></i></button>
          </div>
          <div class="modal-footer d-flex justify-content-start px-5">
            <MovieSearching/>
          </div>
        </div>
      </div>
    </div>
    
    </body>
    

    <footer class="footer">
      <div style="background-color: #B0DCEB" >
        <div class="container d-flex justify-content-between align-items-center" style="height: 100px;">
          <img src="@/assets/ssafy.png" style="height: 100%">
          <div>
            <h5 class="fw-bold" style="font-size: small">제작 : SSAFY 8기 대전 1반 10조</h5>
            <h5 class="fw-bold" style="font-size: small">소채린 : so992419@naver.com</h5>
            <h5 class="fw-bold" style="font-size: small">이진욱 : dlwls9130@naver.com</h5>
          </div>
        </div>
      </div>
    </footer>

    
    
  </div>
</template>

<script>
import MovieSearching from '@/components/MovieSearching'
export default {
  data() {
    return {
      movieTitle: null,
    }
  },
  computed: {
    isLogin() {return this.$store.getters.isLogin},
    randomPoster() { return this.$store.getters.randomPoster}
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    movieSearch() {
      this.$store.dispatch('movieSearching', this.movieTitle)
    },
    movieListSearch(){
      this.$store.dispatch('movieSearch', this.movieTitle)
      this.movieTitle = null
    },
    goMain() {
      this.$router.push({name: 'MainView'})
    },
    goTop() {
      window.scrollTo({top:0, left:0, behavior:'smooth'});
    }
  },
  components: {
    MovieSearching,
  },
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  #page-container {
    position: relative;
    min-height: 77vh;
  }
  #content-wrap {
    padding-bottom: 2.5rem; /* 푸터 높이 */
  }
  #top-nav {
    background-color: #B0DCEB;
    height: 100px;
    display: flex;
    justify-content: space-between;
  }
  #icon {
    color: #022835;
  }
  #icon:hover {
    color: white;
  }
  footer {
    /* position: relative; */
    bottom:0;
    width: 100%;
    height: 2.5rem; /* 푸터 높이 */
  }
  #upBtn {
    position: fixed;
    bottom: 30px;
    right: 10%;
    color: #022835;
  }
  #upBtn:hover {
    transform: scale(1.025);
  }
  body {
    width: 100%;
    padding-right: 0 !important;
    background-repeat : no-repeat;
    background-size : cover;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(9,117,121,0) 0%, rgba(228,245,251,1) 100%);
  }
</style>
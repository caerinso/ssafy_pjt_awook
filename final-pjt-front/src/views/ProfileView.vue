<template>
  <div class="container mb-5">
    <h1 class="fw-bold mb-3">{{ user.username }} 님의 프로필</h1>
    <LikeMoviesList/>
    <UserCommentList/>
    <LikeCommentList/>
    <AttentionMovieList/>
    
    <button @click="changingPW" class="mb-3 btn btn-dark">비밀번호 변경하기</button>
    <div v-if="changing">
      <div class="d-flex mb-2">
        <input class="form-control" style="width:50%" type="password" @keyup.enter="pwChange" v-model="newPassword" @input="newPW">
        <button @click="pwChange" class="btn btn-dark ms-3">비밀번호 변경</button>
      </div>
      <span style="color:red;">{{warning}}</span>
    </div>
  </div>
</template>

<script>
import LikeMoviesList from '@/components/LikeMoviesList'
import UserCommentList from '@/components/UserCommentList'
import LikeCommentList from '@/components/LikeCommentList'
import AttentionMovieList from '@/components/AttentionMovieList'
export default {
  name: 'ProfileView',
  computed: {
    user() {return this.$store.getters.user},
  },
  components: {
    LikeMoviesList,
    UserCommentList,
    LikeCommentList,
    AttentionMovieList,
  },
  data() {
    return {
      newPassword: null,
      warning: '비밀번호는 8자 이상이어야 합니다.',
      changing: false,
    }
  },
  methods: {
    changingPW() {
      this.changing = !this.changing
    },
    pwChange() {
      this.$store.dispatch('pwChange', this.newPassword)
      this.newPassword = null
      this.changing = false
    },
    newPW() {
      if (this.newPassword.length < 8) {
        this.warning = '비밀번호는 8자 이상이어야 합니다.'
      } else {
        this.warning = ''
      }
    },
  },
  created() {
    this.$store.dispatch('getUserProfile')
  }
}
</script>

<style>

</style>
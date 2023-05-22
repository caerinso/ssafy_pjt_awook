<template>
  <div class="mb-3">
    <p>글쓴이 : {{comment.user_id}}</p>
    <p>내용 : {{comment.content}}</p>
    <button @click="likeComment">
      <i v-if="commentlike" class="fa-solid fa-heart" data-toggle="tooltip" data-placement="bottom" title="좋아요 취소"></i>
      <i v-if="!commentlike" class="fa-regular fa-heart" data-toggle="tooltip" data-placement="bottom" title="좋아요"></i>
    </button>
    <span class="me-3"> {{ comment.like_users_count }} </span>
    <span v-if="comment.user_id === this.$store.state.user?.pk">
      <button @click="updateComment" data-toggle="tooltip" data-placement="bottom" title="댓글 수정" type="btn" class="me-3 btn btn-dark fw-bold">UPDATE</button>
      <button @click="deleteComment" data-toggle="tooltip" data-placement="bottom" title="댓글 삭제" type="btn" class="btn btn-dark fw-bold">DELETE</button>
      <form v-if="updating" @submit.prevent="goUpdate" class="mt-3 d-flex align-items-center">
        <label for="comment" class="me-3">내용: </label>
        <textarea
          id="content"
          cols="100"
          rows="3"
          v-model.trim="changeContent"
          class="me-3 border border-dark rounded"
        ></textarea>
        <button type="submit btn" class="btn btn-dark fw-bold">수정</button>
      </form>
      
    </span>
    <hr>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";
export default {
  name: "CommentListItem",
  props: {
    comment: Object,
    movie: Object,
  },
  computed: {
    authHead() { return this.$store.getters.authHead },
    user() { return this.$store.getters.user },
  },
  data() {
    return {
      changeContent: null,
      updating: false,
      commentlike: false,
    }
  },
  methods: {
    updateComment() {
      this.updating = !this.updating
    },
    goUpdate() {
      axios({
        method: 'put',
        url: `${API_URL}/api/v1/comments/${this.comment.id}/`,
        data: {
          content: this.changeContent,
          user_id: this.$store.getters.user.pk,  
        },
        headers: this.authHead,
      })
        .then(res => {
          console.log(res)
          this.$store.dispatch('getMovies', this.movie.id)
          this.updating = false
        });
    },
    deleteComment() {
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/comments/${this.comment.id}/`,
        headers: this.authHead,
      })
        .then(res => {
          console.log(res)
          this.$store.dispatch('getMovies', this.movie.id)
        });
    },
    likeComment() {
      if (this.user) {
        axios({
          method: "post",
          url: `${API_URL}/api/v1/comments/${this.comment.id}/likes/`,
          data: {
            user_id: this.user.pk,
          },
          headers: this.authHead
        })
          .then(res => {
            console.log(res)
            this.commentlike = !this.commentlike
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
    if (this.comment.like_users.includes(this.user.pk)) {
      this.commentlike = true
    } else {
      this.commentlike = false
    }
  }
};
</script>

<style>

</style>
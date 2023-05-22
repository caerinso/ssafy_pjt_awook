<template>
    <form @submit.prevent="createComment" class="d-flex align-items-center">
      <h5 class="fw-bold"><label for="comment" class="me-3">한줄평 : </label></h5>
      <textarea
        id="content"
        cols="100"
        rows="3"
        v-model.trim="comment"
        class="me-3 border border-dark rounded"
      ></textarea>
      <button type="submit btn" class="btn btn-dark fw-bold">저장</button>
    </form>

</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";
export default {
  name: "CommentForm",
  data() {
    return {
      comment: null,
    };
  },
  props: {
    movie: Object,
  },
  computed: {
    authHead() { return this.$store.getters.authHead },
    user() { return this.$store.getters.user}
  },
  methods: {
    createComment() {
      if (this.user) {
        const comment = this.comment;
        if (!comment) {
          alert("내용 입력해 주세요");
          return;
        }
        axios({
          method: "post",
          url: `${API_URL}/api/v1/movies/${this.movie.id}/comments/`,
          data: {
            content: comment,
            user_id: this.$store.getters.user.pk,
          },
          headers: this.authHead,
        })
          .then((res) => {
            console.log(res)
            this.$store.dispatch('getMovies', this.movie.id)
            this.comment = null;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert('로그인이 필요한 서비스입니다.')
        this.$router.push({name: 'LoginView'})
      }
    },
  },
};
</script>

<style></style>

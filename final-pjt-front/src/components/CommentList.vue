<template>
  <div>
    <h5 v-if="!comments.length" class="fw-bold">댓글을 작성해주세요.</h5>
    <hr v-if="!comments.length">
    <CommentListItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :movie="movie"
    />
  </div>
</template>

<script>
import CommentListItem from '@/components/CommentListItem';
export default {
  components: { CommentListItem },
  name:"CommentList",
  computed: {
    comments() {
      return this.movie.comment_set
    }
  },
  props: {
    movie: Object,
  },
}
</script>

<style>

</style>
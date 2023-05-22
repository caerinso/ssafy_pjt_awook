<template>
  <div class="mb-5">
    <h3 class="fw-bold">좋아요한 글</h3>
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <h5>{{ likeCommentsCount }}개의 댓글을 좋아합니다.</h5>
      <router-link :to="{name: 'UserLikeComments'}" style="text-decoration:none; color:#022835;">전체보기</router-link>
    </div>
    <hr>
    <h5 v-if="!likeComments.length" class="fw-bold">좋아요한 댓글이 없습니다.</h5>
    <ProfileCommentListItem
      v-for="comment in likeComments.slice(-5).reverse()"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script>
import ProfileCommentListItem from '@/components/ProfileCommentListItem'
export default {
  name: 'LikeCommentList',
  computed: {
    likeComments() {return this.$store.getters.likeComments},
    likeCommentsCount() {return this.$store.getters.likeComments.length},
  },
  components: {
    ProfileCommentListItem,
  }
}
</script>

<style>

</style>
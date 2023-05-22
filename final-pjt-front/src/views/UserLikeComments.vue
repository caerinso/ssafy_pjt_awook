<template>
  <div class="mb-5 container">
    <h3 class="fw-bold">좋아요한 글</h3>
    <h5>{{ likeCommentsCount }}개의 댓글을 좋아합니다.</h5>
      
    <div class="row d-flex mt-5">
      <ProfileCommentListItem
        v-for="comment in [...likeComments].reverse()"
        :key="comment.id"
        :comment='comment'
      />
    </div>
  </div>
</template>

<script>
  import ProfileCommentListItem from '@/components/ProfileCommentListItem'
  export default {
    name: 'UserLikeComments',
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
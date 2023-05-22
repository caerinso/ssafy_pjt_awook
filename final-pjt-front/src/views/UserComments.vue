<template>
  <div class="mb-5 container">
    <h3 class="fw-bold">작성한 글</h3>
    <h5>{{ userCommentsCount }}개의 댓글이 있습니다.</h5>
      
    <div class="row d-flex mt-5">
      <ProfileCommentListItem
        v-for="comment in [...userComments].reverse()"
        :key="comment.id"
        :comment='comment'
      />
    </div>
  </div>
</template>

<script>
  import ProfileCommentListItem from '@/components/ProfileCommentListItem'
  export default {
    name: 'UserComments',
    computed: {
      userComments() {return this.$store.getters.userComments},
      userCommentsCount() {return this.$store.getters.userComments.length},
    },
    components: {
      ProfileCommentListItem,
    }
  }
</script>

<style>

</style>
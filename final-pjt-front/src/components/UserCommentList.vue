<template>
  <div class="mb-5">
    <h3 class="fw-bold">작성한 글</h3>
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <h5>{{ userCommentsCount }}개의 댓글이 있습니다.</h5>
      <router-link :to="{name: 'UserComments'}" style="text-decoration:none; color:#022835;">전체보기</router-link>
    </div>
    <hr>
    <h5 v-if="!userComments.length" class="fw-bold">작성한 댓글이 없습니다.</h5>
    <ProfileCommentListItem
      v-for="comment in userComments.slice(-5).reverse()"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script>
  import ProfileCommentListItem from '@/components/ProfileCommentListItem'
  export default {
    name: 'UserCommentList',
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
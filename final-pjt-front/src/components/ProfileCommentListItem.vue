<template>
  <div @click="goDetail" class="fw-bold">
    <p>글번호 : {{ comment.id }}</p>
    <p>영화 : {{ comment.movie }}</p>
    <p>내용 : {{ comment.content }}</p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ProfileCommentListItem',
  props: {
    comment: Object,
  },
  methods: {
    goDetail() {
      this.$router.push({name: 'DetailView', params: {id: this.comment.movie}})
    },
  }
}
</script>

<style>

</style>
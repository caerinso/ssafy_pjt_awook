<template>  
  <p @click="actorInfo(actor.id)" class="actor-name">
    {{ actor.name }}
  </p>
</template>

<script>
export default {
  name: 'ActorListItem',
  props: {
    actor: Object,
  },
  methods: {
    actorInfo(actorId) {
      window.location.href = `https://www.themoviedb.org/person/${actorId}?language=ko`
    },
  }
}
</script>

<style>
  .actor-name:hover {
    color: #B0DCEB;
  }
</style>
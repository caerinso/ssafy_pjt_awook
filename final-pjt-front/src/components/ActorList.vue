<template>
  <div>
    <ActorListItem
      v-for="actor in actorsList"
      :key="actor.id"
      :actor="actor"
    />
  </div>
</template>

<script>
import  ActorListItem from '@/components/ActorListItem'
export default {
  name: 'ActorList',
  data() {
    return {
      actorsList: [],
    }
  },
  props: {
    movie: Object,
  },
  components: {
    ActorListItem,
  },
  computed: {
    actorList() {
      return this.$store.getters.allActors
    },
  },
  methods: {
    getActors() {
      this.actorsList = []
      for (const actorPk of this.movie.actors) {
        for (const actor of this.actorList) {
          if (actorPk === actor.id) {
            this.actorsList.push(actor)
            break
          }
        }
      }
    },
  },
  created() {
    this.getActors()
  }
}
</script>

<style>

</style>
<template>
  <span>
    <span
      v-for="genre in genres"
      :key="genre.id"
    >
      {{ genre.name }}
    </span>
  </span>
</template>

<script>
export default {
  name: 'GenreList',
  props: {
    movie: Object,
  },
  data() {
    return {
      genres: [],
    }
  },
  computed: {
    genreList() {
      return this.$store.getters.allGenres
    }
  },
  methods: {
    getGenres() {
      this.genres = []
      for (const genrePk of this.movie.genres) {
        for (const genre of this.genreList) {
          if (genrePk === genre.id) {
            this.genres.push(genre)
            break
          }
        }
      }
    },
  },
  created() {
    this.getGenres()
  }
}
</script>

<style>

</style>